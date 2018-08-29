'use strict';

const CLEAN = Symbol('Context#clean');
const CleanFactory = require('../../lib/clean');

module.exports = {
  get clean() {
    if (!this[CLEAN]) {
      this[CLEAN] = new CleanFactory();
    }
    return this[CLEAN];
  },
};
