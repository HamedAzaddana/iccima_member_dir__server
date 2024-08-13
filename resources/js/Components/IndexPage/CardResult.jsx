
import { Link } from '@inertiajs/react'
export default function CardResult({ info }) {
    const get_jalali_year=(gy, gm, gd)=>{
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
    let city = JSON.parse(info.city);
    let cover_image = (!info.co_image || info.co_image == "null")
        ? owner_image : "data:image/png;base64, " + info.co_image;
    let jalali_year = get_jalali_year(info.co_establish_date, 1, 1);
    return (
        <div className="col-lg-4 col-md-6 col-sm-12 animate__animated animate__fadeIn animate__delay-0.7s wow">
            <div className="single-explore-item">
                <div className="single-explore-img">
                    <img style={{
                        height: '354px',
                        width: '100%',
                    }} src={cover_image} alt={owner_fullname.Persian ? owner_fullname.Persian : co_title.Persian} />
                    <div className="single-explore-img-info">
                    </div>
                </div>
                <div className="single-explore-txt bg-theme-1">
                    <h2><a href="#">{owner_fullname.Persian ? owner_fullname.Persian : co_title.Persian}</a></h2>
                    <p className="explore-rating-price">
                        <span className="explore-rating">{jalali_year}</span>
                        <span className="explore-price-box">
                            <span className="explore-price"><b>{city.Persian}</b></span>
                        </span>
                        <a href="#">{co_type.Persian}</a>
                    </p>
                    <div className="explore-person">
                        <div className="row">
                            <div className="col-sm-12 col-md-12 col-lg-12">
                                <div className="explore-person-img">
                                    <a href="#">
                                        <img style={{
                                            borderRadius: "35%"
                                        }} src={owner_image} alt={owner_fullname.Persian ? owner_fullname.Persian : co_title.Persian} />
                                    </a>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-12 col-lg-12 mt-4">
                                <div
                                    data-mh
                                    style={{
                                        textAlign: 'justify',
                                        color:'black'
                                    }}
                                    dangerouslySetInnerHTML={{
                                        __html: (biz_activities.Persian ? biz_activities.Persian : (
                                            <span></span>
                                        ))
                                    }}
                                >
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="explore-open-close-part">
                        <div className="row">
                            <div className="col-sm-5">
                                <Link className="btn btn-secondary" href={`${appUrl}/#`}> <i className='fa fa-exclamation-circle'></i> جزئیات</Link>
                            </div>
                            <div className="col-sm-7">
                                <div className="explore-map-icon">
                                    <a href="#"><i data-feather="map-pin"></i></a>
                                    <a href="#"><i data-feather="upload"></i></a>
                                    <a href="#"><i data-feather="heart"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
