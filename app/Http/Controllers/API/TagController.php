<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Services\TagService;

class TagController extends Controller
{
    private TagService $tagService;

    public function __construct(TagService $tagService)
    {
        $this->tagService = $tagService;
    }
    public function index()
    {
        return $this->tagService->getAll();
    }
}
