<?php

namespace App\Repositories\User;

use App\Models\User;

class UserRepository
{
    public function paginate()
    {
        return User::latest()
            ->withCount('articles')
            ->paginate(10);
    }

    public function load(User $user): User
    {
        return $user->loadCount('articles');
    }

    public function loadEmail(User $user): User
    {
        return $user->makeVisible('email');
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
}
