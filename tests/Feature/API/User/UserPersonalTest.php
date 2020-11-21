<?php

namespace Tests\Feature\API\User;

use Tests\Feature\API\APITestBase;
use App\Models\Article;
use Illuminate\Database\Eloquent\Factories\Sequence;

class UserPersonalTest extends APITestBase
{
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

    public function test自分の記事一覧を、非公開のものも含めて取得できる()
    {
        $articlesCount = 20;
        Article::factory()
            ->count($articlesCount)
            ->state(new Sequence(
                ['public' => true],
                ['public' => false],
            ))
            ->create([
                'user_id' => $this->user,
            ]);
        $response = $this
            ->actingAs($this->user)
            ->getJson("/api/v1/user/articles");

        $response->assertOk()
            ->assertJson([
                'total' => $articlesCount,
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

    public function test認証前は自分の記事を取得できない()
    {
        $response = $this->getJson('/api/v1/user/articles');

        $response->assertUnauthorized();
    }
}
