const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const helpers = require('./helpers');

const config = {
  entry: {
    polyfills: './src/ts/polyfills.ts',
    vendors: [
      '@angular/platform-browser',
      '@angular/platform-browser-dynamic',
      '@angular/core',
      '@angular/common',
      '@angular/forms',
      '@angular/http',
      '@angular/router',
      'rxjs'
    ],
    app: './src/ts/app/index.ts',
    style: './src/scss/index.scss'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './dist/')
  },
  resolve: {
    extensions:['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback:'style-loader',
          use: ["css-loader", "sass-loader"]
        })
      },
      {
        test: /\.ts$/,
        loaders: [
          {
            loader: 'ts-loader',
            options: {
              configFile: helpers.root('./', 'tsconfig.json')
            }
          },
          {
            loader: 'angular2-template-loader'
          }
        ],
        exclude: /node_modules/,
        
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all"
        }
      }
    }
  },
  plugins: [
    new webpack.ContextReplacementPlugin(/\@angular(\\|\/)core(\\|\/)esm5/, path.join(__dirname, './src'), {}),
    new HtmlWebpackPlugin({
      template: 'wwwroot/index.html'
    }),
    new ExtractTextPlugin({
      filename:'[name].css'
    })
  ],
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: './wwwroot/',
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
  }
};

module.exports = config;
