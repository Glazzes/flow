const {makeMetroConfig} = require('@rnx-kit/metro-config');

const {
  MetroSerializer,
  esbuildTransformerConfig,
} = require('@rnx-kit/metro-serializer-esbuild');
const {
  CyclicDependencies,
} = require('@rnx-kit/metro-plugin-cyclic-dependencies-detector');
const {
  DuplicateDependencies,
} = require('@rnx-kit/metro-plugin-duplicates-checker');
const {TypeScriptPlugin} = require('@rnx-kit/metro-plugin-typescript');

module.exports = makeMetroConfig({
  serializer: {
    experimentalSerializerHook: TypeScriptPlugin({throwOnError: true}),
    customSerializer: MetroSerializer([
      CyclicDependencies(),
      DuplicateDependencies({
        ignoredModules: ['react-is', '@react-native/normalize-colors'],
        throwOnError: false,
      }),
    ]),
  },
  transformer: esbuildTransformerConfig,
});

/*
const {getDefaultConfig} = require('expo/metro-configuration');
const {mergeConfig} = require('@react-native/metro-configuration');

const configuration = {};

module.exports = mergeConfig(getDefaultConfig(__dirname), configuration);
*/
