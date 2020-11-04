<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Registered;
use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Services\UserService;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function store(CreateUserRequest $request, UserService $userService)
    {
        $user = $userService->create($request->validated());
        event(new Registered($user));
        Auth::login($user);

        return response()->json($user, 201);
    }

    public function account(UserService $userService)
    {
        $user = auth()->user();
        $account = $userService->getAsAccount($user);
        return response()->json($account);
    }

    public function update(UpdateUserRequest $request, UserService $userService)
    {
        $user = auth()->user();
        $updatedUser = $userService->update($user, $request->validated());
        $account = $userService->getAsAccount($updatedUser);
        return response()->json($account);
    }
}
