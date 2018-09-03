'use strict';


module.exports = () => {
  return async function(ctx, next) {
    try {
      await next();
    } finally {
      await ctx.tmpfs.clean();
    }
  };
};
