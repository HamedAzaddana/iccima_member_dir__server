import { Link } from '@inertiajs/react'

export default function FooterBar({ }) {
    const appUrl = import.meta.env.VITE_APP_URL || 'http://127.0.0.1:8000';

    return (
        <footer className="site-footer section-padding">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-12 mb-4 pb-2">
                        <a className="navbar-brand mb-2" href="index.html">
                            <img style={{
                                width: "60px",
                                height: "60px",
                                borderRadius: "20%",
                                filter: "contrast(180%)",
                            }} src="/images/iccima_iran.png" alt="" />
                            <span style={{
                                fontSize: "20px",
                                padding: "5px",
                                margin: "10px",
                            }}>سامانه اتاق بازرگانی</span>
                        </a>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-12">
                        <h6 className="site-footer-title mb-3">منابع</h6>

                        <ul style={{
                            padding:"0px"
                        }} className="site-footer-links">
                            <li className="site-footer-link-item">
                                <Link className="site-footer-link" href={`${appUrl}/#section_1`}>خانه</Link>
                            </li>
                            <li className="site-footer-link-item">
                                <Link className="site-footer-link" href={`${appUrl}/#section_3`}>راهنما</Link>
                            </li>
                        </ul>
                    </div>

                    <div className="col-lg-3 col-md-4 col-sm-12 mb-4 mb-lg-0">
                        <h6 className="site-footer-title mb-3">اطلاعات</h6>

                        <p className="text-white d-flex mb-1">
                            <a href="tel: 305-240-9671" className="site-footer-link">
                                305-240-9671
                            </a>
                        </p>

                        <p className="text-white d-flex">
                            <a href="mailto:info@company.com" className="site-footer-link">
                                info@company.com
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}