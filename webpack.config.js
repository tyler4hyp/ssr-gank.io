const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const glob = require('glob');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
let hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&reload=true';


let dev = process.env.NODE_ENV === 'development' ? true : false ;

function getEntry (rootSrc) {
  var map = {};
  glob.sync(rootSrc + `/**/index.js`).forEach(file => {
    var key = path.relative(rootSrc, file).replace('.js', '');
    if(dev){
      map[key] = [file, hotMiddlewareScript];
    }else{
      map[key] = file
    }
  })
  return map;
}

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  // entry: {
  //   index: ['./src/pages/index/index.js', hotMiddlewareScript]
  // },
  entry: getEntry('./src/pages'),
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist/assets'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
        'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'css-hot-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(njk|nunjucks)$/,
        loader: 'nunjucks-loader'
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin([path.resolve(__dirname, 'dist/assets')]),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new UglifyJsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
};