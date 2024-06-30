import { Link } from '@inertiajs/react'
export default function SearchResultCard({ info }) {
    const appUrl = import.meta.env.VITE_APP_URL || 'http://127.0.0.1:8000';

    return (
        <div className="col-md-4 col-lg-4 col-sm-12 mb-2">
            <div className="card card-sr-iccima">
                <img style={{
                    height: '200px',
                    width: '100%',
                }} src={info.logo_corp} className="card-img-top" alt={info.corp_name} />
                <div className="card-body">
                    <h5 className="card-title mb-2" style={{
                        fontSize: '20px',
                    }}>{info.corp_name} (آیدی : {info.id})</h5>
                    <div className="card-text">
                        <h5 className="text-primary">{info.first_name} {info.last_name}</h5>
                        <h5 style={{
                            fontSize: '20px',
                        }} className="text-dark">سهامی خاص، تاسیس {info.year_created}</h5>
                        <div style={{
                            textAlign: 'justify',
                            fontSize: '15px',
                            lineHeight: '1.5',
                        }} className="text-dark">
                            {info.activity}
                        </div>

                        <div style={{
                            fontSize: '16px',
                        }} className="text-secondary">
                            <b> {info.city}</b>
                        </div>
                    </div>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item list-group-item-contact"><i className="fa fa-phone"></i> <strong className="custom-block-contact">{info.phone}</strong></li>
                    <li className="list-group-item list-group-item-contact"><i className="fa fa-fax"></i><strong className="custom-block-contact">{info.fax}</strong></li>
                    <li className="list-group-item list-group-item-contact"><i className="fa fa-globe"></i><strong className="custom-block-contact">{info.website}</strong></li>
                </ul>
                <div className="card-body">
                    <Link className="btn btn-primary" href={`${appUrl}/#section_1`}> <i className='fa fa-exclamation-circle'></i> جزئیات</Link>
                </div>
            </div >
        </div >
    );
}