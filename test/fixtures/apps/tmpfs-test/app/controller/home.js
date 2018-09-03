'use strict';

const Controller = require('egg').Controller;
const fs = require('fs-extra');
const path = require('path');

class HomeController extends Controller {
  async case1() {
    // create a temp file
    const cotainer = path.resolve(this.app.baseDir, 'tmp-1');
    if (!await fs.exists(cotainer)) {
      await fs.ensureDir(cotainer);
    }
    const tmpFile = path.resolve(cotainer, this.ctx.query.folder);
    await fs.ensureDir(cotainer);
    // mark it's need to be clean
    this.ctx.tmpfs.mark(tmpFile);

    // response
    if (this.ctx.query.scene === 'error') {
      throw new Error('mock error');
    }

    this.ctx.body = 'hi, ' + this.app.plugins.tmpfs.name;
  }

  async case2() {
    // create a temp file which need to be clean when request finished
    await this.ctx.tmpfs.ensureDir(this.ctx.query.folder);

    // response
    if (this.ctx.query.scene === 'error') {
      throw new Error('mock error');
    }

    this.ctx.body = 'hi, ' + this.app.plugins.tmpfs.name;
  }

  async case3() {
    // create a temp file
    const cotainer = path.resolve(this.app.baseDir, 'tmp-3');
    if (!await fs.exists(cotainer)) {
      await fs.ensureDir(cotainer);
    }
    const tmpFile = path.resolve(cotainer, this.ctx.query.folder);
    await fs.ensureDir(tmpFile);
    // mark it's need to be clean
    this.ctx.tmpfs.mark(tmpFile);

    console.log('mock a long process....');

    this.ctx.tmpfs.unmark(tmpFile);

    // response
    if (this.ctx.query.scene === 'error') {
      throw new Error('mock error');
    }

    this.ctx.body = 'hi, ' + this.app.plugins.tmpfs.name;
  }

  async case4() {
    // create a temp file
    const cotainer = path.resolve(this.app.baseDir, 'tmp-4');
    if (!await fs.exists(cotainer)) {
      await fs.ensureDir(cotainer);
    }
    const tmpFile = path.resolve(cotainer, 'not-exist');
    this.ctx.tmpfs.mark(tmpFile);

    // response
    if (this.ctx.query.scene === 'error') {
      throw new Error('mock error');
    }

    this.ctx.body = 'hi, ' + this.app.plugins.tmpfs.name;
  }
}

module.exports = HomeController;
