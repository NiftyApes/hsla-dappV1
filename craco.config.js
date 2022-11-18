/* eslint-disable func-names */
/* eslint-disable import/no-extraneous-dependencies */
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = function () {
  return {
    webpack: {
      plugins: [new BundleAnalyzerPlugin({ analyzerMode: 'server' })],
    },
  };
};
