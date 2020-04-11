const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const prod = process.argv.includes('-p')

const cssLoader = {
  loader: 'css-loader',
  options: {
    modules: true,
  },
}

const lessLoader = {
  loader: 'less-loader',
  options: {
    javascriptEnabled: true
  }
}

const conf = {
  entry: [
    './src/app.js',
  ],

  target: 'node',

  output: {
    path: path.resolve('dist'),
    filename: 'server.js',
    chunkFilename: '[name].[chunkhash:8].js',
    publicPath: '/',
    libraryTarget: 'commonjs2'
  },

  externals: /\.css$/,

  resolve: {
    alias: {
      '@': path.resolve('.'),
      '~': path.resolve('src')
    }
  },

  devtool: prod ? false : 'source-map',

  stats: 'errors-only',

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      // for custom
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, cssLoader, 'postcss-loader', lessLoader]
      },
      // for node_modules
      {
        test: /\.less$/,
        include: /node_modules/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', lessLoader]
      },

      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, cssLoader, 'postcss-loader']
      },
      // for node_modules
      {
        test: /\.css$/,
        include: /node_modules/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },

  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
      ReactDOM: 'react-dom'
    }),

    new webpack.DefinePlugin({
      PROD: JSON.stringify(prod)
    }),

    new MiniCssExtractPlugin({
      filename: 'style.[contenthash:8].css'
    }),
  ],

  mode: prod ? 'production' : 'development',

  optimization: {
    minimize: false,
    minimizer: [
      new TerserPlugin({
        parallel: 4,
        extractComments: false,
        terserOptions: {
          output: {
            comments: false
          }
        },
      })
    ]
  }
}

module.exports = conf
