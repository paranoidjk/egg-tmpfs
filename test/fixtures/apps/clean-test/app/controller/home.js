'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');

class HomeController extends Controller {
  async index() {
    fs.mkdirSync(path.resolve(this.app.config.cachePath, 'foo'));
    this.ctx.body = 'hi, ' + this.app.plugins.clean.name;
  }
}

module.exports = HomeController;
