const path = require('path')

module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: './index.tsx',

  output: {
    path: path.resolve(__dirname, '../../dist/client'),
    filename: 'bundle.js',
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: [
      '.ts', '.js', '.tsx', '.json'
    ],
  },

  devServer: {
    host: '0.0.0.0',
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