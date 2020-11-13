<?php

namespace App\Services;

use App\Models\Article;

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
}
