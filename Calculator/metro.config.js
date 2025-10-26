const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const path = require('path');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  serializer: {
    getPolyfills: () => [require.resolve(path.resolve(__dirname, 'polyfill.js'))],
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
