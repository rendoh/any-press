<?php

namespace App\Repositories\Article;

use App\Models\Article;
use App\Models\User;
use App\Models\Category;
use App\Models\Tag;

class ArticleRepository
{
    const PAGINATE_COUNT = 10;

    public function paginate()
    {
        return Article::withRelations()
            ->public()
            ->latest()
            ->paginate(self::PAGINATE_COUNT);
    }

    public function paginateByUser(User $user)
    {
        return $user
            ->articles()
            ->withRelations()
            ->public()
            ->latest()
            ->paginate(self::PAGINATE_COUNT);
    }

    public function paginateByCategory(Category $category)
    {
        return $category
            ->articles()
            ->withRelations()
            ->public()
            ->latest()
            ->paginate(self::PAGINATE_COUNT);
    }

    public function paginateByTag(Tag $tag)
    {
        return $tag
            ->articles()
            ->withRelations()
            ->public()
            ->latest()
            ->paginate(self::PAGINATE_COUNT);
    }

    public function paginateMyArticles(User $user)
    {
        return $user
            ->articles()
            ->withRelations()
            ->latest()
            ->paginate(self::PAGINATE_COUNT);
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
