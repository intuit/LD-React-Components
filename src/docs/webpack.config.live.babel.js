const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = () => {
  const isProd = process.env.NODE_ENV === 'production';

  return {
    mode: 'development',
    entry: [
      !isProd && 'react-hot-loader/patch',
      // activate HMR for React

      !isProd && 'webpack-dev-server/client?http://localhost:8888',
      // bundle the client for webpack-dev-server
      // and connect to the provided endpoint

      !isProd && 'webpack/hot/only-dev-server',
      // bundle the client for hot reloading
      // only- means to only hot reload for successful updates

      './src/docs/index.js'
      // the entry point of our app
    ].filter(Boolean),

    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: isProd ? '/LD-React-Components' : '/'
      // necessary for HMR to know where to load the hot update chunks
    },

    devtool: 'inline-source-map',

    devServer: {
      hot: !isProd,
      // enable HMR on the server

      contentBase: path.resolve(__dirname, 'dist'),
      // match the output path

      publicPath: '/',
      // match the output `publicPath`

      stats: 'minimal'
    },

    module: {
      rules: [
        {
          test: /.jsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react']
              }
            }
          ]
        },
        {
          test: /\.(scss)$/,
          loader: 'style-loader!css-loader!sass-loader'
        }
      ]
    },

    resolve: {
      extensions: ['.js', '.jsx', '.scss']
    },

    plugins: [
      !isProd && new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({ template: path.join(__dirname, './index.html') })
    ].filter(Boolean),
    optimization: {
      namedModules: true
    }
  };
};
