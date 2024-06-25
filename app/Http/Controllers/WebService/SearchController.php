<?php

namespace App\Http\Controllers\WebService;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;


class SearchController extends Controller
{
    public function index()
    {
        $appender = array(
            [
                "logo_corp" => "https://cdn-icons-png.flaticon.com/512/9371/9371369.png",
                "user_image" => "https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjkzNy1hZXctMTY1LWtsaGN3ZWNtLmpwZw.jpg",
                "first_name" => "کاظم",
                "last_name" => "داعی",
                "corp_name" => "کشاورزی پارس کیمیا کشت",
                "year_created" => "1389",
                "province" => "یزد",
                "city" => "مهریز",
                "address" => "يزد-مهريز-شهرک صنعتي مهريز (هرفته). کوچه شقايق ۴. واحد ۱۵۰",
                "phone" => "۰۳۵۳۲۵۵۳۳۶۵",
                "fax" => "۰۳۵۳۲۵۵۳۳۷۵",
                "website" => "http://www.agripars.com",
                "activity" => "
           (۰۰) مواد اوليه، ماشين آلات،اجزاء،قطعات و لوازم يدکي مورد نياز خط توليد
(۰۱) مواد غذائي، حيواني، نباتي، آشاميدني، محصولات وابسته، نباتات و حيوانات زنده (قسمت ۱و۲و۳و۴ کتاب)
(۰۳) مواد شيميايي، پلاستيک، دارويي و محصولات وابسته (قسمت ۶و۷ کتاب)
           ",
                "activity_type" => "کشاورزی و صنایع",
                "orders_registered" => "
            کود NPKدربسته های کمتراز10کیلوگرم
سایرکودهابه شکل قرص یاا شکال هماننددربسته.... ناخالص کمترا ز10کیلوگرم غیرمذکور
            ",
                "imports_done" => "",
                "certificate_issued" => "",
                "common_rooms" => "
            اتاق مشترک ایران و افغانستان
اتاق مشترک ایران و عراق 
            ",
                "spec_commissions" => "",
                "organizations" => "
            اتحادیه ملی محصولات كشاورزی ایران
انجمن واردكنندگان سم و كود ایران
            ",
            ],
            [
                "logo_corp" => "https://cdn-icons-png.flaticon.com/512/9371/9371369.png",
                "user_image" => "https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjkzNy1hZXctMTY1LWtsaGN3ZWNtLmpwZw.jpg",
                "first_name" => "سعید",
                "last_name" => "خزاییان",
                "corp_name" => "کشاورزی پارس کیمیا کشت",
                "year_created" => "1389",
                "province" => "یزد",
                "city" => "مهریز",
                "address" => "تهران خيابان فلسطين شمالي پايين تر از چهارراه زرتشت نبش کوچه شهيد برادران فرزام پلاک ۵۱۸ طبقه ۲ واحد ۲/۱ و طبقه ۵",
                "phone" => "۰۳۵۳۲۵۵۳۳۶۵",
                "fax" => "۰۳۵۳۲۵۵۳۳۷۵",
                "website" => "http://www.agripars.com",
                "activity" => "
       (۰۰) مواد اوليه، ماشين آلات،اجزاء،قطعات و لوازم يدکي مورد نياز خط توليد
(۰۱) مواد غذائي، حيواني، نباتي، آشاميدني، محصولات وابسته، نباتات و حيوانات زنده (قسمت ۱و۲و۳و۴ کتاب)
(۰۳) مواد شيميايي، پلاستيک، دارويي و محصولات وابسته (قسمت ۶و۷ کتاب)
       ",
                "activity_type" => "کشاورزی و صنایع",
                "orders_registered" => "
        کود NPKدربسته های کمتراز10کیلوگرم
سایرکودهابه شکل قرص یاا شکال هماننددربسته.... ناخالص کمترا ز10کیلوگرم غیرمذکور
        ",
                "imports_done" => "",
                "certificate_issued" => "",
                "common_rooms" => "
        اتاق مشترک ایران و افغانستان
اتاق مشترک ایران و عراق 
        ",
                "spec_commissions" => "",
                "organizations" => "
        اتحادیه ملی محصولات كشاورزی ایران
انجمن واردكنندگان سم و كود ایران
        ",
            ]
        );
        $data = [];
        for ($i = 0; $i <= 2; $i++) {
            $data = array_merge($data, $appender);
        }

        return response()->json([
            'data' => $data,
            'req' => request()->all(),
        ], 200);
    }
    public function get_filters_var()
    {
        $person_types = [
            56 => 'شخص حقیقی',
            57 => 'شخص حقوقی',
        ];
        $province = [
            562 => 'تهران',
            563 => 'قم',
            564 => 'خراسان رضوی',
            565 => 'اصفهان',
            566 => 'فارس',
            567 => 'بوشهر',
        ];
        $rank = [
            1001 => 'زرین 3 ستاره',
            1002 => 'زرین 2 ستاره',
            1003 => 'زرین 1 ستاره',
            1004 => 'سیمین 3 ستاره',
            1005 => 'سیمین 2 ستاره',
            1006 => 'سیمین 1 ستاره',
            1000 => 'عادی',
        ];
        $activity_type = [
            536456 => 'تولید',
            645767 => 'صادرات',
            45654675 => 'واردات',
        ];
        return response()->json([
            'data' => [
                'person_types' => prepareSelect($person_types),
                'provinces' => prepareSelect($province),
                'ranks' => prepareSelect($rank),
                'activity_types' => prepareSelect($activity_type),
            ],
        ], 200);
    }
}
