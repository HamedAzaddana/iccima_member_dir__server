<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IndexNumberApi extends Model
{
    use HasFactory;
    protected $table = "api_data_indexes";
    public $timestamps = false;
    protected $fillable = [
        'index_number','status','last_updated_at'
    ];

}
