module.exports = {
  presets: ['@rnx-kit/babel-preset-metro-react-native', 'babel-preset-expo'],
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
        ],
      },
    ],
    'expo-router/babel',
    'react-native-reanimated/plugin',
  ],
};
