import { Link } from '@inertiajs/react'

export default function SearchResultCard({ info }) {
    const appUrl = import.meta.env.VITE_APP_URL || 'http://127.0.0.1:8000';
    return (
        <div className="col-md-4 col-lg-4 col-sm-12 mb-2">
            <div data-mh className="card card-sr-iccima">
                <img style={{
                    height: '200px',
                    width: '100%',
                }} src={`https://cdn-icons-png.flaticon.com/512/9371/9371369.png`} className="card-img-top" alt={info.companyname_fa} />
                <div className="card-body">
                    <h5 className="card-title mb-2" style={{
                        fontSize: '20px',
                    }}>{info.companyname_fa} (آیدی : {info.__id})</h5>
                    <div className="card-text">
                        <h5 className="text-primary">{info.ownerfirstname_fa} {info.ownerlastname_fa}</h5>
                        <h5 style={{
                            fontSize: '20px',
                        }} className="text-dark">سهامی خاص، تاسیس 1404</h5>
                        <div style={{
                            textAlign: 'justify',
                            fontSize: '15px',
                            lineHeight: '1.5',
                        }} className="text-dark">
                            {info.bizactivities_fa}
                        </div>

                        <div style={{
                            fontSize: '16px',
                        }} className="text-secondary">
                            <b> تهران تستی</b>
                        </div>
                    </div>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item list-group-item-contact"><i className="fa fa-phone"></i> <strong className="custom-block-contact">{info.phone}</strong></li>
                    <li className="list-group-item list-group-item-contact"><i className="fa fa-fax"></i><strong className="custom-block-contact">{info.fax_no}</strong></li>
                    <li className="list-group-item list-group-item-contact"><i className="fa fa-globe"></i><strong className="custom-block-contact">{info.phone_no}</strong></li>
                </ul>
                <br /> 
                <div className="card-body">
                    <Link className="btn btn-primary btn-more-detail" href={`${appUrl}/#section_1`}> <i className='fa fa-exclamation-circle'></i> جزئیات</Link>
                </div>
            </div>
        </div>
    );
}