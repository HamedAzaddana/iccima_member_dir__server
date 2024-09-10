<?php

namespace App\Helpers;

use Morilog\Jalali\Jalalian;

class Pdate
{
    public static function convertToTimestampInt($datetime)
    {
        return  \Carbon\Carbon::parse($datetime)->timestamp;
    }
    public static function convertTimeStampToDateTime($timestamp = 0)
    {
        if ($timestamp == 0) {
            $timestamp = time();
        }
        return  date('Y-m-d H:i:s', $timestamp);
    }
    public static function persianTimeStampNow()
    {

        $date = date('Y-m-d H:i:s', time());
        if (env('ENVIRONMENT_APP') == 'development') {
            $date_original = \Carbon\Carbon::parse($date)->addHour();
        } else {
            $date_original = \Carbon\Carbon::parse($date);
        }
        return $date_original;
    }
    public static function sLeapYear($year)
    {
        $ary = array(1, 5, 9, 13, 17, 22, 26, 30);
        $b = $year % 33;
        if (in_array($b, $ary))
            return true;
        return false;
    }
    public static function getLastDayOfMonth($month, $year)
    {
        $days_of_month = 30;
        $month31days = [
            1,
            2,
            3,
            4,
            5,
            6
        ];
        $to_year_is_leap = self::sLeapYear($year);
        if ($to_year_is_leap && $month == 12) {
            $days_of_month = 30;
        }
        if (!$to_year_is_leap && $month == 12) {
            $days_of_month = 29;
        }
        if (in_array($month, $month31days)) {
            $days_of_month = 31;
        }
        return $days_of_month;
    }
    public static function persianDateToDateTimeString($pdate, $H = 0, $i = 0, $s = 0)
    {
        if (preg_match('/^(\d{4})\/(\d{1,2})\/(\d{1,2})$/', $pdate)) {
            $ymd = explode('/', $pdate);
        } elseif (preg_match('/^(\d{4})-(\d{1,2})-(\d{1,2})$/', $pdate)) {
            $ymd = explode('-', $pdate);
        } else {
            return false;
        }
        $year = (int)$ymd[0];
        $month = (int)$ymd[1];
        $day = (int)$ymd[2];
        if (
            $year > 1600 ||
            $year < 1000 ||
            $month > 12 ||
            $month < 1 ||
            $day > 31 ||
            $day < 1
        ) {
            return false;
        }
        $lastDayOfMonth = (int)self::getLastDayOfMonth($month, $year);
        if ($day > $lastDayOfMonth) {
            return false;
        }
        $dateTimeString = (new Jalalian($ymd[0], $ymd[1], $ymd[2], $H, $i, $s))->toCarbon()->toDateTimeString();
        return $dateTimeString;
    }
    public static function persianDateToDateString($pdate, $H = 0, $i = 0, $s = 0)
    {
        if (preg_match('/^(\d{4})\/(\d{1,2})\/(\d{1,2})$/', $pdate)) {
            $ymd = explode('/', $pdate);
        } elseif (preg_match('/^(\d{4})-(\d{1,2})-(\d{1,2})$/', $pdate)) {
            $ymd = explode('-', $pdate);
        } else {
            return false;
        }
        $year = (int)$ymd[0];
        $month = (int)$ymd[1];
        $day = (int)$ymd[2];
        if (
            $year > 1600 ||
            $year < 1000 ||
            $month > 12 ||
            $month < 1 ||
            $day > 31 ||
            $day < 1
        ) {
            return false;
        }
        $lastDayOfMonth = (int)self::getLastDayOfMonth($month, $year);
        if ($day > $lastDayOfMonth) {
            return false;
        }
        $dateTimeString = (new Jalalian($ymd[0], $ymd[1], $ymd[2], $H, $i, $s))->toCarbon()->toDateString();
        return $dateTimeString;
    }
    public static function toPersianDate($gdate, $format = 'Y-m-d')
    {
        $gY = (int)date('Y', strtotime($gdate));
        $gm = (int)date('m', strtotime($gdate));
        $gd = (int)date('d', strtotime($gdate));
        $gH = (int)date('H', strtotime($gdate));
        $gi = (int)date('i', strtotime($gdate));
        $gs = (int)date('s', strtotime($gdate));
        $pDate = \Morilog\Jalali\CalendarUtils::strftime($format, strtotime("$gY-$gm-$gd"));
        return "$gH:$gi , $pDate";
    }
    public static function toPersianDateYMDTime($gdate, $format = 'Y-m-d')
    {
        $gY = (int)date('Y', strtotime($gdate));
        $gm = (int)date('m', strtotime($gdate));
        $gd = (int)date('d', strtotime($gdate));
        $gH = (int)date('H', strtotime($gdate));
        $gi = (string)date('i', strtotime($gdate));
        $gs = (int)date('s', strtotime($gdate));
        $pDate = \Morilog\Jalali\CalendarUtils::strftime($format, strtotime("$gY-$gm-$gd"));
        return [
            'ymd' => $pDate,
            'time' => "$gH:$gi"
        ];
    }
    public static function getDateTimeTFormat($gdate)
    {
        $gY = date('Y', strtotime($gdate));
        $gm = date('m', strtotime($gdate));
        $gd = date('d', strtotime($gdate));
        $gH = date('H', strtotime($gdate));
        $gi = date('i', strtotime($gdate));
        $gs = date('s', strtotime($gdate));
        return "$gY-$gm-$gd" . "T" . "$gH:$gi:$gs";
    }
    public static function getDateTimeTZFormat($gdate)
    {
        $gY = date('Y', strtotime($gdate));
        $gm = date('m', strtotime($gdate));
        $gd = date('d', strtotime($gdate));
        $gH = date('H', strtotime($gdate));
        $gi = date('i', strtotime($gdate));
        $gs = date('s', strtotime($gdate));
        return "$gY-$gm-$gd" . "T" . "$gH:$gi:00.000Z";
    }
    public static function compareGdate($gdate)
    {
        $status = 0;
        $now = time();
        $ad = strtotime($gdate);
        if ($now > $ad) {
            $status = -1;
        } elseif ($now < $ad) {
            $status = 1;
        } else {
            $status = 0;
        }
        return $status;
    }
    public static function compare2Gdate($gdate1, $gdate2)
    {
        $status = 0;
        $t1 = strtotime($gdate1);
        $t2 = strtotime($gdate2);
        if ($t1 > $t2) {
            $status = -1;
        } elseif ($t1 < $t2) {
            $status = 1;
        } else {
            $status = 0;
        }
        return $status;
    }
    public static function getCurrentPersianYear()
    {
        $y = jdate()->getYear();
        return $y;
    }
    public static function getYMDstandardDate($timestamp = 0)
    {
        if (!$timestamp) {
            $timestamp = time();
        }
        $y = jdate($timestamp)->getYear();
        $m = strlen(jdate($timestamp)->getMonth())==2 ? jdate($timestamp)->getMonth() : "0".jdate($timestamp)->getMonth();
        $d = strlen(jdate($timestamp)->getDay())==2 ? jdate($timestamp)->getDay() : "0".jdate($timestamp)->getDay();
        return "$y/$m/$d";
    }
}


/*
examples :
    dd(App\Helpers\Pdate::persianTimeStampNow());
    dd(Pdate::toPersianDate("2023-06-14 23:30:00",'Y/m/d'));
*/