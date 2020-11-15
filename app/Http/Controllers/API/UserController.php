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
    private UserService $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function index()
    {
        return $this->userService->paginate();
    }

    public function store(CreateUserRequest $request)
    {
        $user = $this->userService->create($request->validated());
        event(new Registered($user));
        Auth::login($user);

        return response()->json($user, 201);
    }

    public function account()
    {
        $user = auth()->user();
        $account = $this->userService->getAsAccount($user);
        return response()->json($account);
    }

    public function update(UpdateUserRequest $request)
    {
        $user = auth()->user();
        $updatedUser = $this->userService->update($user, $request->validated());
        $account = $this->userService->getAsAccount($updatedUser);
        return response()->json($account);
    }
}
