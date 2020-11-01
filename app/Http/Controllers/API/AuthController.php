<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\LoginRequest;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();

        if (Auth::attempt($credentials)) {
            return auth()->user();
        }

        throw ValidationException::withMessages([
            'email' => [trans('メールアドレスまたはパスワードが正しくありません')],
        ]);
    }

    public function logout(Request $request)
    {
        Auth::logout();
        return response()->noContent();
    }
}
