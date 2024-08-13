
import { Link } from '@inertiajs/react'

export default function FooterBottom() {
    const appUrl = import.meta.env.VITE_APP_URL || 'http://127.0.0.1:8000';

    return (
        <div>
            <footer id="footer" className="footer">
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
                                    <span style={{
                                        fontSize: "20px",
                                        padding: "5px",
                                        margin: "10px",
                                    }}>سامانه اتاق بازرگانی</span>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <ul className="footer-menu-item">
                                    <li className="scroll"><Link className="nav-link" href={`${appUrl}/#`}>خانه</Link></li>
                                    <li className="scroll"><Link className="nav-link" href={`${appUrl}/#`}>راهنما</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="hm-footer-copyright">
                        <div className="row">
                            <div className="col-sm-5">
     
                            </div>
                            <div className="col-sm-7">
                                <div className="footer-social">
                                    <span><i className="fa fa-phone"> +21 4444 3333</i></span>
                                    <Link className="nav-link" href={`${appUrl}/#`}>خانه</Link>
                                    <Link className="nav-link" href={`${appUrl}/#`}>راهنما</Link>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div id="scroll-Top">
                    <div className="return-to-top">
                        <i className="fa fa-angle-up " id="scroll-top" data-toggle="tooltip" data-placement="top" title=""
                            data-original-title="Back to Top" aria-hidden="true"></i>
                    </div>

                </div>

            </footer>
        </div>
    );
}
