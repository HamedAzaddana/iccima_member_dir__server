
import { Link } from '@inertiajs/react'
export default function CardResult({ info }) {

    const get_jalali_year = (gy, gm, gd) => {
        let g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
        let jy = 0;
        if (gy > 1600) {
            jy = 979;
            gy -= 1600;
        }
        else {
            jy = 0;
            gy -= 621;
        }
        let gy2 = (gm > 2) ? (gy + 1) : gy;
        let days = (365 * gy) + (parseInt((gy2 + 3) / 4)) - (parseInt((gy2 + 99) / 100)) + (parseInt((gy2 + 399) / 400)) - 80 + gd + g_d_m[gm - 1];
        jy += 33 * (parseInt(days / 12053));
        days %= 12053;
        jy += 4 * (parseInt(days / 1461));
        days %= 1461;
        if (days > 365) {
            jy += parseInt((days - 1) / 365);
            days = (days - 1) % 365;
        }
        let jm = (days < 186) ? 1 + parseInt(days / 31) : 7 + parseInt((days - 186) / 30);
        let jd = 1 + ((days < 186) ? (days % 31) : ((days - 186) % 30));
        var resultY = jy.toString();
        var resultM = jm < 10 ? "0" + jm.toString() : jm.toString();
        var resultD = jd < 10 ? "0" + jd.toString() : jd.toString();
        return resultY;
    }

    const appUrl = import.meta.env.VITE_APP_URL || 'http://127.0.0.1:8000';
    let card_type_id = parseInt(info.card_type_id);
    let person_type_id = parseInt(info.person_type_id);

    let co_image = (!info.co_image || info.co_image == "null")
        ? "https://cdn-icons-png.flaticon.com/512/9371/9371369.png" : "data:image/png;base64, " + info.co_image;
    let owner_image = (!info.owner_image || info.owner_image == "null")
        ? "https://static-00.iconduck.com/assets.00/user-icon-2048x2048-ihoxz4vq.png" : "data:image/png;base64, " + info.owner_image;
    let co_title = JSON.parse(info.co_title);
    let owner_fullname = JSON.parse(info.owner_fullname);
    let co_type = JSON.parse(info.co_type);
    let biz_activities = JSON.parse(info.biz_activities);
    let biz_activities_html = biz_activities.Persian ? biz_activities.Persian : "";
    let city = JSON.parse(info.city);
    let cover_image = (!info.co_image || info.co_image == "null")
        ? owner_image : "data:image/png;base64, " + info.co_image;
    let jalali_year = info.co_establish_date ? get_jalali_year(info.co_establish_date, 1, 1) : "*";
    return (
        <div className="col-lg-12 col-md-12 col-sm-12 animate__animated animate__fadeIn animate__delay-0.7s wow">
            <div className="single-explore-item">
                <div className="single-explore-txt bg-theme-1">
                    <div className="row">
                        <div className="col-md-4 col-lg-4 col-sm-12 mt-2">
                            <div className="explore-person-img">
                                <a href="#">
                                    <img style={{ borderRadius: "35%" }} src={cover_image} alt={owner_fullname.Persian ?
                                        owner_fullname.Persian : co_title.Persian} />
                                </a>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-sm-12 mt-5">
                            <h2><a href="#" className='text-secondary'>{owner_fullname.Persian ? owner_fullname.Persian : co_title.Persian}</a></h2>
                            <h6 className='mt-1 pt-1'><strong>{co_title.Persian}</strong></h6>
                        </div>
                        <div className="col-md-2 col-lg-2 col-sm-12 mt-5">
                            <Link style={{
                                width:"max-content"
                            }} className="btn btn-secondary" href={`${appUrl}/#`}> <i className='fa fa-exclamation-circle'></i> &nbsp;
                                جزئیات</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
