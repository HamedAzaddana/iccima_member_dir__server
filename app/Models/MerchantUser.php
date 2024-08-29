<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Elastic\Elasticsearch\ClientBuilder;
use App\Helpers\Pdate;
use App\Services\CardsData as CardsDataService;
use Exception;
use Illuminate\Foundation\Auth\User as Authenticatable;

class MerchantUser extends Authenticatable
{
    use HasFactory;
    protected $table = "merchants";
    public $timestamps = false;
    protected static $unique_base_orc = "card_no";
    protected $fillable = [
        "index_number",
        "owner_fullname",
        "card_type_id",
        "person_type_id",
        "group_activity_type",
        "card_no",
        "co_title",
        "co_type",
        "co_establish_date",
        "co_image",
        "owner_image",
        "city",
        "province",
        "co_phone",
        "co_fax",
        "co_website",
        "co_main_address",
        "co_email",
        "postal_code",
        "show_in_index",
        "view_count",

        "biz_activities", // رشته فعالیت
        "biz_activitiy_goods", // نوع فعالیت array
        "coo_biz_activities", // گواهی های مبدا صادر شده array
        "biz_act_goods_hs_codes", // کد های hs تجاری array
        "shared_chambers", // اتاق های مشترک array
        "specialized_committees", // کمیسیون های تخصصی array
        "guild_types", // تشکل ها array

        "last_updated_at"
    ];
    public $multi_lang_fields = [
        "shared_chambers", // اتاق های مشترک
        "specialized_committees", // کمیسیون های تخصصی
        "guild_types", // تشکل ها
        'brand_title', //برند تجاری
        'co_main_address', //آدرس
    ];
    public $save_indexes = [
        "brand_title",
        "co_phone",
        "co_fax",
        "co_website",
        "co_main_address",
        "shared_chambers",
        "specialized_committees",
        "guild_types",
    ];
    protected $hidden = [
        'password',
        'index_number',
        'last_updated_at',
    ];
    public static function createIndexEls()
    {
        $client = iccima_els_client();
        $params = [
            'index' => 'iccima_cards_data_merchants',
            'body' => [
                "mappings" => [
                    "properties" => [
                        "owner_fullname" => [
                            "type" => "text",
                            "analyzer" => "rebuilt_persian"
                        ],
                        "index_number" => [
                            "type" => "keyword",
                        ],
                        "card_type_id" => [
                            "type" => "keyword",
                        ],
                        "person_type_id" => [
                            "type" => "keyword",
                        ],
                        "group_activity_type" => [
                            "type" => "text",
                            "analyzer" => "rebuilt_persian"
                        ],
                        "card_no" => [
                            "type" => "keyword",
                        ],
                        "show_in_index" => [
                            "type" => "keyword",
                        ],
                        "co_title" => [
                            "type" => "text",
                            "analyzer" => "rebuilt_persian"
                        ],
                        "co_type" => [
                            "type" => "text",
                            "analyzer" => "rebuilt_persian"
                        ],
                        "co_establish_date" => [
                            "type" => "keyword",
                        ],
                        "city" => [
                            "type" => "text",
                            "analyzer" => "rebuilt_persian"
                        ],
                        "province" => [
                            "type" => "text",
                            "analyzer" => "rebuilt_persian"
                        ],
                        "co_phone" => [
                            "type" => "keyword",
                        ],
                        "view_count" => [
                            "type" => "keyword",
                        ],
                        "co_fax" => [
                            "type" => "keyword",
                        ],
                        "co_website" => [
                            "type" => "keyword",
                        ],
                        "co_main_address" => [
                            "type" => "text",
                            "analyzer" => "rebuilt_persian"
                        ],
                        "co_email" => [
                            "type" => "keyword",
                        ],
                        "biz_activities" => [
                            "type" => "text",
                            "analyzer" => "rebuilt_persian"
                        ],
                        "biz_activitiy_goods" => [
                            "type" => "text",
                            "analyzer" => "rebuilt_persian"
                        ],
                        "coo_biz_activities" => [
                            "type" => "text",
                            "analyzer" => "rebuilt_persian"
                        ],
                        "biz_act_goods_hs_codes" => [
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
                        "guild_types" => [
                            "type" => "text",
                            "analyzer" => "rebuilt_persian"
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
    public function editable_user(): HasOne
    {
        return $this->hasOne(MerchantEUser::class, 'card_no', 'card_no');
    }
    public function delete_file_editable_val($f)
    {
        $card_no = $this->card_no;
        $current_merchant_e_lv = MerchantEUser::firstOrCreate(
            ['card_no' => $card_no],
            [
                "last_updated_at" => Pdate::persianTimeStampNow(),
                "confirmed" => 0,
            ]
        );
        $old_brand_image_path = $current_merchant_e_lv[$f];
        if ($old_brand_image_path) {
            MerchantEUser::where(['card_no' => $card_no])->update([
                $f => null
            ]);
            iccima_unlink_public_src($old_brand_image_path);
        }
    }
    public function editable_form_vals()
    {
        $form_vals = [];
        $editable_user = $this->editable_user ? $this->editable_user->toArray() : [];
        $current_lang = iccima_get_sess_lang();
        foreach ($editable_user as $keu_item => $veu_item) {
            if (in_array($keu_item, $this->multi_lang_fields)) {
                $veu_item = (array)json_decode($veu_item);
                $form_vals[$keu_item] = @$veu_item[$current_lang];
            } else {
                $form_vals[$keu_item] = $veu_item;
            }
        }
        return $form_vals;
    }
    public function editable_form_vals_save($input, $bi_file)
    {
        $card_no = $this->card_no;
        $updated_merchant_e_lv = [];
        $errors_validation = [];
        $brand_image_path = null;
        $current_lang = iccima_get_sess_lang();
        $current_merchant_e_lv = MerchantEUser::firstOrCreate(
            ['card_no' => $card_no],
            [
                "last_updated_at" => Pdate::persianTimeStampNow(),
                "confirmed" => 0,
            ]
        );
        $old_brand_image_path = $current_merchant_e_lv['brand_image'];
        foreach ($this->save_indexes as $save_index) {
            $new_val_lang =  @$input[$save_index];
            if (in_array($save_index, $this->multi_lang_fields)) {
                $lv_me_json_decode = json_decode(@$current_merchant_e_lv[$save_index]) ? (array)json_decode(@$current_merchant_e_lv[$save_index]) : [];
                $lv_me_json_decode[$current_lang] = $new_val_lang;
                $updated_merchant_e_lv[$save_index] = json_encode($lv_me_json_decode, JSON_UNESCAPED_UNICODE);
            } else {
                $updated_merchant_e_lv[$save_index] = $new_val_lang;
            }
        }
        if ($bi_file) {
            $allowedTypes = array('jpg', 'jpeg', 'png');
            $maxFileSize = 1 * 1024 * 1024; // 1MB
            $file_validation = iccima_upload_validate_image($bi_file, $allowedTypes, $maxFileSize);
            $response = @$file_validation['response'];
            $msg = @$file_validation['msg'];
            if ($response == "success") {
                $brand_image_path = iccima_upload_public_src($bi_file, "brands");
            } else {
                $errors_validation[] = $msg;
            }
        }
        if (
            $brand_image_path
        ) {
            if ($old_brand_image_path) {
                iccima_unlink_public_src($old_brand_image_path);
            }
            $updated_merchant_e_lv["brand_image"] = $brand_image_path;
        } else {
            $updated_merchant_e_lv["brand_image"] = $old_brand_image_path;
        }
        $updated_merchant_e_lv["confirmed"] = 0;
        $updated_merchant_e_lv["last_updated_at"] = Pdate::persianTimeStampNow();
        MerchantEUser::updateOrCreate([
            "card_no"   => $card_no,
        ], $updated_merchant_e_lv);
        if (!$errors_validation) {
            return [
                'data' => $updated_merchant_e_lv,
                'status_code' => 200,
            ];
        } else {
            return [
                'data' => $errors_validation,
                'status_code' => 422,
            ];
        }
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
        foreach ($hits__hits as $hits__hit) {
            $dt_els = $hits__hit['_source'];
            $dt_els['__id'] = iccima_hashid_encode((int)$hits__hit['_id']);
            $lang = iccima_get_sess_lang();
            $slug = iccima_sluggify(json_decode($dt_els['co_title'])->{"$lang"});
            $dt_els['spl'] = route("home.single.view", [
                'hash_id' => $dt_els['__id'],
                'slug' => $slug,
            ]);
            $array[] = $dt_els;
        }
        return $array;
    }
    public static function prepare_save_db_sql($data)
    {
        return  iccima_array_map_assoc(
            function ($key, $value) {
                if (!is_string($value)) {
                    $value = json_encode($value, JSON_UNESCAPED_UNICODE);
                }
                return iccima_arabicToPers_conv($value);
            },
            $data
        );
    }
    public static function prepare_save_db_elastic($data)
    {
        return  iccima_array_map_assoc(
            function ($key, $value) {
                if (!is_string($value)) {
                    $value = json_encode($value, JSON_UNESCAPED_UNICODE);
                }
                return iccima_arabicToPers_conv($value);
            },
            $data
        );
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
        $filters_req['province'] = @$filters_req['province'] == "all" ? "" : @$filters_req['province'];
        $filters_req['activity_str'] = @$filters_req['activity_str'] == "all" ? "" : @$filters_req['activity_str'];
        if (@$filters_req['kws'] || @$filters_req['activity_str']) {
            $S = (string)$filters_req['kws'] . (string)$filters_req['activity_str'];
            $params['body']['query']['bool']['must']['multi_match'] = [
                'query' => $S,
                'fields' => [
                    'owner_fullname',
                    'co_title',
                    'biz_activities',
                    'biz_activitiy_goods',
                    'coo_biz_activities',
                    'biz_act_goods_hs_codes',
                    'shared_chambers',
                    'specialized_committees',
                    'guild_types',
                ],
            ];
        }
        if (@$filters_req['province']) {
            $params['body']['query']['bool']['filter'][] = ["match" => ["province" => (string)$filters_req['province']]];
        }
        if (@$filters_req['group_act_type']) {
            $params['body']['query']['bool']['filter'][] = ["match" => ["group_activity_type" => (string)$filters_req['group_act_type']]];
        }
        $params['body']['query']['bool']['must_not'][] = ["term" => ["show_in_index" => "0"]];
        
        $rnd_number_php = random_int(100, 99999999);
        $params['body']['sort']["_script"] =
            [
                "script" => "Math.random() + $rnd_number_php",
                "type" => "number",
                "order" => "desc"
            ];

        $response = $client->search($params);
        $result_array = iccima_prepare_get_db_elastic($response->asArray());
        // shuffle($result_array);
        return $result_array;
    }

    public static function sync_data_indexes()
    {
        //called evenry 5 seconds !
        $start_process = microtime(true);
        self::createIndexEls();
        $row_index = IndexNumberApi::where('status', 0)->first()->toArray();
        $index_number_updated = 0;
        if ($row_index) {
            $index_number_updated = $row_index['index_number'];
            $_data = CardsDataService::getDataByIndex($index_number_updated);
            $_data_sql = self::prepare_save_db_sql($_data);
            $_data_sql['last_updated_at'] = Pdate::persianTimeStampNow();
            if (@$_data_sql["card_no"]) {
                self::updateOrCreate([
                    self::$unique_base_orc   => $_data_sql[self::$unique_base_orc],
                ], $_data_sql);
            } else {
                throw new \ErrorException("The Card no is null ! Index number : $index_number_updated");
            }

            IndexNumberApi::where('index_number', $index_number_updated)->update([
                'status' => 1,
                'last_updated_at' => Pdate::persianTimeStampNow(),
            ]);
        }
        $end_process = microtime(true);
        $elapsed_process = (int)($end_process - $start_process) + 1;
        return [
            'elapsed_secs' =>  $elapsed_process,
            'index_created' => $index_number_updated,
            'card_no' => @$_data_sql["card_no"],
        ];
    }
}
