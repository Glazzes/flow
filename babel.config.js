module.exports = {
  presets: ['@rnx-kit/babel-preset-metro-react-native'],
  plugins: [
    ['module:react-native-dotenv'],
    ['babel-plugin-transform-typescript-metadata'],
    ['@babel/plugin-proposal-decorators', {legacy: true}],
    [
      'babel-plugin-root-import',
      {
        paths: [
          {
            rootPathSuffix: './src/domain',
            rootPathPrefix: '@domain/',
          },
          {
            rootPathSuffix: './src/data',
            rootPathPrefix: '@data/',
          },
          {
            rootPathSuffix: './src/ui',
            rootPathPrefix: '@ui/',
          },
        ],
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
