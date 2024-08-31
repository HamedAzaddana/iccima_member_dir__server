
import { Link } from '@inertiajs/react'

export default function FooterBottom() {
    const appUrl = import.meta.env.VITE_APP_URL || 'http://127.0.0.1:8000';
    return (
        <div>
            <footer id="iccima-footer" className="footer">
                <div className="container">
                    <div className="footer-menu">
                        <div className="row">
                            <div className="col-lg-2 col-md-2 col-sm-12 mb-2">
                                <div className="navbar-header">
                                    <center>
                                    <img style={{
                                        width: "60px",
                                        height: "60px",
                                        borderRadius: "20%",
                                        filter: "contrast(180%)",
                                    }} src="/images/iccima_iran.png" alt="" />
                                    </center>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-12 mb-2"></div>
                            <div className="col-lg-6 col-md-6 col-sm-12 mb-2 mt-3 text-dark">
                                © کلیه حقوق مادی و معنوی این سامانه متعلق به اتاق بازرگانی، صنایع، معادن و کشاورزی ایران به نشانی <a className='text-primary' href="https://iccima.ir/" target='_blank'>https://www.iccima.ir</a> می باشد.
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
