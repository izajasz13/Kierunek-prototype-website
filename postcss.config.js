module.exports = {
    plugins: {
      'autoprefixer': {},
      'postcss-animation': {},
      'postcss-transition': {},
      'postcss-ie11': {
          "pluginToBeDisabled": false,
          "pluginToBeEnabled": true
      },
      'postcss-import': {},
      'postcss-preset-env': {},
      'postcss-css-variables': {},
      'postcss-custom-properties': {},
      'postcss-nested': {},
      'precss': {},
      'cssnano': {}
    }
  }