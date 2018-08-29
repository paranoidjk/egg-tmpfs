'use strict';

module.exports = app => {
  const { router, controller } = app;

  router.get('/case1', controller.home.case1);
  router.get('/case2', controller.home.case2);
  router.get('/case3', controller.home.case3);
};
