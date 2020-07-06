const path = require('path')

module.exports = {
  context: __dirname,
  entry: './index.tsx',

  output: {
    path: path.resolve(__dirname, '../../dist/client'),
    filename: 'bundle.js',
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
    extensions: [
      '.ts', '.js', '.tsx', '.json'
    ],
  },

  module: {
    rules: [
      { test: /\.ts/, loader: 'ts-loader' },
      { test: /\.html$/, loader: 'file-loader?name=[name].html' },
      { test: /\.png/, loader: 'file-loader?name=[name].png' },
      { test: /\.css/, loaders: ['style-loader', 'css-loader'] },
    ],
  },
}