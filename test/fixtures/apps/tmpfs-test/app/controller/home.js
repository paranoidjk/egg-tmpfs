'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');

class HomeController extends Controller {
  async case1() {
    // create a temp file
    const tmpFile = path.resolve(this.app.baseDir, 'tmp-2', this.ctx.query.folder);
    fs.mkdirSync(tmpFile);
    // mark it's need to be clean
    this.ctx.tmpfs.add(tmpFile);

    // response
    if (this.ctx.query.scene === 'error') {
      throw new Error('mock error');
    }

    this.ctx.body = 'hi, ' + this.app.plugins.tmpfs.name;
  }

  async case2() {
    // create a temp file
    this.ctx.tmpfs.mkdirSync(this.ctx.query.folder);

    // response
    if (this.ctx.query.scene === 'error') {
      throw new Error('mock error');
    }

    this.ctx.body = 'hi, ' + this.app.plugins.tmpfs.name;
  }
}

module.exports = HomeController;
