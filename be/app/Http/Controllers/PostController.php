<?php

namespace App\Http\Controllers;

use App\Helpers\ApiFormatter;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Gate;

class PostController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum', except: ['index', 'show'])
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $posts = Post::with('user')->latest()->get();
            return ApiFormatter::sendResponse(200, 'Success', $posts);
        } catch (\Exception $e) {
            return ApiFormatter::sendResponse(500, 'Bad Request', $e->getMessage());
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'title' => 'required|max:255',
            'body' => 'required',
        ]);

        $post = $request->user()->posts()->create($fields);
        $post->load('user'); // Eager load the 'user' relationship

        return ApiFormatter::sendResponse(201, 'Post created', $post);
    }

    /**
     * Display the specified resource.
     */
    public function show($post)
    {
        try {
            $post = Post::with('user')->find($post);

            if (!$post) {
                return ApiFormatter::sendResponse(404, 'Post not found');
            }

            return ApiFormatter::sendResponse(200, 'Success', $post);
        } catch (\Exception $e) {
            return ApiFormatter::sendResponse(500, 'Bad Request', $e->getMessage());
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    { 
            Gate::authorize('modify', $post);

            // $post = Post::with('user')->find($post);

            // if (!$post) {
            //     return ApiFormatter::sendResponse(404, 'Post not found');
            // }

            $fields = $request->validate([
                'title' => 'required|max:255',
                'body' => 'required',
            ]);

            $post->update($fields);

            return ApiFormatter::sendResponse(200, 'Post updated', $post);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        try {
            Gate::authorize('modify', $post);

            // $post = Post::find($post);

            // if (!$post) {
            //     return ApiFormatter::sendResponse(404, 'Post not found');
            // }

            $post->delete();

            return ApiFormatter::sendResponse(200, 'Post deleted');
        } catch (\Exception $e) {
            return ApiFormatter::sendResponse(500, 'Bad Request', $e->getMessage());
        }
    }
}