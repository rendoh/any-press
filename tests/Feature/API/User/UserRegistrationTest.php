<?php

namespace Tests\Feature\API\User;

use Tests\Feature\API\APITestBase;
use App\Models\User;

class UserRegistrationTest extends APITestBase
{
    public function testユーザを登録でき、パスワードはそのまま保存されない()
    {
        $userName = 'username';
        $email = 'user@example.com';
        $password = 'P@ssw0rd';
        $response = $this->postJson('/api/v1/register', [
            'name' => $userName,
            'email' => $email,
            'password' => $password,
            'password_confirmation' => $password,
        ]);

        $this->assertDatabaseHas('users', [
            'name' => $userName,
            'email' => $email,
        ]);
        $this->assertDatabaseMissing('users', [
            'password' => $password,
        ]);
        $response->assertCreated();
    }

    public function test登録後のレスポンスにメールアドレスは含まれない()
    {
        $userName = 'username';
        $email = 'user@example.com';
        $password = 'P@ssw0rd';
        $response = $this->postJson('/api/v1/register', [
            'name' => $userName,
            'email' => $email,
            'password' => $password,
            'password_confirmation' => $password,
        ]);

        $response
            ->assertCreated()
            ->assertJson([
                'name' => $userName,
            ])
            ->assertJsonStructure([
                'id',
                'name',
                'created_at',
                'updated_at',
            ])
            ->assertDontSee($email);
    }

    public function testメールアドレスが重複しない()
    {
        $username = 'username';
        $response = $this->postJson('/api/v1/register', [
            'name' => 'username',
            'email' => $this->user->email,
            'password' => 'P@ssw0rd',
            'password_confirmation' => 'P@ssw0rd',
        ]);

        $this->assertDatabaseMissing('users', [
            'name' => $username,
        ]);
        $response
            ->assertJsonValidationErrors(['email'])
            ->assertStatus(422);
    }
}
