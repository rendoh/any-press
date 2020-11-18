<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use \Illuminate\Support\Str;
use HTMLPurifier;
use HTMLPurifier_Config;

class Article extends Model
{
    use HasFactory;

    const EXCERPT_LENGTH = 200;
    const RELATIONS = ['user', 'category', 'tags'];

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
        'public',
        'user',
        'category',
        'tags',
        'created_at',
        'updated_at',
        'excerpt',
    ];

    protected $fillable = [
        'title',
        'image',
        'content',
        'public',
        'user_id',
        'category_id',
    ];

    public function getExcerptAttribute()
    {
        $striped = (strip_tags($this->content));
        $singleLined = preg_replace("/\r|\n/", "", $striped);
        return Str::limit($singleLined, self::EXCERPT_LENGTH, '...');
    }

    public function setContentAttribute($value)
    {
        $config = HTMLPurifier_Config::createDefault();
        $purifier = new HTMLPurifier($config);
        $clean_html = $purifier->purify($value);
        $this->attributes['content'] = $clean_html;
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

    public function scopePublic($query)
    {
        return $query->where('public', true);
    }

    public function scopeWithRelations($query)
    {
        return $query->with(self::RELATIONS);
    }

    public function loadWithRelations()
    {
        return $this->load(self::RELATIONS);
    }

    public function scopePagination($query, $count = 10)
    {
        return $query->withRelations()
            ->latest()
            ->paginate($count);
    }

    public function scopeSearch($query, $input = null)
    {
        return $query->when($input, function ($query, $input) {
            $query->where('content', 'like', "%$input%");
        });
    }
}
