<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class bh extends Model
{
    use HasFactory;

    protected $table = 'bh';
    protected $fillable = ['name', 'location', 'rooms', 'user_id'];
    public $timestamps = false;

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
