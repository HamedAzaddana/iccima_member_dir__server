import { get_jalali_year } from "./IccDate";
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
            let new_val = _val ? get_jalali_year(_val, 1, 1) : 0;
            let new_key = "jalali_year";
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
                ? "https://static-00.iconduck.com/assets.00/user-icon-2048x2048-ihoxz4vq.png" : "data:image/png;base64, " + _val;
            let new_key = "owner_image_new";
            new_obj[new_key] = new_val;
        }
        if (array_convert_merge_keys.includes(key)) {
            let new_key = `${key}__merged`;
            let new_val = {};
            if (Array.isArray(_val)) {
                let Persian_str = "";
                let English_str = "";
                _val.forEach((_val_item) =>{
                    Persian_str+=_val_item.Persian ? `${_val_item.Persian} <br>` : '';
                    English_str+=_val_item.English ? `${_val_item.English} <br>` : '';
                });
                new_val.Persian =Persian_str;
                new_val.English =English_str;
            } else {
                new_val = _val;
            }
            new_obj[new_key] = new_val;
        }
        new_obj[key] = _val;
    });
    return new_obj;
}
