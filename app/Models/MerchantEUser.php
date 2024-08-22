<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MerchantEUser extends Model
{
    use HasFactory;
    protected $table = "merchants_e";
    public $timestamps = false;
    protected $fillable = [
        "shared_chambers", // اتاق های مشترک
        "specialized_committees", // کمیسیون های تخصصی
        "guild_types", // تشکل ها
        'card_no',

        'brand_title', //برند تجاری
        'brand_image', //لوگو برند تجاری
        'co_main_address', //آدرس
        'co_phone', //تلفن
        'co_fax', //فکس
        'co_website', //وب سایت

        'confirmed',
        'last_updated_at'
    ];
    public function original_user(): BelongsTo
    {
        return $this->belongsTo(MerchantUser::class, 'card_no', 'card_no');
    }
}
