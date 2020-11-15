<?php

namespace App\Services;

use App\Models\Article;
use App\Models\User;
use App\Models\Category;
use App\Models\Tag;

class ArticleService
{
    public function paginate()
    {
        return Article::asPagination();
    }

    public function paginateByUser(User $user)
    {
        return $user
            ->articles()
            ->asPagination();
    }

    public function paginateByCategory(Category $category)
    {
        return $category
            ->articles()
            ->asPagination();
    }

    public function paginateByTag(Tag $tag)
    {
        return $tag
            ->articles()
            ->asPagination();
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
