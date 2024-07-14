<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use PDO;

class PowerBi extends Model
{
     //images :

     //corporation_logo_id
     //owner_image_id

     //-----
     //filters : 

     //kws -> bizactivities_fa , specializedcommittees_fa ,specialized_committees , shared_chambers , guild_types ,companyname_fa
     //province_id
     //rating_type_id
     //person_type_id
     //ownerfirstname_fa , ownerlastname_fa , companyname_fa

     //LOST: goodsName , hsCode , activityTypeId
     use HasFactory;
     protected $table = "cards_data_merchants";
     public $timestamps = false;
     protected $fillable = [
          "last_updated_at",
     ];
     public static function prepare_save_db_sql($data)
     {
          return  iccima_array_map_assoc(
               function ($key, $value) {
                    return iccima_arabicToPers_conv($value);
               },
               $data
          );
     }
     public static function prepare_save_db_elastic($data)
     {
          return  iccima_array_map_assoc(
               function ($key, $value) {
                    return iccima_arabicToPers_conv($value);
               },
               $data
          );
     }
}
