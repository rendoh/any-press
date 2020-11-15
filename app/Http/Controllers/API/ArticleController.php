<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\User;
use App\Models\Category;
use App\Models\Tag;
use App\Http\Requests\StoreArticleRequest;
use App\Services\ArticleService;

class ArticleController extends Controller
{
    private ArticleService $articlerService;

    public function __construct(ArticleService $articlerService)
    {
        $this->articlerService = $articlerService;
    }

    public function index()
    {
        return $this->articlerService->paginate();
    }

    public function indexByUser(User $user)
    {
        return $this->articlerService->paginateByUser($user);
    }

    public function indexByCategory(Category $category)
    {
        return $this->articlerService->paginateByCategory($category);
    }

    public function indexByTag(Tag $tag)
    {
        return $this->articlerService->paginateByTag($tag);
    }

    public function store(StoreArticleRequest $request)
    {
        $user = auth()->user();
        $article = $this->articlerService->create($user, $request->validated());

        return response()->json($article, 201);
    }

    public function show($id)
    {
        return $this->articlerService->getDetail($id);
    }

    public function update(StoreArticleRequest $request, Article $article)
    {
        $this->authorize('update', $article);
        $this->articlerService->update($article, $request->validated());

        return $article->loadWithRelations();
    }

    public function destroy(Article $article)
    {
        $this->authorize('delete', $article);
        $this->articlerService->delete($article);

        return response()->noContent();
    }
}
