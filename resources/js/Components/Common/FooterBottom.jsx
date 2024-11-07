
import { Link } from '@inertiajs/react'
import { usePage } from '@inertiajs/react'

export default function FooterBottom({ cntOnlines }) {
    const appUrl = import.meta.env.VITE_APP_URL || 'http://127.0.0.1:8000';
    const { iccima, _GL } = usePage().props;
    let footer_title_1 = _GL["footer.title_1"];
    return (
        <div>
            <footer id="iccima-footer" className="footer">
                <div className="m-1 p-1">
                    <div className="footer-menu">
                        <div className="row">
                            <div className="footer-menu-logo col-lg-1 col-md-1 col-sm-12 mb-2">
                                <div className="navbar-header">
                                    <center>
                                        <img style={{
                                            width: "65px",
                                            height: "65px",
                                            borderRadius: "20%",
                                            filter: "contrast(180%)",
                                        }} src="/images/iccima_iran.png" alt="" />
                                    </center>
                                </div>
                            </div>
                            <div
                                dangerouslySetInnerHTML={{ __html: footer_title_1 }}
                                className="footer-menu-text-1 col-lg-7 col-md-7 col-sm-12 mt-4  text-dark">
                            </div>
                            <div className="col-lg-2 col-md-2 col-sm-12 text-success d-none">
                                <strong> {_GL["footer.online_users"]}  {cntOnlines} </strong>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
