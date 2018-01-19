const path = require('path');
const webpack = require('webpack');

const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const PRODUCTION = process.env.NODE_ENV === 'production';
const publicPath = path.resolve(__dirname, 'dist');

module.exports = {
  entry: [
    './assets/js/main.js',
    './assets/sass/main.scss',
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
    // publicPath
  },
  module: {
    loaders: [
      {
        test: [/\.jsx?$/],
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
    ],
    rules: [
      {
        test: /\.scss$/,
        use: ['css-hot-loader'].concat(ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader','sass-loader'],
        })),
      },
      {
        test: /\.(js)$/,
        exclude: /(node_modules|bower_components)/,
        use : ['babel-loader']
      },
      {
        test: /\.(jpe|jpg|woff|woff2|eot|ttf|svg)(\?.*$|$)/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            }
          }
        ]
      },
    ]
  },
  plugins: [
    new ExtractTextWebpackPlugin({ 
      filename: 'styles.css',   
      disable: false, 
      allChunks: true 
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devtool: 'inline-source-map',
  devServer: {
    // contentBase: path.join(__dirname),
    hot: true,
    inline: true,
    compress: true
  }
};
