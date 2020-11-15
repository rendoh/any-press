<?php

namespace App\Http\Controllers;

use App\Models\Article;

class ArticleDetailController extends Controller
{
    public function __invoke(Article $article)
    {
        return view('app', [
            'title' => $article->title,
            'description' => $article->excerpt,
            'type' => 'article',
            'image' => $article->image ?? null,
            'pathname' => "/articles/$article->id",
        ]);
    }
}
