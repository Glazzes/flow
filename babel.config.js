module.exports = {
  presets: ['babel-preset-expo'],
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
          {
            rootPathSuffix: './src/configuration',
            rootPathPrefix: '@configuration/',
          },
          {
            rootPathSuffix: './assets',
            rootPathPrefix: '@assets/',
          },
        ],
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
