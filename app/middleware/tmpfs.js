'use strict';


module.exports = () => {
  return async function(ctx, next) {
    const doClean = () => ctx.tmpfs.clean();
    try {
      await next();
    } catch (err) {
      doClean();
      throw err;
    }
    doClean();
  };
};
