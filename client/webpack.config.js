const dotenv = require('dotenv')

dotenv.config({ path: '.env.dev' })
dotenv.config()

const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

/* Check if we're in client folder or somewhere above */
const ROOT = process.cwd()
const SRC = path.resolve(ROOT, './src')
const DIST = path.resolve(ROOT, './dist')

module.exports = {
  context: SRC,
  entry: './index.tsx',

  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  output: { path: DIST, filename: 'bundle-[hash].js' },

  resolve: {
    alias: {
      '@': SRC,
    },
    extensions: [
      '.ts', '.js', '.tsx', '.json'
    ],
  },

  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
      { test: /\.css?$/, loader: ['style-loader', 'css-loader'] },
      { test: /\.(woff|eot|svg|png|woff2|ttf|mp3|wav)$/, loader: 'file-loader' },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      chunksSortMode: 'none',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.SERVER_HOST': JSON.stringify(process.env.SERVER_HOST),
      'process.env.SERVER_PORT': JSON.stringify(process.env.SERVER_PORT),
    }),
  ],
}
