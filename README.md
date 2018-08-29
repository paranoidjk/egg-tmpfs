# egg-tmpfs

[![Greenkeeper badge](https://badges.greenkeeper.io/paranoidjk/egg-tmpfs.svg)](https://greenkeeper.io/)

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-tmpfs.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-tmpfs
[travis-image]: https://img.shields.io/travis/paranoidjk/egg-tmpfs.svg?style=flat-square
[travis-url]: https://travis-ci.org/paranoidjk/egg-tmpfs
[codecov-image]: https://img.shields.io/codecov/c/github/paranoidjk/egg-tmpfs.svg?style=flat-square
[codecov-url]: https://codecov.io/github/paranoidjk/egg-tmpfs?branch=master
[david-image]: https://img.shields.io/david/paranoidjk/egg-tmpfs.svg?style=flat-square
[david-url]: https://david-dm.org/paranoidjk/egg-tmpfs
[snyk-image]: https://snyk.io/test/npm/egg-tmpfs/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-tmpfs
[download-image]: https://img.shields.io/npm/dm/egg-tmpfs.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-tmpfs

<!--
Description here.
-->

## Install

```bash
$ npm i egg-tmpfs --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.tmpfs = {
  enable: true,
  package: 'egg-tmpfs',
};
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.tmpfs = {
  baseTmpPath: '/foo/bar',
};
```

see [config/config.default.js](config/config.default.js) for more detail.

## api

#### ctx.tmpfs.mkdirSync(path[, mode])

same as [fs.mkdirSync](https://nodejs.org/dist/latest-v8.x/docs/api/fs.html#fs_fs_mkdirsync_path_mode), but path will based on `config.tmpfs.baseTmpPath`, and the created folder will be auto cleand when request is finished or errored.


#### ctx.tmpfs.mark(path)

just incase you have to use original node fs module, then you can create file first, then mark it need to be delete.

#### ctx.tmpfs.unmark(path)

to revert what `ctx.tmpfs.mark(path)` did.

#### ctx.tmpfs.clean()

Generally, you do not need to use this :) egg-tmpfs will auto call clean.

## Example

see [test](/test/fixtures/apps/tmpfs-test/app/controller/home.js)

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](LICENSE)
