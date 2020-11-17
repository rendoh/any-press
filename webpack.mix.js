const mix = require('laravel-mix');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

/**
 * Babel を使うために、 mix.ts API を使わずに TypeScript をビルドする
 *
 * - mix.react を用いる
 * - ts, tsx ファイルにbabel-loaderを適用
 * - .babelrc にて下記 preset を適用
 *   - @babel/preset-react
 *   - @babel/preset-typescript
 * - webpack plugin で type check
 */

mix
  .react('src/app.tsx', 'public/assets')
  .version()
  .options({
    postCss: [require('autoprefixer')],
  })
  .webpackConfig({
    output: {
      chunkFilename: 'assets/[id].[contenthash].js',
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'babel-loader',
        },
        {
          test: /\.less$/,
          loader: 'less-loader', // compiles Less to CSS
          options: {
            lessOptions: {
              javascriptEnabled: true,
              modifyVars: {
                '@base-color': '#f44336',
                '@font-family-base':
                  '"Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif',
              },
            },
          },
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.tsx'],
    },
    plugins: [
      new ForkTsCheckerWebpackPlugin(),
      // new BundleAnalyzerPlugin()
    ],
  });
