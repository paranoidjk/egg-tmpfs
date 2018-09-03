'use strict';

const del = require('del');
const fs = require('fs-extra');
const path = require('path');

module.exports = class TmpFsFactory {
  constructor(config) {
    this.tmpFolders = [];
    this.config = config;
  }
  mark(folderPath) {
    this.tmpFolders.push(folderPath);
  }
  unmark(folderPath) {
    this.tmpFolders = this.tmpFolders.filter(p => p !== folderPath);
  }
  async clean() {
    return del(this.tmpFolders);
  }
  async ensureDir(_path, ...args) {
    _path = path.resolve(this.config.baseTmpPath, _path);
    const res = await fs.ensureDir(_path, ...args);
    this.mark(_path);
    return res;
  }
};

module.exports.init = async function(app) {
  if (!await fs.pathExists(app.config.tmpfs.baseTmpPath)) {
    await fs.ensureDir(app.config.tmpfs.baseTmpPath);
  }
};
