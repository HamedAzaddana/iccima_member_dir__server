
import { Link } from '@inertiajs/react'
import { get_jalali_year } from '../../Utils/IccDate';
import { iterate_prepare_data } from '../../Utils/IccObjArr';
export default function CardResult({ info }) {
    const handleNonDo = (e) => {
        e.preventDefault();
    }
    const appUrl = import.meta.env.VITE_APP_URL || 'http://127.0.0.1:8000';
    let card_info = iterate_prepare_data(info);
    console.log(card_info)
    let card_type_id = parseInt(card_info.card_type_id);
    //1 : بازرگانی
    //2 : عضویت

    let person_type_id = parseInt(card_info.person_type_id);
    //46 : حقیقی
    //47 : حقوقی
    let co_image = (!card_info.co_image || card_info.co_image == "null")
        ? "https://cdn-icons-png.flaticon.com/512/9371/9371369.png" : "data:image/png;base64, " + card_info.co_image;
    let owner_image = (!card_info.owner_image || card_info.owner_image == "null")
        ? "https://static-00.iconduck.com/assets.00/user-icon-2048x2048-ihoxz4vq.png" : "data:image/png;base64, " + card_info.owner_image;
    let co_title = card_info.co_title;
    let owner_fullname = card_info.owner_fullname;
    let co_type = card_info.co_type;
    let biz_activities = card_info.biz_activities;
    let biz_activities_html = biz_activities.Persian ? biz_activities.Persian : "";
    let city = card_info.city;
    let cover_image = (!card_info.co_image || card_info.co_image == "null")
        ? owner_image : "data:image/png;base64, " + card_info.co_image;
    let jalali_year = card_info.co_establish_date ? get_jalali_year(card_info.co_establish_date, 1, 1) : 0;
    let co_phone = card_info.co_phone;
    let co_fax = card_info.co_fax;
    let co_website = card_info.co_website;
    let spl = card_info.spl;
    return (
        <div className="col-lg-12 col-md-12 col-sm-12 animate__animated animate__fadeIn animate__delay-0.7s wow">
            <div className="single-explore-item">
                <div className="single-explore-txt bg-theme-1">
                    <div className="row CardResultContent">
                        <div className="col-md-2 col-lg-2 col-sm-12 mt-3">
                            <div className="explore-person-img">
                                <a href="#" onClick={handleNonDo}>
                                    <img style={{ borderRadius: "35%" }} src={cover_image} alt={owner_fullname.Persian ?
                                        owner_fullname.Persian : co_title.Persian} />
                                </a>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-sm-12 mt-3">
                            <h6 className='mt-1 pt-1 text-primary'><strong>{co_title.Persian}</strong></h6>
                            <h3 className='mt-2'><a onClick={handleNonDo} href="#" className='text-danger'><strong>{owner_fullname.Persian ? owner_fullname.Persian : co_title.Persian}</strong></a></h3>
                            <p className='mt-1 pt-1 text-dark'><strong>{co_type.Persian} {jalali_year ? `تاسیس ${jalali_year}` : ""}</strong></p>
                            <p className='mt-1 pt-1 text-dark text-justify' dangerouslySetInnerHTML={{ __html: biz_activities_html }} ></p>
                            <br />
                            <strong>{city.Persian}</strong>
                        </div>
                        <div className="col-md-3 col-lg-3 col-sm-12 mt-3 ContactsPartCardRs">
                            {co_phone ? (
                                <p className='mt-1 p-1'><a className='text-primary' href="#"> <i className='fa fa-phone'></i> <strong>{co_phone}</strong></a> </p>
                            ) : ""}
                            {co_fax ? (
                                <p className='mt-1 p-1'><a className='text-primary' href="#"> <i className='fa fa-fax'></i> <strong>{co_fax}</strong></a> </p>
                            ) : ""}
                            {co_website ? (
                                <p className='mt-1 p-1'><a className='text-primary' href="#"> <i className='fa fa-globe'></i> <strong>{co_website}</strong></a> </p>
                            ) : ""}
                            <Link style={{
                                width: "max-content"
                            }} className="btn btn-secondary" href={spl}> <i className='fa fa-exclamation-circle'></i> &nbsp;
                                جزئیات</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
