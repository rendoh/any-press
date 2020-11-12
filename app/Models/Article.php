<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use \Illuminate\Support\Str;

class Article extends Model
{
    use HasFactory;

    const EXCERPT_LENGTH = 200;

    protected $casts = [
        'public' => 'boolean',
    ];

    protected $appends = [
        'excerpt',
    ];

    protected $visible = [
        'id',
        'title',
        'image',
        'content',
        'public',
        'user',
        'category',
        'tags',
        'created_at',
        'updated_at',
        'excerpt',
    ];

    public function getExcerptAttribute()
    {
        return Str::limit($this->content, self::EXCERPT_LENGTH, '...');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }
}
