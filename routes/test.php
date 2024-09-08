<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\MerchantController;
use App\Services\CardsData;
use App\Models\IndexNumberApi;
use App\Models\MerchantUser;
use App\Models\MerchantEUser;
use App\Models\AdminUser;
use App\Models\Preset;
use Illuminate\Support\Facades\DB;
use App\Helpers\Pdate;
use Klevze\OnlineUsers\Facades\OnlineUsers;


Route::get('/test2', function () {
    dd($activeUsers = OnlineUsers::getActiveUsers(),request()->ip());
    // dd(___callLang());
    // iccima_change_sess_lang("Persian");
    // dd(iccima_lang_str('nav.home'));
    // iccima_change_sess_lang("Persian");
    // dd(MerchantUserModel::where("card_no","10260117348")->first()->toArray());
    // dd($_data = CardsData::getDataByIndex("558177"));
});
Route::get('/test', function () {
    // $merchant = MerchantUser::find(2816);
    // if (!$merchant?->editable_user) {
    //     MerchantEUser::firstOrCreate(
    //         ['card_no' => $merchant->card_no],
    //         [
    //             "last_updated_at" => Pdate::persianTimeStampNow(),
    //             "confirmed" => 0,
    //         ]
    //     );
    //     $merchant = MerchantUser::find(2816);
    // }
    // $merchant->editable_user->update([
    //     'confirmed'=>1,
    //     'last_updated_at'=>Pdate::persianTimeStampNow(),
    // ]);

    // $merchant->editable_user()->associate([
    //     'confirmed'=>1
    // ]);
    // $merchant->save();
    $merchants = MerchantUser::paginate(20);

    dd($merchants->toArray());

    // $records_load = MerchantUser::get_data_els_filter([
    //     "kws" => "زعفران",
    //     // "kws"=>"sss",
    // ], 10);
    // dd($records_load);

});
