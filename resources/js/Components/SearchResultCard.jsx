import { Link } from '@inertiajs/react'

export default function SearchResultCard({ info }) {
    const appUrl = import.meta.env.VITE_APP_URL || 'http://127.0.0.1:8000';
    return (
        <div className="col-md-12 col-lg-12 col-sm-12 mb-2 animate__animated animate__fadeIn animate__delay-0.7s wow">
            <div className="row">
                <div className="card card-sr-iccima">
                    <div className="row p-2 m-1">
                        <div className="col-md-12 col-lg-2 col-sm-12">
                            <img style={{
                                height: '200px',
                                width: '100%',
                            }} src={`https://cdn-icons-png.flaticon.com/512/9371/9371369.png`} className="card-img-top" alt={info.companyname_fa} />
                        </div>
                        <div className="col-md-12 col-lg-7 col-sm-12">
                            <h5 className="card-title mb-2 pt-4 pb-1" style={{
                                fontSize: '20px',
                            }}>{info.companyname_fa} </h5>
                            <div className="card-text">
                                <h5 className="text-primary">{info.ownerfirstname_fa} {info.ownerlastname_fa}</h5>
                                <h5 style={{
                                    fontSize: '20px',
                                }} className="text-dark">سهامی خاص، تاسیس 1404</h5>
                                <div style={{
                                    textAlign: 'justify',
                                    fontSize: '15px',
                                    lineHeight: '1.5',
                                }} className="text-dark mt-1 mb-1 p-1">
                                    {info.bizactivities_fa ? info.bizactivities_fa : (
                                        <span></span>
                                    )}
                                </div>

                                <div style={{
                                    fontSize: '16px',
                                }} className="text-secondary">
                                    <b> تهران تستی</b>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-3 col-sm-12">
                            <ul className="list-group list-group-flush">
                                {info.phone_no ? (<li className="list-group-item list-group-item-contact"><i className="fa fa-phone"></i> <strong className="custom-block-contact">{info.phone_no}</strong></li>) : (<span></span>)}
                                {info.fax_no ? (<li className="list-group-item list-group-item-contact"><i className="fa fa-fax"></i> <strong className="custom-block-contact">{info.fax_no}</strong></li>) : (<span></span>)}
                                {info.website ? (
                                    <li className="list-group-item list-group-item-contact"><i className="fa fa-globe"></i>
                                        <strong className="custom-block-contact">
                                            <a target='blank' href={ 
                                                info.website.toLowerCase().includes('http') ?
                                                (info.website.toLowerCase()) : (`https://`+info.website.toLowerCase())
                                                 }>{info.website.toLowerCase()}</a>
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