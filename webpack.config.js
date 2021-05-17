const path = require('path');

module.exports = {
    mode : 'development',
    entry:['babel-polyfill', './src/index.js'],
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
                plugins: ['@babel/plugin-proposal-object-rest-spread']
              }
            }
          }
        ]
      }

};