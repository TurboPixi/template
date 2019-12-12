const
  os = require('os'),
  path = require('path'),
  webpack = require('webpack'),
  {VueLoaderPlugin} = require('vue-loader'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin')

const prod = process.argv.includes('-p')

const conf = {
  entry: [
    'bootstrap/dist/css/bootstrap.min.css',
    './src/app.js',
    './src/style.less'
  ],

  output: {
    path: path.resolve('dist'),
    filename: `app.[${prod ? 'contenthash' : 'hash'}].js`
  },

  resolve: {
    alias: {
      '@': path.resolve('.')
    }
  },

  devServer: {
    hot: true,
    host: '0.0.0.0',
  },

  devtool: prod ? false : 'source-map',

  stats: 'errors-only',

  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false
          }
        }
      },
      {
        test: /\.css$/,
        use: [prod ? MiniCssExtractPlugin.loader : 'vue-style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.less$/,
        use: [prod ? MiniCssExtractPlugin.loader : 'vue-style-loader', 'css-loader', 'postcss-loader', 'less-loader']
      },
      {
        test: /\.txt$/,
        use: ['raw-loader']
      },
      {
        test: /\.(jpg|png|jpeg|gif|svg)$/,
        use: ['url-loader']
      }
    ]
  },

  plugins: [
    new VueLoaderPlugin(),

    new webpack.ProvidePlugin({
      PIXI: 'pixi.js',
      Prism: 'prismjs',
      Router: ['vue-router', 'default'],
      Vue: ['vue/dist/vue.esm.js', 'default'],
    }),

    new HtmlWebpackPlugin({
      template: './src/layout.html',
      filename: 'index.html',
      inject: 'body',
      minify: {
        collapseWhitespace: true
      }
    })
  ],

  mode: prod ? 'production' : 'development'
}

if (prod) {
  conf.plugins.push(new MiniCssExtractPlugin({
    filename: 'style.[contenthash].css'
  }))

  conf.optimization = {
    splitChunks: {
      chunks: 'all'
    }
  }
}

module.exports = conf
