<?php

namespace App\Repositories\Article;

use App\Models\Article;
use App\Models\User;
use App\Models\Category;
use App\Models\Tag;

class ArticleRepository
{
    public function paginate()
    {
        return Article::public()
            ->pagination();
    }

    public function paginateByUser(User $user)
    {
        return $user
            ->articles()
            ->public()
            ->pagination();
    }

    public function paginateByCategory(Category $category)
    {
        return $category
            ->articles()
            ->public()
            ->pagination();
    }

    public function paginateByTag(Tag $tag)
    {
        return $tag
            ->articles()
            ->public()
            ->pagination();
    }

    public function paginateMyArticles(User $user)
    {
        return $user
            ->articles()
            ->pagination();
    }

    public function loadDetail(Article $article): Article
    {
        return $article->loadWithRelations()->makeVisible(['content']);
    }

    public function create(User $user, array $data): Article
    {
        $data = array_merge($data, ['user_id' => $user->id]);
        $article = Article::create($data);
        if (isset($data['tags'])) {
            $article->tags()->attach($data['tags']);
        }

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
