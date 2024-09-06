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
export function convert_number_to_en(txt) {
    let _txt = new String(txt);
    _txt = _txt.replaceAll("۱", "1");
    _txt = _txt.replaceAll("۲", "2");
    _txt = _txt.replaceAll("۳", "3");
    _txt = _txt.replaceAll("۴", "4");
    _txt = _txt.replaceAll("۵", "5");
    _txt = _txt.replaceAll("۶", "6");
    _txt = _txt.replaceAll("۷", "7");
    _txt = _txt.replaceAll("۸", "8");
    _txt = _txt.replaceAll("۹", "9");
    _txt = _txt.replaceAll("۰", "0");
    return _txt;
}
export function convert_number_to_fa(txt) {
    let _txt = new String(txt);
    _txt = _txt.replaceAll("1", "۱");
    _txt = _txt.replaceAll("2", "۲");
    _txt = _txt.replaceAll("3", "۳");
    _txt = _txt.replaceAll("4", "۴");
    _txt = _txt.replaceAll("5", "۵");
    _txt = _txt.replaceAll("6", "۶");
    _txt = _txt.replaceAll("7", "۷");
    _txt = _txt.replaceAll("8", "۸");
    _txt = _txt.replaceAll("9", "۹");
    _txt = _txt.replaceAll("0", "۰");
    return _txt;
}
export function browser_session_set(key, val) {
    ReactSession.setStoreType("sessionStorage");
    ReactSession.set(key, val);
}
export function browser_session_get(key) {
    return ReactSession.get(key);
}
