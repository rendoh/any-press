<?php

use Illuminate\Support\Facades\Route;

/**
 * React アプリケーションを `/api` を除く全てのパスにマッチさせる
 */

Route::view('/{any}', 'app')->where('any', '^(?!api).*');
