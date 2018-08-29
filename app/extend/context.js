'use strict';

const TMPFS = Symbol('Context#tmpfs');
const CleanFactory = require('../../lib/clean');

module.exports = {
  get tmpfs() {
    if (!this[TMPFS]) {
      this[TMPFS] = new CleanFactory();
    }
    return this[TMPFS];
  },
};
