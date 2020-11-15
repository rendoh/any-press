<?php

namespace App\Services;

use App\Models\Article;
use App\Models\User;

class ArticleService
{
    public function paginate()
    {
        return Article::withRelations()
            ->public()
            ->latest()
            ->paginate(10);
    }

    public function paginateByUser(User $user)
    {
        return $user
            ->articles()
            ->withRelations()
            ->public()
            ->latest()
            ->paginate(10);
    }

    public function getDetail($id)
    {
        return Article::withRelations()
            ->where([
                'id' => $id,
                'public' => true,
            ])
            ->firstOrFail()
            ->makeVisible(['content']);
    }

    public function create(User $user, array $data): Article
    {
        $data = array_merge($data, ['user_id' => $user->id]);
        $article = Article::create($data);
        $article->tags()->attach($data['tags']);

        return $article;
    }

    public function update(Article $article, array $data): Article
    {
        $article->update($data);
        $article->tags()->sync($data['tags']);

        return $article;
    }

    public function delete(Article $article)
    {
        $article->delete();
    }
}
