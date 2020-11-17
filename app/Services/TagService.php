<?php

namespace App\Services;

use App\Models\Tag;

class TagService
{
    public function getAll()
    {
        return Tag::all();
    }
}
