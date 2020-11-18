<?php

namespace App\Repositories\Category;

use App\Models\Category;

class CategoryRepository
{
    public function getAll()
    {
        return Category::all();
    }
}
