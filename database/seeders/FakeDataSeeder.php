<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use \App\Models\User;
use \App\Models\Article;
use \App\Models\Category;
use \App\Models\Tag;

class FakeDataSeeder extends Seeder
{
    const USER_LENGTH = 30;
    const CATEGORY_LENGTH = 12;
    const TAG_LENGTH = 15;
    const ARTICLE_LENGTH = 150;

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = User::factory()
            ->count(self::USER_LENGTH)
            ->create();
        $categories = Category::factory()
            ->count(self::CATEGORY_LENGTH)
            ->create();
        $tags = Tag::factory()
            ->count(self::TAG_LENGTH)
            ->create();
        Article::factory()
            ->count(self::ARTICLE_LENGTH)
            ->create([
                'user_id' => function () use ($users) {
                    return $users->random()->id;
                },
                'category_id' => function () use ($categories) {
                    return $categories->random()->id;
                },
            ])
            ->each(function ($article) use ($tags) {
                $article->tags()->attach(
                    $tags->random(random_int(1, 3))->pluck('id')->toArray()
                );
            });
    }
}
