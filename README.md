# sbox

Laravel sandbox project with React.

## Laravel

### setup

```bash
$ php artisan migrate
$ php artisan db:seed --class=FakeDataSeeder
```

## 認証

[Laravel Sanctum](https://laravel.com/docs/8.x/sanctum)を使用する。

※トークン認証ではなく、クッキーベースのセッション認証（[SPA 認証](https://laravel.com/docs/8.x/sanctum#spa-authentication)）を使用

## SPA

開発環境は組み込みの[Laravel Mix](https://laravel.com/docs/8.x/mix)を使用し、TypeScript, React ベースで開発する。

```bash
$ npm install

$ npm run watch # or npm run dev
$ npm run hot # enable HMR
$ npm run prod # build
```

※ここでは Babel Plugin を使うために、 TypeScript のトランスパイルも Babel で行う（詳細は `webpack.mix.js`参照）

## TODO

- [ ] SESSION_LIFETIME 401, 419
- [ ] remember token
