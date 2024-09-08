
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
                            {/* <div className="col-lg-3 col-md-3 col-sm-12 mb-2"></div> */}
                            <div
                                dangerouslySetInnerHTML={{ __html: footer_title_1 }}
                                className="col-lg-9 col-md-9 col-sm-12 mb-2 mt-3 text-dark">
                            </div>
                            <div className="col-lg-2 col-md-2 col-sm-12 mb-2"></div>
                            <div className="col-lg-9 col-md-9 col-sm-12 mb-2 mt-3 text-success">
                               <strong> {_GL["footer.online_users"]}  {cntOnlines} </strong>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
