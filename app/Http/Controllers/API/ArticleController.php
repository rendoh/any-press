<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Article;
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

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(StoreArticleRequest $request, Article $article)
    {
        $this->authorize('update', $article);
        $this->articlerService->update($article, $request->validated());

        return $article->loadWithRelations();
    }

    // /**
    //  * Remove the specified resource from storage.
    //  *
    //  * @param  int  $id
    //  * @return \Illuminate\Http\Response
    //  */
    // public function destroy($id)
    // {
    //     //
    // }
}
