import { Link } from '@inertiajs/react'

export default function SearchResultCard({ info }) {
    const appUrl = import.meta.env.VITE_APP_URL || 'http://127.0.0.1:8000';
    let card_type_id = parseInt(info.card_type_id);
    let person_type_id = parseInt(info.person_type_id);
    
    let co_image = (!info.co_image || info.co_image == "null")
        ? "https://cdn-icons-png.flaticon.com/512/9371/9371369.png" : "data:image/png;base64, " + info.co_image;
    let co_title = JSON.parse(info.co_title);
    let owner_fullname = JSON.parse(info.owner_fullname);
    let co_type = JSON.parse(info.co_type);
    let biz_activities = JSON.parse(info.biz_activities);
    let city = JSON.parse(info.city);
    return (
        <div className="col-md-12 col-lg-12 col-sm-12 mb-2 animate__animated animate__fadeIn animate__delay-0.7s wow">
            <div className="row">
                <div className="card card-sr-iccima">
                    <div className="row p-2 m-1">
                        <div className="col-md-12 col-lg-2 col-sm-12">
                            <img style={{
                                height: '200px',
                                width: '100%',
                            }} src={co_image} className="card-img-top" alt={co_title.Persian} />
                        </div>
                        <div className="col-md-12 col-lg-7 col-sm-12">
                            <h5 className="card-title mb-2 pt-4 pb-1" style={{
                                fontSize: '20px',
                            }}>{co_title.Persian} </h5>
                            <div className="card-text">
                                <h5 className="text-primary">{owner_fullname.Persian ? owner_fullname.Persian : co_title.Persian}</h5>
                                <h5 style={{
                                    fontSize: '20px',
                                }} className="text-dark">{co_type.Persian} {info.co_establish_date}</h5>
                                <div style={{
                                    textAlign: 'justify',
                                    fontSize: '15px',
                                    lineHeight: '1.5',
                                }} className="text-dark mt-1 mb-1 p-1"
                                    dangerouslySetInnerHTML={{
                                        __html: (biz_activities.Persian ? biz_activities.Persian : (
                                            <span></span>
                                        ))
                                    }}
                                >
                                </div>
                                <div style={{
                                    fontSize: '16px',
                                }} className="text-secondary">
                                    <b>{city.Persian}</b>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-3 col-sm-12">
                            <ul className="list-group list-group-flush">
                                {info.co_phone ? (<li className="list-group-item list-group-item-contact"><i className="fa fa-phone"></i> <strong className="custom-block-contact">{info.co_phone}</strong></li>) : (<span></span>)}
                                {info.co_fax ? (<li className="list-group-item list-group-item-contact"><i className="fa fa-fax"></i> <strong className="custom-block-contact">{info.co_fax}</strong></li>) : (<span></span>)}
                                {info.co_website ? (
                                    <li className="list-group-item list-group-item-contact"><i className="fa fa-globe"></i>
                                        <strong className="custom-block-contact">
                                            <a target='blank' href={
                                                info.co_website.toLowerCase().includes('http') ?
                                                    (info.co_website.toLowerCase()) : (`https://` + info.co_website.toLowerCase())
                                            }>{info.co_website.toLowerCase()}</a>
                                        </strong>
                                    </li>) : (<span></span>)}
                            </ul>
                            <br />
                            <div style={{
                                padding: '30px',
                            }} className="card-body">
                                <Link className="btn btn-primary btn-more-detail" href={`${appUrl}/#section_1`}> <i className='fa fa-exclamation-circle'></i> جزئیات</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}