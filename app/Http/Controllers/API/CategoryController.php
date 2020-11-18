<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Repositories\Category\CategoryRepository;
use App\Models\Category;

class CategoryController extends Controller
{
    private CategoryRepository $categories;

    public function __construct(CategoryRepository $categories)
    {
        $this->categories = $categories;
    }

    public function index()
    {
        return $this->categories->getAll();
    }

    public function show(Category $category)
    {
        return $category;
    }
}
