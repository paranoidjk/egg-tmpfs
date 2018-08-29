'use strict';

module.exports = appInfo => {
  return {
    /**
     * egg-tmpfs default config
     * @member Config#tmpfs
     * @property {String} baseTmpPath - where to store the tmp file
     */
    tmpfs: {
      baseTmpPath: appInfo.baseDir + '/tmp',
    },
  };
};

