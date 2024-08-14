
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
                </div>
            </footer>
        </div>
    );
}
