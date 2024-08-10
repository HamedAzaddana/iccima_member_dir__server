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
        'shared_chambers', 'specialized_committees', 'guild_types',
        'card_no', 'last_updated_at'
    ];
    public function original_user(): BelongsTo
    {
        return $this->belongsTo(MerchantUser::class, 'card_no', 'card_no');
    }
}
