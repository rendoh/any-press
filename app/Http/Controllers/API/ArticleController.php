<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\User;
use App\Models\Category;
use App\Models\Tag;
use App\Http\Requests\StoreArticleRequest;
use App\Repositories\Article\ArticleRepository;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    private ArticleRepository $articles;

    public function __construct(ArticleRepository $articles)
    {
        $this->articles = $articles;
    }

    public function index(Request $request)
    {
        return $this->articles->paginate($request->search);
    }

    public function indexByCategory(Category $category)
    {
        return $this->articles->paginateByCategory($category);
    }

    public function indexByTag(Tag $tag)
    {
        return $this->articles->paginateByTag($tag);
    }

    public function store(StoreArticleRequest $request)
    {
        $user = auth()->user();
        $article = $this->articles->create($user, $request->validated());

        return response()->json($article, 201);
    }

    public function show(Article $article)
    {
        $this->authorize('view', $article);

        return $this->articles->loadDetail($article);
    }

    public function update(StoreArticleRequest $request, Article $article)
    {
        $this->authorize('update', $article);
        $this->articles->update($article, $request->validated());

        return $this->articles->loadDetail($article);
    }

    public function destroy(Article $article)
    {
        $this->authorize('delete', $article);
        $this->articles->delete($article);

        return response()->noContent();
    }
}
