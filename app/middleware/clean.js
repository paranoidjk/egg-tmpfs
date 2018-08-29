'use strict';


module.exports = () => {
  return async function clean(ctx, next) {
    await next();
    ctx.clean();
  };
};
