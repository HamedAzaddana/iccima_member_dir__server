<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Elastic\Elasticsearch\ClientBuilder;
use App\Helpers\Pdate;

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

     //LOST (for filter): goodsName , hsCode , activityTypeId 
     use HasFactory;
     protected $table = "cards_data_merchants";
     protected static $unique_base_orc = "card_no";
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
     public static function createIndexEls()
     {
          $client = iccima_els_client();
          $params = [
               'index' => 'iccima_cards_data_merchants',
               'body' => [
                    "mappings" => [
                         "properties" => [
                              "bizactivities_en" => [
                                   "type" => "text",
                              ],
                              "bizactivities_fa" => [
                                   "type" => "text",
                                   "analyzer" => "rebuilt_persian"
                              ],
                              "card_no" => [
                                   "type" => "keyword",
                              ],
                              "companyname_en" => [
                                   "type" => "text",
                              ],
                              "companyname_fa" => [
                                   "type" => "text",
                                   "analyzer" => "rebuilt_persian"
                              ],
                              "corporationestablishdate_en" => [
                                   "type" => "text",
                              ],
                              "corporationestablishdate_fa" => [
                                   "type" => "text",
                                   "analyzer" => "rebuilt_persian"
                              ],
                              "gregorian_expire_date" => [
                                   "type" => "keyword",
                              ],
                              "jalaly_expire_date" => [
                                   "type" => "keyword",
                              ],
                              "mainaddress_en" => [
                                   "type" => "text",
                              ],
                              "mainaddress_fa" => [
                                   "type" => "text",
                                   "analyzer" => "rebuilt_persian"
                              ],
                              "guild_types" => [
                                   "type" => "text",
                                   "analyzer" => "rebuilt_persian"
                              ],
                              "mobile_no" => [
                                   "type" => "keyword",
                              ],
                              "phone_no" => [
                                   "type" => "keyword",
                              ],
                              "email" => [
                                   "type" => "keyword",
                              ],
                              "ownerfirstname_en" => [
                                   "type" => "text",
                              ],
                              "ownerfirstname_fa" => [
                                   "type" => "text",
                                   "analyzer" => "rebuilt_persian"
                              ],
                              "ownerlastname_en" => [
                                   "type" => "text",
                              ],
                              "ownerlastname_fa" => [
                                   "type" => "text",
                                   "analyzer" => "rebuilt_persian"
                              ],
                              "shared_chambers" => [
                                   "type" => "text",
                                   "analyzer" => "rebuilt_persian"
                              ],
                              "specialized_committees" => [
                                   "type" => "text",
                                   "analyzer" => "rebuilt_persian"
                              ],
                              "website" => [
                                   "type" => "keyword",
                              ],
                              "organization_branch_id" => [
                                   "type" => "keyword",
                              ],
                              "card_type_id" => [
                                   "type" => "keyword",
                              ],
                              "city_id" => [
                                   "type" => "keyword",
                              ],
                              "person_type_id" => [
                                   "type" => "keyword",
                              ],
                              "province_id" => [
                                   "type" => "keyword",
                              ],
                              "rating_type_id" => [
                                   "type" => "keyword",
                              ],
                              "status" => [
                                   "type" => "keyword",
                              ],
                              "specializedcommittees_en" => [
                                   "type" => "text",
                              ],
                              "specializedcommittees_fa" => [
                                   "type" => "text",
                                   "analyzer" => "rebuilt_persian"
                              ],
                              "fax_no" => [
                                   "type" => "keyword",
                              ],
                              "mobile_no_main" => [
                                   "type" => "keyword",
                              ],
                              "biz_activities_ids" => [
                                   "type" => "text",
                              ],
                              "isicactroots_en" => [
                                   "type" => "text",
                              ],
                              "isicactroots_fa" => [
                                   "type" => "text",
                                   "analyzer" => "rebuilt_persian"
                              ],
                              "postal_code" => [
                                   "type" => "keyword",
                              ],
                              "rownumber" => [
                                   "type" => "keyword",
                              ],
                              "is_marked_as_delete" => [
                                   "type" => "keyword",
                              ],

                         ]
                    ],
                    "settings" => [
                         "analysis" => [
                              "char_filter" => [
                                   "zero_width_spaces" => [
                                        "type" => "mapping",
                                        "mappings" => [
                                             "\u200C=>\u0020"
                                        ]
                                   ]
                              ],
                              "filter" => [
                                   "persian_stop" => [
                                        "type" => "stop",
                                        "stopwords" => "_persian_"
                                   ]
                              ],
                              "analyzer" => [
                                   "rebuilt_persian" => [
                                        "tokenizer" => "standard",
                                        "char_filter" => [
                                             "zero_width_spaces"
                                        ],
                                        "filter" => [
                                             "lowercase",
                                             "decimal_digit",
                                             "arabic_normalization",
                                             "persian_normalization",
                                             "persian_stop"
                                        ]
                                   ]
                              ]
                         ]
                    ],
               ]
          ];
          $exists_index = $client->indices()->exists(['index' => 'iccima_cards_data_merchants'])->asBool();
          if (!$exists_index) {
               $client->indices()->create($params);
          }
     }
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
          $valid__keys = [
               "id", "bizactivities_en", "bizactivities_fa", "card_no", "companyname_en", "companyname_fa",
               "corporationestablishdate_en", "corporationestablishdate_fa", "gregorian_expire_date", "jalaly_expire_date", "mainaddress_en", "mainaddress_fa",
               "guild_types", "mobile_no", "phone_no", "email", "ownerfirstname_en", "ownerfirstname_fa", "ownerlastname_en",
               "ownerlastname_fa", "shared_chambers", "specialized_committees", "website", "organization_branch_id", "card_type_id", "city_id", "person_type_id",
               "province_id", "rating_type_id", "status", "specializedcommittees_en", "specializedcommittees_fa", "fax_no", "mobile_no_main",
               "biz_activities_ids", "isicactroots_en", "isicactroots_fa", "postal_code", "rownumber", "is_marked_as_delete"
          ];
          $data_filtered = [];
          foreach ($data as $_K => $_V) {
               if (in_array($_K, $valid__keys)) {
                    $data_filtered[$_K] = $_V;
               }
          }
          return  iccima_array_map_assoc(
               function ($key, $value) {
                    return iccima_arabicToPers_conv($value);
               },
               $data_filtered
          );
     }
     public static function sync_data_oracle()
     {
          $start_process = microtime(true);
          self::createIndexEls();
          $oracle_data = CardsDataOracle::where("is_marked_as_delete", "0")->get()->toArray();
          foreach ($oracle_data as $oracle_elem) {
               $oracle_elem = (array)$oracle_elem;
               $oracle_elem['last_updated_at'] = Pdate::persianTimeStampNow();
               self::updateOrCreate([
                    self::$unique_base_orc   => $oracle_elem[self::$unique_base_orc],
               ], $oracle_elem);
          }
          $end_process = microtime(true);
          $elapsed_process = (int)($end_process - $start_process) + 1;
          return [
               'elapsed_secs' =>  $elapsed_process,
               'num_records' => count($oracle_data),
          ];
     }
     public static function trucate_data_els()
     {
     }
     public static function get_els_client()
     {
          return ClientBuilder::create()
               ->setHosts([env('ELASTICSEARCH_URL', '')])
               ->setApiKey(env('ELASTICSEARCH_API_KEY', ''))
               ->build();
     }
     public static function get_data_els_filter($filters_req, $size)
     {
          $client = iccima_els_client();
          $params = [
               'index' => 'iccima_cards_data_merchants',
               "body" => [],
               "size" => $size,
          ];
          //process $filters_req to add filters
          
          $response = $client->search($params);
          return iccima_prepare_get_db_elastic($response->asArray());
     }
     public static function prepare_get_db_elastic($data)
     {
          $array = [];
          $hits__hits = @$data['hits']['hits'];
          foreach ($hits__hits as $hits__hit) {
               $dt_els = $hits__hit['_source'];
               $dt_els['__id'] = $hits__hit['_id'];
               $array[] = $dt_els;
          }
          return $array;
     }
}
