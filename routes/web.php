<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ArticleDetailController;

Route::get('/articles/{article}', ArticleDetailController::class)
    ->where('article', '[0-9]+');

/**
 * React アプリケーションを `/api` を除く全てのパスにマッチさせる
 */
Route::view('/{any}', 'app', [
    'title' => config('app.name'),
    'description' => 'AnyPress',
    'type' => 'website',
    'image' => null,
    'pathname' => '/',
])->where('any', '^(?!api).*');
