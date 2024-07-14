<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use PDO;

class PowerBi extends Model
{
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
