<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\UploadImageRequest;
use Illuminate\Support\Facades\Storage;

class ImageController extends Controller
{
    public function __invoke(UploadImageRequest $request)
    {
        $path = $request->file('file')->store('uploads', 'public');
        $data = [
            'file_path' => Storage::url($path),
        ];

        return response()->json($data, 201);
    }
}
