<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Registered;
use App\Http\Requests\CreateUserRequest;
use App\Services\UserService;

class UserController extends Controller
{
    public function store(CreateUserRequest $request, UserService $userService)
    {
        $user = $userService->create($request->validated());
        event(new Registered($user));

        return response()->json($user, 201);
    }
}
