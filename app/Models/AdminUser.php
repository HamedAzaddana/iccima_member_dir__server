<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;

class AdminUser extends Authenticatable
{
    use HasFactory;
    protected $table = "admins";
    public $timestamps = false;
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
        'cell_phone',
        'national_code',
        'last_updated_at'
    ];
    protected $hidden = [
        'id', 
        'password',
        'last_updated_at',
    ];
    public static function exists_field($val, $fld)
    {
        return self::where($fld, $val)->first();
    }
}
