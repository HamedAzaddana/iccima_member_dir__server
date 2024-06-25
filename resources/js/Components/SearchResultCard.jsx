export default function SearchResultCard({ info }) {
    return (
        <div className="custom-block bg-white shadow-lg mt-5">
            <a href="#">
                <div className="row">
                    <div className="col-lg-2 col-md-2 col-sm-2">
                        <img className="custom-block-img" src={info.logo_corp} alt={info.corp_name} />
                    </div>
                    <div className="col-lg-7 col-md-7 col-sm-7">
                        <h5 className="text-primary">{info.corp_name}</h5> <br />
                        <h5 className="text-primary">{info.first_name} {info.last_name}</h5> <br />
                        <h5 className="text-dark">سهامی خاص، تاسیس {info.year_created}</h5> <br />
                        <div className="text-secondary">
                            { info.activity }
                        </div>
                        <br />
                        <div className="text-secondary">
                           <b> { info.city }</b>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-3">
                        <div><i className="fa fa-phone"></i> <strong className="custom-block-contact">{info.phone}</strong></div>
                        <div><i className="fa fa-fax"></i><strong className="custom-block-contact">{info.fax}</strong></div>
                        <div><i className="fa fa-globe"></i><strong className="custom-block-contact">{info.website}</strong></div>
                    </div>
                </div>
            </a>
        </div>
    );
}