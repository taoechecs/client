// const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

const INPUT_DIR = path.resolve(__dirname, 'src');
const OUT_DIR = path.resolve(__dirname, 'tmp');

module.exports = {
   mode: 'development',
   entry: ['babel-polyfill', `${INPUT_DIR}/index.js`],
   output: {
      path: OUT_DIR,
      filename: 'bundle.js'
   },
   devServer: {
      compress: true,
      open: true,
      port: 5000,
      stats: 'errors-only'
   },
   module: {
      rules: [
         {
            test: /\.js$/,
            exclude: /node_modules/,
            use: ['babel-loader', 'eslint-loader']
         },
         {
            test: /\.(s*)css$/,
            use: ExtractTextPlugin.extract({
               fallback: 'style-loader',
               use: ['css-loader', 'sass-loader']
            })
         },
         {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            use: {
               loader: 'url-loader',
               options: {
                  limit: 10000,
                  name: 'static/media/[name].[hash:8].[ext]'
               }
            }
         },
         {
            test: /\.html$/,
            use: {
               loader: 'html-loader'
            }
         }
      ]
   },
   plugins: [
      new ExtractTextPlugin({
         filename: 'bundle.css'
      }),
      new HtmlWebPackPlugin({
         template: `./src/index.html`,
         favicon: './src/favicon.ico',
         filename: 'index.html'
      })
   ]
};
