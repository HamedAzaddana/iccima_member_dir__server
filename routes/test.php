<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\MerchantController;
use App\Services\CardsData;
use App\Models\IndexNumberApi;
use App\Models\MerchantUser;
use App\Models\AdminUser;
use App\Models\Preset;
use Illuminate\Support\Facades\DB;



Route::get('/test2', function () {

    // dd(___callLang());
    // iccima_change_sess_lang("Persian");
    // dd(iccima_lang_str('nav.home'));
    // iccima_change_sess_lang("Persian");
    // dd(MerchantUserModel::where("card_no","10260117348")->first()->toArray());
    // dd($_data = CardsData::getDataByIndex("558177"));
});
Route::get('/test', function () {

    // $tc = MerchantUser::find(6343);
    // $tc->update([
    //     'show_in_index' => 1
    // ]);
    // dd($tc);
    // $activity_str_search = [
    //     "مواد غذایی، حیوانی، نباتی، آشامیدنی، محصولات وابسته، نباتات و حیوانات زنده",
    //     "مواد معدنی، سنگ، گچ، سیمان، شیشه و پنبه نسوز، سنگ‌ها و فلزات گران‌بها و مصنوعات وابسته ",
    //     "مواد شیمیایی، پلاستیک، دارویی و محصولات وابسته",
    //     "چوب و کاغذ و مصنوعات وابسته",
    //     "مواد نسجی و مصنوعات وابسته",
    //     "وسایل نقلیه زمینی، هوائی، آبی، ماشین‌آلات راه‌سازی و استخراج معدن و قطعات مربوطه ",
    //     "برق، الکترونیک، مخابرات، ارتباطات و ماشین‌آلات، وسایل و مصنوعات وابسته ",
    //     "فلزات معمولی و مصنوعات وابسته ",
    //     "آلات و دستگاه‌های اپتیک، عکاسی، سینماتوگرافی، دقت‌سنجی، ساعت‌سازی، موسیقی و قطعات مربوطه",
    //     "پوست، چرم، پر، مو و مصنوعات وابسته",
    //     "اسلحه و مهمات، اجزاء و قطعات مربوطه ",
    //     "اشیاء هنری، کلکسیون و عتیقه‌ها",
    //     "لوازم ورزشی، اسباب بازی و قطعات مربوطه و مصنوعات ",
    //     "حق العملکاری",
    //     "خدمات (مثل صادرات و واردات خدمات مهندسی و نرم افزاری)",
    // ];

    // foreach ($activity_str_search as $acss) {
    //     Preset::create([
    //         'type' => 'activity_str_search',
    //         'value' => $acss,
    //         'title' => $acss,
    //     ]);
    // };


    $records_load = MerchantUser::get_data_els_filter([
        "kws" => "زعفران",
        // "kws"=>"sss",
    ], 10);
    dd($records_load);
    // dd($current_merchant_e_lv = MerchantUserModel::find(1)->toArray());
    // dd(json_decode("vsdvdfb"));
    // dd(iccima_get_current_user());
    // $merchant = MerchantUserModel::find(8105);
    // $merchant_e = $merchant->editable_user;
    // dd($merchant->toArray(),$merchant_e);
});
