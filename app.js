'use strict';
const { init } = require('./lib/tmpfs');
module.exports = app => {
  app.beforeStart(async () => {
    await init(app);
  });
  app.config.coreMiddleware.push('tmpfs');
};
