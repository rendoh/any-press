<?php

namespace Database\Factories;

use App\Models\Article;
use App\Models\User;
use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Storage;

class ArticleFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Article::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'title' => $this->faker->realText($this->faker->numberBetween(10, 30)),
            'content' => $this->faker->realText($this->faker->numberBetween(80, 1000)),
            'public' => $this->faker->numberBetween(0, 100) > 5,
            'user_id' => User::factory(),
            'category_id' => Category::factory(),
            'image' => function (array $attributes) {
                if ($this->faker->numberBetween(0, 10) > 5) {
                    return null;
                }
                $filename = $this->faker->image('storage/app/public/uploads', 1280, 720, null, false);
                if (!$filename) {
                    return null;
                }
                return Storage::url('uploads/'.$filename);
            },
        ];
    }
}
