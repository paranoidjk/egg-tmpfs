'use strict';

const mock = require('egg-mock');
const assert = require('power-assert');

const fs = require('fs');
const path = require('path');

describe('test/tmpfs.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/tmpfs-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should delete tmp folder after request finish', () => {
    app.httpRequest()
      .get('/case1?folder=foo')
      .expect('hi, tmpfs')
      .expect(200)
      .end(() => {
        assert(fs.existsSync(path.resolve(__dirname, app.baseDir, 'tmp-2')) === true);
        assert(fs.existsSync(path.resolve(__dirname, app.baseDir, 'tmp-2/foo')) === false);
      });
  });

  it('should delete tmp folder after request error', () => {
    app.httpRequest()
      .get('/case1?folder=bar&scene=error')
      .expect('mock error')
      .expect(500)
      .end(() => {
        assert(fs.existsSync(path.resolve(__dirname, app.baseDir, 'tmp-2')) === true);
        assert(fs.existsSync(path.resolve(__dirname, app.baseDir, 'tmp-2/bar')) === false);
      });
  });

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
