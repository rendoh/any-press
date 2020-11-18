<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Repositories\Tag\TagRepository;
use App\Models\Tag;

class TagController extends Controller
{
    private TagRepository $tags;

    public function __construct(TagRepository $tags)
    {
        $this->tags = $tags;
    }

    public function index()
    {
        return $this->tags->getAll();
    }

    public function show(Tag $tag)
    {
        return $tag;
    }
}
