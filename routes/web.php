<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\HomePageController;
use App\Helpers\Pdate;
use Elastic\Elasticsearch\ClientBuilder;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', [HomePageController::class, 'index'])->name('home.index');

Route::get('/test2', function () {
      dd(array_keys([
        "card_no" => "14009749757",
        "noncontdaycount" => "132",
        "countaycount" => "132",
        "cardtype" => "کارت بازرگاني",
        "persontype" => "شخص حقوقي",
        "emission_date" => "1402/12/12",
        "expire_date" => "1403/12/12",
        "cardstatus" => "تاييد شده",
        "chamber_name" => "اتاق بازرگاني، صنايع، معادن و کشاورزي آبادان",
        "groupactivity" => "بازرگاني",
        "tolidi" => "توليدی نمی باشد",
        "persian_first_name" => "سيدفرشاد",
        "persian_last_name" => "هاشميان",
        "national_code" => "5290003371",
        "jalalybirthdate" => "1369/04/13",
        "gendertype" => "مرد",
        "mobile" => "09163301042",
        "worktel" => null,
        "hometel" => "06153230390",
        "email" => "abadanniksalamtarvand@gmail.com",
        "workaddress" => null,
        "workpostalcode" => null,
        "corporation_name" => "آبادان نيک سلامت اروند",
        "activityplaceprovince" => "خوزستان",
        "activityplacecity" => "آبادان",
        "bizactivity" => null,
        "manlictype" => null,
        "manlictypetitle" => null,
        "guild_types" => null,
        "guildlistname" => null,
        "sharedchambers" => null,
        "sharedchambersname" => null,
        "is_exchanged" => "0",
        "corporationtype" => "با مسئوليت محدود",
        "officetel" => "06153230390",
        "factorytel" => null,
        "officeaddress" => "استان خوزستان، شهرستان آبادان، بخش مركزي، شهر آبادان، اميري، خيابان فرعي 4، خيابان زند، پلاك 50، مجتمع پارسيك، طبقه 2، واحد 2",
        "factoryaddress" => null,
        "co_email" => "abadanniksalamtarvand@gmail.com",
        "co_website" => null,
        "officepostalcode" => "6316834898",
        "factorypostalcode" => null,
        "isic_code" => null,
        "isic" => null,
        "ownershiptype" => "خصوصي",
        "educationtype" => null,
        "educationcertificate" => " ديپلم",
        "dateran" => "1403/04/21",
        "شماره کارت" => "14009749757",
        "company_name" => "آبادان نيک سلامت اروند",
        "merchant_first_name" => "سيدفرشاد",
        "merchant_last_name" => "هاشميان",
        "emission_dated" => "1402/12/12",
        "issue_date" => "1402/12/12",
        "card_type_title" => "کارت بازرگاني",
        "processtype_title" => "صدور",
        "card_status_title" => "تاييد شده",
        "corespondingcardtype" => null,
        "corespondingexpiredate" => null,
        "corespondingstatustitle" => null,
        "organization_branch_title" => "اتاق بازرگاني، صنايع، معادن و کشاورزي آبادان",
        "person_type_title" => "شخص حقوقي",
        "group_activity_title" => "بازرگاني",
        "manufacturing_title" => "توليدی نمی باشد",
        "revoke_reason_title" => " ,  ,  , ",
        "expire_dated" => "1403/12/12",
        "is_gov_employee" => null,
        "payanekhedmat" => null,
        "javazekasb" => null,
        "parvanebahrebardari" => null,
        "ezharname" => "*",
        "soopishine" => "*",
        "polompedaftar" => null,
        "formealef1" => null,
        "madraketahsili" => "*",
        "sanad/ejarename" => "*",
        "agahitasis" => null,
        "akharintaghiraterooznamerasmi" => "*",
        "186 maliyat" => null,
        "mofasataminejtemaee" => null,
        "shenasname" => "*",
        "kartemeli" => "*",
        "taahodnameozviyat" => null,
        "gozarname" => null,
        "parvaneheghamat" => null,
        "asasname" => null,
        "alldoc11" => "آگهي روزنامه رسمي (تاسيس و تغييرات),اجاره نامه محضري,اظهارنامه ثبت نام در دفاتر بازرگاني,ساير مدارک 3,سايرمدارک 2,شناسنامه,فيش حق عضويت اتاق (~),فيش سازمان صنعت",
        "adressmanzel" => "استان خوزستان ، (شهرستان آبادان - مرکزی) ، شهر آبادان ، کارون ، میدان کارون ، خیابان کارون 1 ، پلاک 16.0 ، طبقه همکف",
        "adressmahalefaaliyat" => "استان خوزستان، شهرستان آبادان، بخش مركزي، شهر آبادان، اميري، خيابان فرعي 4، خيابان زند، پلاك 50، مجتمع پارسيك، طبقه 2، واحد 2",
        "postcodmanzel" => "6316613846",
        "postcodmahalefaaliyat" => null,
      ]));
});
Route::get('/test', function () {
    $start = microtime(true);
    $data = App\Models\PowerBiOracle::get()->toArray();
    $end = microtime(true);
    $elapsed = $end - $start;
    // dd($data);
    echo "Script executed in $elapsed seconds";
    // 6 min for all records
});


require __DIR__ . "/webservice.php";
