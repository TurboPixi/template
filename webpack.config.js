const os = require('os')
const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')


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
    'antd/dist/antd.less',
    './src/app.js',
  ],

  output: {
    path: path.resolve('dist'),
    filename: prod ? 'app.[chunkhash:8].js' : 'app.js',
    chunkFilename: '[name].[chunkhash:8].js',
    publicPath: '/'
  },

  resolve: {
    alias: {
      '@': path.resolve('.')
    }
  },

  devServer: {
    hot: true,
    host: '0.0.0.0',
    contentBase: '.',
    stats: 'errors-only',
    historyApiFallback: true,
    overlay: {
      errors: true
    }
  },

  devtool: prod ? false : 'source-map',

  stats: 'errors-only',

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        use: ['eslint-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      // for custom
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: prod ?
          [MiniCssExtractPlugin.loader, cssLoader, 'postcss-loader', lessLoader] :
          ['style-loader', cssLoader, 'postcss-loader', lessLoader]
      },
      // for node_modules
      {
        test: /\.less$/,
        include: /node_modules/,
        use: prod ?
          [MiniCssExtractPlugin.loader, 'css-loader', lessLoader] :
          ['style-loader', 'css-loader', lessLoader]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: prod ? [MiniCssExtractPlugin.loader, cssLoader, 'postcss-loader'] : ['style-loader', cssLoader, 'postcss-loader']
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: prod ? [MiniCssExtractPlugin.loader, 'css-loader'] : ['style-loader', 'css-loader']
      }
    ]
  },

  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
      ReactDOM: 'react-dom'
    }),

    new HtmlWebpackPlugin({
      hash: true,
      template: './src/layout.html',
      filename: 'index.html',
      inject: 'body',
      minify: {
        collapseWhitespace: true
      }
    }),

    new webpack.DefinePlugin({
      PROD: JSON.stringify(prod)
    })
  ],

  mode: prod ? 'production' : 'development',

  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        antd: {
          test: /node_modules\/(antd|@ant-design)/,
          name: 'antd',
          chunks: 'all'
        },

        react: {
          test: /node_modules\/react/,
          name: 'react',
          chunks: 'all'
        }
      }
    }
  }
}

if (prod) {
  Object.assign(conf.optimization, {
    minimize: true,
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
  })

  conf.plugins.push(
    new MiniCssExtractPlugin({
      filename: 'style.[contenthash:8].css'
    }),
  )
} else {
  conf.entry.unshift('react-hot-loader/patch')

  Object.assign(conf.resolve.alias, {
    'react-dom': '@hot-loader/react-dom'
  })

  conf.plugins.push(
    new FriendlyErrorsWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  )
}

module.exports = conf
