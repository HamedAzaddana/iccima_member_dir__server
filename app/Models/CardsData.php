<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Elastic\Elasticsearch\ClientBuilder;

class CardsData extends Model
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
     protected  $fillable = [
          "mv_member_directory_id", "bizactivities_en", "bizactivities_fa", "card_no", "companyname_en", "companyname_fa",
          "corporationestablishdate_en", "corporationestablishdate_fa", "email", "gregorian_expire_date", "guild_types",
          "jalaly_expire_date", "mainaddress_en", "mainaddress_fa", "mobile_no", "ownerfirstname_en", "ownerfirstname_fa",
          "ownerlastname_en", "ownerlastname_fa", "phone_no", "root_id", "shared_chambers", "sort_factor", "specialized_committees",
          "website", "card_type_id", "city_id", "corporation_country_id", "corporation_logo_id", "corporation_nationality_id", "corporation_type_id",
          "organization_branch_id", "owner_country_id", "owner_image_id",
          "owner_nationality_id", "person_type_id", "province_id", "rating_type_id", "request_info_id", "status", "trade_card_id", "specializedcommittees_en", "specializedcommittees_fa",
          "updatedatetime", "fax_no", "mobile_no_main", "biz_activities_ids", "export_dollor_price", "import_dollor_price",
          "isicact_roots_id", "isicactroots_en", "isicactroots_fa", "postal_code", "turnover_amount", "rownumber", "is_marked_as_delete",
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
     public static function sync_data_oracle()
     {

          $start = microtime(true);
          $oracle_data = CardsDataOracle::get()->toArray();
          $end = microtime(true);
          $elapsed = $end - $start;
          return [
               'elapsed_secs' =>  $elapsed,
               'num_records' => count($oracle_data),
          ];
     }
     public static function get_els_client()
     {
          return ClientBuilder::create()
               ->setHosts([env('ELASTICSEARCH_URL', '')])
               ->setApiKey(env('ELASTICSEARCH_API_KEY', ''))
               ->build();
     }
     public static function prepare_get_db_elastic($data)
     {
          $array = [];
          $hits__hits = @$data['hits']['hits'];
          foreach($hits__hits as $hits__hit){
               $array[$hits__hit['_id']]=$hits__hit['_source'];
          }
          return $array;
     }
}
