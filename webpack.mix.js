const mix = require('laravel-mix');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

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

mix.react('src/app.tsx', 'public/assets').webpackConfig({
  output: {
    chunkFilename: 'assets/[id].js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'babel-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx'],
  },
  plugins: [new ForkTsCheckerWebpackPlugin()],
});
