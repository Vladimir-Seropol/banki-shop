const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  entry: './src/main.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: isProd ? 'js/[name].[contenthash:8].js' : 'js/[name].js',
    clean: true,
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
          transpileOnly: true,
        },
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        oneOf: [
          // Стили внутри .vue файлов
          {
            resourceQuery: /vue/,
            use: [
              isProd ? MiniCssExtractPlugin.loader : 'vue-style-loader',
              'css-loader',
              {
                loader: 'sass-loader',
                options: {
                  sassOptions: {
                    silenceDeprecations: ['import', 'legacy-js-api'],
                  },
                },
              },
            ],
          },
          // Глобальные стили
          {
            use: [
              isProd ? MiniCssExtractPlugin.loader : 'vue-style-loader',
              'css-loader',
              {
                loader: 'sass-loader',
                options: {
                  sassOptions: {
                    silenceDeprecations: ['import', 'legacy-js-api'],
                  },
                },
              },
            ],
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'vue-style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff2?|ttf|eot)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name][ext]',
        },
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      title: 'Banki.shop',
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: 'public', globOptions: { ignore: ['**/index.html'] } }],
    }),
    ...(isProd ? [new MiniCssExtractPlugin({ filename: 'css/[name].[contenthash:8].css' })] : []),
  ],
  devServer: {
    static: { directory: path.join(__dirname, 'public') },
    historyApiFallback: true,
    port: 8080,
    hot: true,
    open: false,
  },
  devtool: isProd ? 'source-map' : 'eval-cheap-module-source-map',
  performance: {
    hints: false,
  },
};