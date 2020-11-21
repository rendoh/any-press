<?php

namespace Tests\Feature\API\Auth;

use Tests\Feature\API\APITestBase;
use App\Models\User;

class LoginTest extends APITestBase
{
    public function test登録済みユーザはログインできる()
    {
        $response = $this->postJson('/api/v1/login', [
            'email' => $this->user->email,
            'password' => 'password',
        ]);

        $response
            ->assertOk()
            ->assertJson([
                'name' => $this->user->name,
            ]);
        $this->assertAuthenticatedAs($this->user);
    }

    public function test認証情報が正しくないとエラー()
    {
        $response = $this->postJson('/api/v1/login', [
            'email' => $this->user->email,
            'password' => 'invalidpassword',
        ]);

        $response
            ->assertJsonValidationErrors(['email']);
    }
}
