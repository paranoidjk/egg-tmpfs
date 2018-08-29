'use strict';

const del = require('del');
const fs = require('fs');
const path = require('path');

module.exports = class TmpFsFactory {
  constructor(config) {
    this.tmpFolders = [];
    this.config = config;
    if (!fs.existsSync(this.config.baseTmpPath)) {
      fs.mkdirSync(this.config.baseTmpPath);
    }
  }
  mark(folderPath) {
    this.tmpFolders.push(folderPath);
  }
  unmark(folderPath) {
    this.tmpFolders = this.tmpFolders.filter(p => p !== folderPath);
  }
  clean() {
    del.sync(this.tmpFolders);
  }
  mkdirSync(_path, ...args) {
    _path = path.resolve(this.config.baseTmpPath, _path);
    fs.mkdirSync(_path, ...args);
    this.mark(_path);
  }
};
