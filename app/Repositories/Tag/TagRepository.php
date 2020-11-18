<?php

namespace App\Repositories\Tag;

use App\Models\Tag;

class TagRepository
{
    public function getAll()
    {
        return Tag::all();
    }
}
