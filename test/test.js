'use strict';

const path = require('path');
const clt = require('command-line-test');
const pkg = require('../package');
const bin = path.resolve(pkg.bin);

describe('puppet-translator translate function test', function () {
  this.timeout(10000);
  it ('`puppet-translator -x hello` should return "こんにちは"', function () {
    let c = new clt();
    return c.execFile(bin, ['-x', 'hello'], {}).then(res => {
      console.log(res);
      res.stdout.should.be.equal('こんにちは');
    });
  });
});
