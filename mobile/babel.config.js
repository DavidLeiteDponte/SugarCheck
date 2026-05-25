module.exports = {
  presets: ['module:metro-react-native-babel-preset'], // o 'babel-preset-expo' si usas Expo
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }]
  ],
};