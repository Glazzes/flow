module.exports = {
  presets: ['@rnx-kit/babel-preset-metro-react-native'],
  plugins: [
    ['@babel/plugin-proposal-decorators', {legacy: true}],
    'react-native-reanimated/plugin',
  ],
};
