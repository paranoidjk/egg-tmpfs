'use strict';

const del = require('del');
const fs = require('fs');
const path = require('path');

module.exports = class TmpFsFactory {
  constructor(config) {
    this.tmpFolders = [];
    this.config = config;
    if (!fs.existsSync(this.config.cachePath)) {
      fs.mkdirSync(this.config.cachePath);
    }
  }
  add(folderPath) {
    this.tmpFolders.push(folderPath);
  }
  clean() {
    del.sync(this.tmpFolders);
  }
  mkdirSync(_path, ...args) {
    _path = path.resolve(this.config.cachePath, _path);
    fs.mkdirSync(_path, ...args);
    this.add(_path);
  }
};
