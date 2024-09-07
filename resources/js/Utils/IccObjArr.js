import { get_jalali_year } from "./IccDate";
import { ReactSession } from 'react-client-session';

export function testJSON(text) {
    if (typeof text !== "string") {
        return false;
    }
    try {
        JSON.parse(text);
        return true;
    } catch (error) {
        return false;
    }
}
export function iterate_jsonify_data(object) {
    let new_obj = {};
    Object.keys(object).forEach(key => {
        let _val = object[key];
        if (typeof _val === 'object') {
            _val = JSON.stringify(_val);
        }
        new_obj[key] = _val;
    });
    return new_obj;

}
export function iterate_prepare_data(object) {
    let new_obj = {};
    Object.keys(object).forEach(key => {
        let _val = object[key];
        if (testJSON(_val)) {
            _val = JSON.parse(_val);
        }
        let array_convert_merge_keys = [
            "biz_activitiy_goods",// نوع فعالیت array
            "coo_biz_activities",// گواهی های مبدا صادر شده array
            "biz_act_goods_hs_codes",// کد های hs تجاری array
            "shared_chambers",// اتاق های مشترک array
            "specialized_committees",// کمیسیون های تخصصی array
            "guild_types",// تشکل ها array
        ];
        if (key == "co_establish_date") {
            let lang = browser_session_get("lang_iccima_system");
            let new_val = _val;
            if (lang == "Persian") {
                new_val = _val ? get_jalali_year(_val, 1, 1) : 0;
            }
            let new_key = "year_establishing";
            new_obj[new_key] = new_val;
        }

        if (key == "co_image") {
            let new_val = (!_val || _val == "null")
                ? "" : "data:image/png;base64, " + _val;
            let new_key = "co_image_new";
            new_obj[new_key] = new_val;
        }
        if (key == "owner_image") {
            let new_val = (!_val || _val == "null")
                ? "" : "data:image/png;base64, " + _val;
            let new_key = "owner_image_new";
            new_obj[new_key] = new_val;
        }
        if (array_convert_merge_keys.includes(key)) {
            let new_key = `${key}__merged`;
            let new_val = {};
            if (Array.isArray(_val)) {
                let Persian_str = "";
                let English_str = "";
                _val.forEach((_val_item) => {
                    Persian_str += _val_item.Persian ? `${_val_item.Persian} <br>` : '';
                    English_str += _val_item.English ? `${_val_item.English} <br>` : '';
                });
                new_val.Persian = Persian_str;
                new_val.English = English_str;
            } else {
                new_val = _val;
            }
            new_obj[new_key] = new_val;
        }
        new_obj[key] = _val;
    });
    return new_obj;
}
export function format_at_email_str(email) {
    return email.replace("@", ' [at] ')
}
export function get_query_param_url(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
export function toEnglishDigits(str) {
    var e = '۰'.charCodeAt(0);
    str = str.replace(/[۰-۹]/g, function(t) {
        return t.charCodeAt(0) - e;
    });

    // convert arabic indic digits [٠١٢٣٤٥٦٧٨٩]
    e = '٠'.charCodeAt(0);
    str = str.replace(/[٠-٩]/g, function(t) {
        return t.charCodeAt(0) - e;
    });
    return str;
}
export function toPersianDigits(str) {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

    return str
        .toString()
        .replace(/\d/g, x => farsiDigits[x]);
}
export function browser_session_set(key, val) {
    ReactSession.setStoreType("sessionStorage");
    ReactSession.set(key, JSON.stringify(val));
}
export function browser_session_get(key) {
    if(typeof ReactSession.get(key) != undefined && ReactSession.get(key)){
        return JSON.parse(ReactSession.get(key));
    }else{
        return null;
    }
}
