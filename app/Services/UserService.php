<?php

namespace App\Services;

use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Http\UploadedFile;

class UserService
{
    public function paginate()
    {
        return User::latest()
            ->withCount('articles')
            ->paginate(10);
    }

    public function getInfo($id)
    {
        return User::withCount('articles')
            ->findOrFail($id);
    }

    public function create(array $data): User
    {
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);
    }

    public function update(User $user, array $data): User
    {
        $user->name = $data['name'];
        $user->email = $data['email'];
        $user->avatar = $data['avatar'];
        $user->save();
        return $user;
    }

    public function getAsAccount(User $user): User
    {
        return $user->makeVisible('email');
    }
}
