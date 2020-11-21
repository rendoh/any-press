<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\ImageController;
use App\Http\Controllers\API\ArticleController;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\TagController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('v1')->group(function () {
    Route::post('register', [UserController::class, 'store']);
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('articles', [ArticleController::class, 'index']);
    Route::get('articles/{article}', [ArticleController::class, 'show']);
    Route::get('categories', [CategoryController::class, 'index']);
    Route::get('categories/{category:slug}', [CategoryController::class, 'show']);
    Route::get('categories/{category:slug}/articles', [ArticleController::class, 'indexByCategory']);
    Route::get('tags', [TagController::class, 'index']);
    Route::get('tags/{tag:slug}', [TagController::class, 'show']);
    Route::get('tags/{tag:slug}/articles', [ArticleController::class, 'indexByTag']);
    Route::get('users', [UserController::class, 'index']);
    Route::get('users/{user}', [UserController::class, 'show']);
    Route::get('users/{user}/articles', [UserController::class, 'articles']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('user', [UserController::class, 'account']);
        Route::put('user', [UserController::class, 'update']);
        Route::get('user/articles', [UserController::class, 'myArticles']);
        Route::post('upload', ImageController::class);
        Route::post('articles', [ArticleController::class, 'store']);
        Route::put('articles/{article}', [ArticleController::class, 'update']);
        Route::delete('articles/{article}', [ArticleController::class, 'destroy']);
    });
});
