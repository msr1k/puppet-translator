/* eslint-env mocha */
'use strict';

const { exec } = require('child_process');

const path = require('path');
const pkg = require('../package');
const bin = path.resolve(pkg.bin);

describe('puppet-translator translate function test', function () {

  this.timeout(10000);

  it ('`puppet-translator -x hello` should return "こんにちは"', function (done) {
    exec(`node ${bin} -x hello`, (err, stdout, stderr) => {
      stdout.trim().should.be.equal('こんにちは');
      stderr.should.be.equal('');
      done();
    });
  });

  it ('`puppet-translator -f ja -t en -x こんにちは` should return "Hello"', function (done) {
    exec(`node ${bin} -f ja -t en -x "こんにちは"`, (err, stdout, stderr) => {
      stdout.trim().should.be.equal('Hello');
      stderr.should.be.equal('');
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
      done();
    });
  });

});

describe('puppet-translator argument requirement test', function () {

  it ('`puppet-translator`(has no arguments) should be error', function (done) {
    exec(`node ${bin}`, (err, stdout, stderr) => {
      stderr.should.match(/^ERROR/);
      done();
    }).stdin.end();
  });

});
