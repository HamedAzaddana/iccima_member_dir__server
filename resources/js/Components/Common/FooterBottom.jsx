
import { Link } from '@inertiajs/react'

export default function FooterBottom() {
    const appUrl = import.meta.env.VITE_APP_URL || 'http://127.0.0.1:8000';
    return (
        <div>
            <footer id="iccima-footer" className="footer">
                <div className="container">
                    <div className="footer-menu">
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <div className="navbar-header">
                                    <img style={{
                                        width: "60px",
                                        height: "60px",
                                        borderRadius: "20%",
                                        filter: "contrast(180%)",
                                    }} src="/images/iccima_iran.png" alt="" />
                                  
                                </div>
                            </div>
                           
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
