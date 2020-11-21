<?php

namespace Tests\Feature\API\User;

use Tests\Feature\API\APITestBase;
use App\Models\User;
use App\Models\Article;
use Illuminate\Database\Eloquent\Factories\Sequence;

class UserControllerTest extends APITestBase
{
    protected function setUp(): void
    {
        parent::setUp();
        User::factory()->count(10)->create();
    }

    public function test認証済みのユーザ情報を取得できる()
    {
        $response = $this->actingAs($this->user)
            ->getJson('/api/v1/user');
        
        $response
            ->assertOk()
            ->assertJson([
                'name' => $this->user->name,
                'email' => $this->user->email,
            ]);
    }

    public function test認証前のユーザはユーザ情報を取得できない()
    {
        $response = $this->getJson('/api/v1/user');

        $response->assertUnauthorized();
    }

    public function testユーザ一覧を取得でき、メールアドレスは含まれない()
    {
        $response = $this->getJson('/api/v1/users');

        $response
            ->assertOk()
            ->assertJson([
                'total' => User::all()->count(),
            ])
            ->assertJsonStructure([
                'total',
                'per_page',
                'data' => [
                    '*' => [
                        'id',
                        'name',
                        'articles_count',
                        'created_at',
                        'updated_at',
                        'avatar',
                    ],
                ],
            ])
            ->assertDontSee('email');
    }

    public function testユーザの詳細情報を取得でき、メールアドレスは含まれない()
    {
        $userName = 'lorem ipsum';
        $email = 'lorem.ipsum.dolor.sit@lorem.example.com';
        $articlesCount = 3;
        $user = User::factory()
            ->has(Article::factory()->count($articlesCount))
            ->create([
                'name' => $userName,
                'email' => $email,
            ]);
        $response = $this->getJson("/api/v1/users/$user->id");

        $response
            ->assertOk()
            ->assertJson([
                'name' => $userName,
                'articles_count' => $articlesCount,
            ])
            ->assertDontSee($email);
    }

    public function testユーザ情報を更新できる()
    {
        $newUserName = '新しいユーザ名';
        $newEmail = 'new.auth@example.com';
        $newAvatarUrl = '/storage/uploads/newimagepath.jpg';

        $response = $this->actingAs($this->user)
            ->putJson('/api/v1/user', [
                'name' => $newUserName,
                'email' => $newEmail,
                'avatar' => $newAvatarUrl,
            ]);

        $this->assertSame($this->user->name, $newUserName);
        $this->assertSame($this->user->email, $newEmail);
        $this->assertSame($this->user->avatar, $newAvatarUrl);
        $response->assertJson([
            'name' => $newUserName,
            'email' => $newEmail,
            'avatar' => $newAvatarUrl,
        ]);
    }

    public function test認証前のユーザはユーザ情報を更新できない()
    {
        $response = $this->putJson('/api/v1/user', [
            'name' => 'something',
            'email' => 'something',
            'avatar' => 'something',
        ]);

        $response->assertUnauthorized();
    }

    public function testユーザの記事一覧を取得でき、非公開の記事は取得できない()
    {
        $articlesCount = 20;
        $user = User::factory()
            ->has(
                Article::factory()
                    ->count($articlesCount)
                    ->state(new Sequence(
                        ['public' => true],
                        ['public' => false],
                    ))
            )
            ->create();
        $response = $this->getJson("/api/v1/users/$user->id/articles");

        $response->assertOk()
            ->assertJson([
                'total' => $articlesCount / 2,
            ])
            ->assertJsonStructure([
                'total',
                'per_page',
                'data' => [
                    '*' => [
                        'id',
                        'title',
                        'image',
                        'user',
                        'category',
                        'tags',
                        'created_at',
                        'updated_at',
                        'excerpt',
                    ],
                ],
            ])
            ->assertDontSee('content');
    }
}
