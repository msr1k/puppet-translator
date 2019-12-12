/* eslint-env mocha */
'use strict';

const { exec } = require('child_process');

const should = require('should');

const path = require('path');
const pkg = require('../package');
const bin = path.resolve(pkg.bin);

describe('puppet-translator translate function test', function () {

  this.timeout(10000);

  it ('`puppet-translator -x hello` should return "こんにちは"', function (done) {
    exec(`node ${bin} -x hello`, (err, stdout, stderr) => {
      stdout.trim().should.be.equal('こんにちは');
      stderr.should.be.equal('');
      should(err).null();
      done();
    });
  });

  it ('`puppet-translator -f ja -t en -x こんにちは` should return "Hello"', function (done) {
    exec(`node ${bin} -f ja -t en -x "こんにちは"`, (err, stdout, stderr) => {
      stdout.trim().should.be.equal('Hello');
      stderr.should.be.equal('');
      should(err).null();
      done();
    });
  });

});

describe('puppet-translator translate function test (piped input)', function () {

  this.timeout(10000);

  it ('`echo hello | puppet-translator` should return "こんにちは"', function (done) {
    exec(`echo hello | node ${bin}`, (err, stdout, stderr) => {
      stdout.trim().should.be.equal('こんにちは');
      stderr.should.be.equal('');
      should(err).null();
      done();
    });
  });

});

describe('puppet-translator argument requirement test', function () {

  it ('`puppet-translator -x hello` without environment variable setting should be error', function (done) {
    const ev = process.env.PUPPET_TRANSLATOR_CHROME_BIN_PATH;
    process.env.PUPPET_TRANSLATOR_CHROME_BIN_PATH = "";
    exec(`node ${bin} -x hello`, (err, stdout, stderr) => {
      stdout.should.be.equal('');
      stderr.should.be.match(/^ERROR: Couldn't identify Google Chrome path.*/);
      err.code.should.be.equal(1);
      done();
    });
    process.env.PUPPET_TRANSLATOR_CHROME_BIN_PATH = ev;
  });

  it ('`puppet-translator` (no arguments) should be error', function (done) {
    exec(`node ${bin}`, (err, stdout, stderr) => {
      stdout.should.be.equal('');
      stderr.should.match(/^ERROR: .*was not given.*/);
      err.code.should.be.equal(1);
      done();
    }).stdin.end();
  });

  it ('`puppet-translator asdf` (has one unknown argument) should be error', function (done) {
    exec(`node ${bin} asdf`, (err, stdout, stderr) => {
      stdout.should.be.equal('');
      stderr.should.match(/^ERROR: Could not parse.*/);
      err.code.should.be.equal(1);
      done();
    });
  });

  const helpContentsMatcher = /Puppet Translator - A Google Translate Command Line Interface -/;

  it ('`puppet-translator -h` should show help contents', function (done) {
    exec(`node ${bin} -h`, (err, stdout, stderr) => {
      stdout.should.match(helpContentsMatcher);
      stderr.should.be.equal('');
      should(err).null();
      done();
    });
  });

  it ('`puppet-translator --help` should show help contents', function (done) {
    exec(`node ${bin} --help`, (err, stdout, stderr) => {
      stdout.should.match(helpContentsMatcher);
      stderr.should.be.equal('');
      should(err).null();
      done();
    });
  });

  it ('`puppet-translator -c dummy -x hello` should be error', function (done) {
    exec(`node ${bin} -c dummy -x hello`, (err, stdout, stderr) => {
      stdout.should.be.equal('');
      stderr.should.be.match(/^ERROR: Something went wrong./);
      err.code.should.be.equal(1);
      done();
    });
  });

});
