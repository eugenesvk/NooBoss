const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const base = {
  cache: true,
  entry: {
    popup: './src/popup/index.js',
    background: './src/background/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          presets: ['@babel/preset-react', '@babel/preset-env'],
          plugins: [
            'babel-plugin-lodash',
            '@babel/plugin-proposal-object-rest-spread',
            '@babel/plugin-transform-async-to-generator',
            '@babel/plugin-transform-property-literals',
            [
              '@babel/plugin-transform-runtime',
              {
                helpers: false,
                regenerator: true,
                absoluteRuntime: '@babel/runtime',
              },
            ],
          ],
        },
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: './src/popup/popup.html' },
        { from: './src/manifest.json' },
        { from: './src/images', to: 'images' },
        { from: './src/thirdParty', to: 'thirdParty' },
      ],
    }),
  ],
};

module.exports = (env) => {
  env = env || {};
  const isProd = env.production;
  base.mode = isProd ? 'production' : 'development';
  if (isProd) {
    base.plugins.push(
      (optimization.minimizer = [
        new TerserPlugin({
          compress: { warnings: false },
        }),
      ])
    );

    base.plugins.push(
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
      })
    );
  } else {
    base.devtool = 'inline-source-map';
  }
  return base;
};
