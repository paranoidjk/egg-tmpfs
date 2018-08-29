'use strict';

const TMPFS = Symbol('Context#tmpfs');
const TmpFsFactory = require('../../lib/tmpfs');

module.exports = {
  get tmpfs() {
    if (!this[TMPFS]) {
      this[TMPFS] = new TmpFsFactory(this.app.config.tmpfs);
    }
    return this[TMPFS];
  },
};
