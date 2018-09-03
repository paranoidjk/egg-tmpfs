'use strict';

const mock = require('egg-mock');
const assert = require('power-assert');
const del = require('del');
const fs = require('fs-extra');
const path = require('path');

describe('test/tmpfs.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/tmpfs-test',
    });
    return app.ready();
  });

  after(() => {
    del.sync(path.resolve(app.baseDir, 'tmp'));
    del.sync(path.resolve(app.baseDir, 'tmp-1'));
    del.sync(path.resolve(app.baseDir, 'tmp-3'));
    del.sync(path.resolve(app.baseDir, 'tmp-4'));
  });

  after(() => app.close());
  afterEach(mock.restore);

  describe('mark', () => {
    it('should delete tmp folder after request finish', () => {
      app.httpRequest()
        .get('/case1?folder=foo')
        .expect('hi, tmpfs')
        .expect(200)
        .end(() => {
          assert(fs.existsSync(path.resolve(__dirname, app.baseDir, 'tmp-1')) === true);
          assert(fs.existsSync(path.resolve(__dirname, app.baseDir, 'tmp-1/foo')) === false);
        });
    });

    it('should delete tmp folder after request error', () => {
      app.httpRequest()
        .get('/case1?folder=bar&scene=error')
        .expect('mock error')
        .expect(500)
        .end(() => {
          assert(fs.existsSync(path.resolve(__dirname, app.baseDir, 'tmp-1')) === true);
          assert(fs.existsSync(path.resolve(__dirname, app.baseDir, 'tmp-1/bar')) === false);
        });
    });
  });

  describe('unmark', () => {
    it('should not delete tmp folder after request finish', () => {
      app.httpRequest()
        .get('/case3?folder=xixi')
        .expect('hi, tmpfs')
        .expect(200)
        .end(() => {
          assert(fs.existsSync(path.resolve(__dirname, app.baseDir, 'tmp-3')) === true);
          assert(fs.existsSync(path.resolve(__dirname, app.baseDir, 'tmp-3/xixi')) === true);
        });
    });

    it('should not delete tmp folder after request error', () => {
      app.httpRequest()
        .get('/case3?folder=haha&scene=error')
        .expect('mock error')
        .expect(500)
        .end(() => {
          assert(fs.existsSync(path.resolve(__dirname, app.baseDir, 'tmp-3')) === true);
          assert(fs.existsSync(path.resolve(__dirname, app.baseDir, 'tmp-3/haha')) === true);
        });
    });
  });

  describe('ensureDir', () => {
    it('should delete tmp folder after request finish', () => {
      app.httpRequest()
        .get('/case2?folder=foo')
        .expect('hi, tmpfs')
        .expect(200)
        .end(() => {
          assert(fs.existsSync(path.resolve(__dirname, app.baseDir, 'tmp')) === true);
          assert(fs.existsSync(path.resolve(__dirname, app.baseDir, 'tmp/foo')) === false);
        });
    });

    it('should delete tmp folder after request error', () => {
      app.httpRequest()
        .get('/case2?folder=bar&scene=error')
        .expect('mock error')
        .expect(500)
        .end(() => {
          assert(fs.existsSync(path.resolve(__dirname, app.baseDir, 'tmp')) === true);
          assert(fs.existsSync(path.resolve(__dirname, app.baseDir, 'tmp/bar')) === false);
        });
    });
  });

  describe('mark a not exist path', () => {
    it('should delete tmp folder after request finish', () => {
      app.httpRequest()
        .get('/case4')
        .expect('hi, tmpfs')
        .expect(200)
        .end(() => {
          assert(fs.existsSync(path.resolve(__dirname, app.baseDir, 'tmp-4')) === true);
          assert(fs.existsSync(path.resolve(__dirname, app.baseDir, 'tmp-4/not-exist')) === false);
        });
    });

    it('should delete tmp folder after request error', () => {
      app.httpRequest()
        .get('/case4?scene=error')
        .expect('mock error')
        .expect(500)
        .end(() => {
          assert(fs.existsSync(path.resolve(__dirname, app.baseDir, 'tmp-4')) === true);
          assert(fs.existsSync(path.resolve(__dirname, app.baseDir, 'tmp-4/bar')) === false);
        });
    });
  });
});
