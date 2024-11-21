<?php

use App\Helpers\ApiFormatter;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return ApiFormatter::sendResponse(200, 'Success', $request->user());
})->middleware('auth:sanctum');


Route::get('/', function () {
    return ApiFormatter::sendResponse('201', 'API is Ready');
});

Route::apiResource('posts', PostController::class);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/login', function () {
    return ApiFormatter::sendResponse(200, 'Login Page');
});
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
