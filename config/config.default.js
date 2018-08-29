'use strict';

module.exports = appInfo => {
  return {
    /**
     * egg-tmpfs default config
     * @member Config#tmpfs
     * @property {String} cachePath - where to store the tmp file
     */
    tmpfs: {
      cachePath: appInfo.baseDir + '/tmp',
    },
  };
};

