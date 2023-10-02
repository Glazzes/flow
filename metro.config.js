const {makeMetroConfig} = require('@rnx-kit/metro-config');

const {MetroSerializer} = require('@rnx-kit/metro-serializer');
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
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
});
