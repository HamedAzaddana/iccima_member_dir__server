<?php

namespace App\Services;

use App\Models\IndexNumberApi;
use App\Helpers\Pdate;
use ErrorException;

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
            "toDate" => "1403/06/03",
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
        $r = iccima_request_http([], $route, "GET", $headers);
        $response_object = @$r['response_object'];
        $status_code = @$r['status_code'];
        $error = @$r['error'];
        if ($status_code !== 200 && $status_code !== 201) {
            throw new \ErrorException("Card Service Error Code : " . print_r($error,true) ." status code : ".$status_code);
        }
        return [
            "index_number" => $index,
            "owner_fullname" => @$response_object['MemberDirectoryBriefModel']->OwnerFullName,
            "card_type_id" => @$response_object['MemberDirectoryBriefModel']->CardTypeId,
            "person_type_id" => @$response_object['MemberDirectoryBriefModel']->PersonTypeId,
            "group_activity_type" => @$response_object['MemberDirectoryBriefModel']->GroupActivityType,
            "card_no" => @$response_object['MemberDirectoryBriefModel']->CardNo,
            "co_title" => @$response_object['MemberDirectoryBriefModel']->FullName,
            "co_type" => @$response_object['MemberDirectoryBriefModel']->CorporationType,
            "co_establish_date" => @$response_object['MemberDirectoryBriefModel']->CoEstablishDate->English,
            "co_image" => @$response_object['MemberDirectoryBriefModel']->Image,
            "owner_image" => @$response_object['MemberDirectoryBriefModel']->OwnerImage,
            "city" => @$response_object['MemberDirectoryBriefModel']->City,
            "province" => @$response_object['MemberDirectoryBriefModel']->Province,
            "co_phone" => @$response_object['MemberDirectoryBriefModel']->Phone->English,
            "co_fax" => @$response_object['MemberDirectoryBriefModel']->Fax->English,
            "co_website" => @$response_object['MemberDirectoryBriefModel']->Website,
            "co_main_address" => @$response_object['MemberDirectoryBriefModel']->MainAddress,
            "co_email" => @$response_object['MemberDirectoryBriefModel']->Email,
            "postal_code" => @$response_object['MemberDirectoryBriefModel']->PostalCode->English,
            "biz_activities" => @$response_object['MemberDirectoryBriefModel']->BizActivities,
            "biz_activitiy_goods" => @$response_object['BizActivityGoods'],
            "coo_biz_activities" => @$response_object['CooBizActivities'],
            "biz_act_goods_hs_codes" => @$response_object['BizActGoodsHSCodes'],
            "shared_chambers" => @$response_object['SharedChambers'],
            "specialized_committees" => @$response_object['SpecializedCommittees'],
            "guild_types" => @$response_object['GuildTypes'],
        ];
    }
    public static function updateDataIndexes() {}
}
