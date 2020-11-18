<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Repositories\User\UserRepository;
use Illuminate\Auth\Events\Registered;
use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\UpdateUserRequest;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    private UserRepository $users;

    public function __construct(UserRepository $users)
    {
        $this->users = $users;
    }

    public function index()
    {
        return $this->users->paginate();
    }

    public function store(CreateUserRequest $request)
    {
        $user = $this->users->create($request->validated());
        event(new Registered($user));
        Auth::login($user);

        return response()->json($user, 201);
    }

    public function account()
    {
        $user = auth()->user();
        $account = $this->users->loadEmail($user);
        return response()->json($account);
    }

    public function update(UpdateUserRequest $request)
    {
        $user = auth()->user();
        $updatedUser = $this->users->update($user, $request->validated());
        $account = $this->users->loadEmail($updatedUser);
        return response()->json($account);
    }

    public function show(User $user)
    {
        return $this->users->load($user);
    }
}
