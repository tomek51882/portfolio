const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PACKAGE = require('./package.json');
// const dotenv = require('dotenv');
  const mode = 'development';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = ()=>{

  const mode = 'development';

  return {
    entry: './src/index.tsx',
    mode:mode,
    output:{
      path: path.resolve(__dirname, 'dist'),
      // filename: `three-${PACKAGE.version}.min.js`,
      filename: `index.js`,
      library: {
        name: 'portfolio',
        type: 'umd',
      },
    },
    module:{
      rules: [
        {
          test: /(\.ts|\.tsx)$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        }
      ],
    },
    resolve:{
      extensions: ['.ts', '.js','.tsx'],
    },
    target:"web",
    devtool: 'source-map',
    devServer: {
      hot: true,
      static: './public',
      headers: {
        "Cross-Origin-Opener-Policy" : "same-origin",
        "Cross-Origin-Embedder-Policy": "require-corp"
      }
    },
    plugins:[
      new HtmlWebpackPlugin({
        template: 'public/index.html', //for offline package
      }),
      new MiniCssExtractPlugin({filename:"viewer.css"}),
      //new webpack.DefinePlugin(envKeys),
      new webpack.DefinePlugin({"process.env.REACT_APP_VERSION":JSON.stringify(`${PACKAGE.version}`)}),
      new webpack.DefinePlugin({"process.env.REACT_APP_DEVELOPMENT_BUILD":JSON.stringify(mode)})
    ]
  };
};