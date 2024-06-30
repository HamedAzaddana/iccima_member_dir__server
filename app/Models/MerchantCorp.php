<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MerchantCorp extends Model
{
    use HasFactory;
    protected $table = "merchant_corporation";
    public $timestamps = false;
    protected $fillable = [
        'logo_corp','user_image','first_name','last_name','corp_name','year_created','province','city','address',
        'phone','fax','website','activity','activity_type','orders_registered','imports_done','certificate_issued',
        'common_rooms','spec_commissions','organizations','person_type','hs_code','products','rank',
        'province_id','rank_id','person_type_id','activity_type_id',
        'last_updated_at'
    ];


}
