<?php

namespace Tests\Feature\API;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use Illuminate\Support\Facades\Storage;

class APITestBase extends TestCase
{
    use RefreshDatabase;

    protected User $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->artisan('migrate');
        Storage::fake('public');
        $this->user = User::factory()->create([
            'email' => 'auth@example.com',
        ]);
    }
}
