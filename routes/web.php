<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ArticleDetailController;

/**
 * React アプリケーションを `/api` を除く全てのパスにマッチさせる
 */

Route::get('/articles/{article}', ArticleDetailController::class);

Route::view('/{any}', 'app', [
    'title' => config('app.name'),
    'description' => 'AnyPress',
    'type' => 'website',
    'image' => null,
    'pathname' => '/',
])->where('any', '^(?!api).*');
