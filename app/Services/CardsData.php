<?php

namespace App\Services;

use App\Models\IndexNumberApi;
use App\Helpers\Pdate;



class CardsData
{
    public static function saveAllIndexes()
    {
        $route = env("CARDS_API_URL") . "memberDirectoryIndexes";
        $headers = [
            "Content-Type" => "application/json",
            "userName" => env("CARDS_API_USERNAME"),
            "password" => env("CARDS_API_PASSWORD"),
        ];
        $body = [
            "fromDate" => "1396/01/01",
            "toDate" => "1403/06/01",
            "lastIndex" => 1,
            "pageSize" => 160000,
        ];
        $indexes = (array)@iccima_request_http($body, $route, "GET", $headers)['response_object']['memberDirectoryIndexes'];
        if ($indexes) {
            foreach ($indexes as $index_number) {
                IndexNumberApi::firstOrCreate(
                    ['index_number' =>  $index_number],
                    [
                        'status' => 0,
                        'last_updated_at' => Pdate::persianTimeStampNow(),
                    ]
                );
            }
        }
    }
    public static function getDataByIndex($index)
    {
        $route = env("CARDS_API_URL") . "fullMemberDirectoryInfo/$index";
        $headers = [
            "Content-Type" => "application/json",
            "userName" => env("CARDS_API_USERNAME"),
            "password" => env("CARDS_API_PASSWORD"),
        ];
        $r = @iccima_request_http([], $route, "GET", $headers)['response_object'];

        return [
            "index_number" => $index,
            "owner_fullname" => @$r['MemberDirectoryBriefModel']->OwnerFullName,
            "card_type_id" => @$r['MemberDirectoryBriefModel']->CardTypeId,
            "person_type_id" => @$r['MemberDirectoryBriefModel']->PersonTypeId,
            "group_activity_type" => @$r['MemberDirectoryBriefModel']->GroupActivityType,
            "card_no" => @$r['MemberDirectoryBriefModel']->CardNo,
            "co_title" => @$r['MemberDirectoryBriefModel']->FullName,
            "co_type" => @$r['MemberDirectoryBriefModel']->CorporationType,
            "co_establish_date" => @$r['MemberDirectoryBriefModel']->CoEstablishDate->English,
            "co_image" => @$r['MemberDirectoryBriefModel']->Image,
            "owner_image" => @$r['MemberDirectoryBriefModel']->OwnerImage,
            "city" => @$r['MemberDirectoryBriefModel']->City,
            "co_phone" => @$r['MemberDirectoryBriefModel']->Phone->English,
            "co_fax" => @$r['MemberDirectoryBriefModel']->Fax->English,
            "co_website" => @$r['MemberDirectoryBriefModel']->Website,
            "co_main_address" => @$r['MemberDirectoryBriefModel']->MainAddress,
            "co_email" => @$r['MemberDirectoryBriefModel']->Email,
            "postal_code" => @$r['MemberDirectoryBriefModel']->PostalCode->English,
            "biz_activities" => @$r['MemberDirectoryBriefModel']->BizActivities,
            "biz_activitiy_goods" => @$r['BizActivityGoods'],
            "coo_biz_activities" => @$r['CooBizActivities'],
            "biz_act_goods_hs_codes" => @$r['BizActGoodsHSCodes'],
            "shared_chambers" => @$r['SharedChambers'],
            "specialized_committees" => @$r['SpecializedCommittees'],
            "guild_types" => @$r['GuildTypes'],
        ];
    }
    public static function updateDataIndexes()
    {
    }
}
