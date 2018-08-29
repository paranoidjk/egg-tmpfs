'use strict';
const del = require('del');

module.exports = class CleanFactory {
  constructor() {
    this.tmpFolders = [];
  }
  add(folderPath) {
    this.tmpFolders.push(folderPath);
  }
  clean() {
    del.sync(this.tmpFolders);
  }
};
