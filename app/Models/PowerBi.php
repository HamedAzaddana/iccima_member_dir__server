<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use PDO;

class PowerBi extends Model
{
     use HasFactory;
     protected $table = "Power_bi_merchants";
     public $timestamps = false;
     protected $fillable = [
          "card_no",
          "noncontdaycount",
          "countaycount",
          "cardtype",
          "persontype",
          "emission_date",
          "expire_date",
          "cardstatus",
          "chamber_name",
          "groupactivity",
          "tolidi",
          "persian_first_name",
          "persian_last_name",
          "national_code",
          "jalalybirthdate",
          "gendertype",
          "mobile",
          "worktel",
          "hometel",
          "email",
          "workaddress",
          "workpostalcode",
          "corporation_name",
          "activityplaceprovince",
          "activityplacecity",
          "bizactivity",
          "manlictype",
          "manlictypetitle",
          "guild_types",
          "guildlistname",
          "sharedchambers",
          "sharedchambersname",
          "is_exchanged",
          "corporationtype",
          "officetel",
          "factorytel",
          "officeaddress",
          "factoryaddress",
          "co_email",
          "co_website",
          "officepostalcode",
          "factorypostalcode",
          "isic_code",
          "isic",
          "ownershiptype",
          "educationtype",
          "educationcertificate",
          "dateran",
          "شماره کارت",
          "company_name",
          "merchant_first_name",
          "merchant_last_name",
          "emission_dated",
          "issue_date",
          "card_type_title",
          "processtype_title",
          "card_status_title",
          "corespondingcardtype",
          "corespondingexpiredate",
          "corespondingstatustitle",
          "organization_branch_title",
          "person_type_title",
          "group_activity_title",
          "manufacturing_title",
          "revoke_reason_title",
          "expire_dated",
          "is_gov_employee",
          "payanekhedmat",
          "javazekasb",
          "parvanebahrebardari",
          "ezharname",
          "soopishine",
          "polompedaftar",
          "formealef1",
          "madraketahsili",
          "sanad/ejarename",
          "agahitasis",
          "akharintaghiraterooznamerasmi",
          "186 maliyat",
          "mofasataminejtemaee",
          "shenasname",
          "kartemeli",
          "taahodnameozviyat",
          "gozarname",
          "parvaneheghamat",
          "asasname",
          "alldoc11",
          "adressmanzel",
          "adressmahalefaaliyat",
          "postcodmanzel",
          "postcodmahalefaaliyat",
     ];
     public static function prepare_save_db_sql($data){

     }
     public static function prepare_save_db_elastic($data){

     }

}
