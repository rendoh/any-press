<?php

namespace App\Services;

use App\Models\Article;
use App\Models\User;

class ArticleService
{
    public function paginate()
    {
        return Article::with(['user', 'category', 'tags'])
            ->where('public', true)
            ->latest()
            ->paginate(10);
    }

    public function getDetail($id)
    {
        return Article::with(['user', 'category', 'tags'])
            ->where([
                'id' => $id,
                'public' => true,
            ])
            ->firstOrFail()
            ->append(['html']);
    }

    public function create(User $user, array $data): Article
    {
        $data = array_merge($data, ['user_id' => $user->id]);
        $article = Article::create($data);
        $article->tags()->attach($data['tags']);

        return $article;
    }
}
