'use strict';

const path = require('path');
const clt = require('command-line-test');
const pkg = require('../package');
const bin = path.resolve(pkg.bin);

describe('puppet-translator translate function test', function () {

  this.timeout(10000);

  it ('`puppet-translator -x hello` should return "こんにちは"', function () {
    let c = new clt();
    return c.exec(`node ${bin} -x hello`).then(res => {
      res.stdout.should.be.equal('こんにちは');
    });
  });

  it ('`puppet-translator -f ja -t en -x こんにちは` should return "Hello"', function () {
    let c = new clt();
    return c.exec(`node ${bin} -f ja -t en -x "こんにちは"`).then(res => {
      res.stdout.should.be.equal('Hello');
    });
  });

});

/*
describe('puppet-translator argument requirement test', function () {

  it ('`puppet-translator`(has no arguments) should be error', function () {
    let c = new clt();
    return c.execFile(bin, [], {}).then(res => {
      assert.include(res.stderr, 'ERROR');
    });
  });

});
*/
