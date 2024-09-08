
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from '@inertiajs/react'
import { usePage } from '@inertiajs/react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import toast, { Toaster } from 'react-hot-toast';

export default function TopArea() {
    const ws_username = import.meta.env.VITE_AUTH_WS_USERNAME || '';
    const ws_password = import.meta.env.VITE_AUTH_WS_PASSWORD || '';
    const { iccima, _GL } = usePage().props;
    const appUrl = import.meta.env.VITE_APP_URL || 'http://127.0.0.1:8000';
    const loginSsoUrl = import.meta.env.VITE_LOGIN_URL_SSO || 'http://127.0.0.1:8000/loginSso';
    const [showOfCanv, setShowOfCanc] = useState(false);
    const [placementOfCanc, setPlacementOfCanc] = useState("end");
    const handleSelectLang = (e) => {
        let _post_data = {
            lang: e.target.value
        };
        document.getElementById('loading-page-iccima').style.display = "inline-flex";

        axios.post(`${iccima.links.ch_lang}`, _post_data, {
            headers: {
                'ICCIMA-AUTH-USERNAME': `${ws_username}`,
                'ICCIMA-AUTH-PASSWORD': `${ws_password}`,
            }
        })
            .then(res => {
                document.getElementById('loading-page-iccima').style.display = "none";
                let status_code = res?.status;
                if (status_code == 200 || status_code == 201) {
                    var queryParams = new URLSearchParams(window.location.search);
                    queryParams.set("lang", _post_data['lang']);
                    history.replaceState(null, null, "?" + queryParams.toString());
                    window.location.reload();
                } else {
                    toast.error(`${_GL['toast.error']}`);
                }
            })
            .catch((err) => {
                document.getElementById('loading-page-iccima').style.display = "none";
                let errors = err?.response?.data?.data;
                if (Array.isArray(errors) && errors) {
                    errors.forEach((error_item) => {
                        toast.error(`${error_item}`);
                    });
                } else {
                    toast.error(`${err.message} : ${err?.response?.data?.data?.msg}`);
                }
            });
    }
    const handleNonDo = (e) => {
        e.preventDefault();
    }
    const handleCloseOfCanv = (e) => {
        setShowOfCanc(false);
    }
    const handleShowOfCanv = (e) => {
        e.preventDefault();
        setShowOfCanc(true);
    }
    useEffect(() => {
        if (iccima.user.lang == "English") {
            setPlacementOfCanc("start");
        }
    }, []);
    return (
        <div>
            <section className="top-area">
                <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
                    <Container>
                        <Link href={`${appUrl}`}>
                            <Navbar.Brand>
                                <img style={{
                                    width: "60px",
                                    height: "60px",
                                    borderRadius: "20%",
                                    filter: "contrast(180%)",
                                }} src="/images/iccima_iran.png" alt="" />
                            </Navbar.Brand>
                        </Link>
                        <span className='navbar-title-site'>{_GL["nav.brand_long"]}</span>
                        <span className='navbar-title-site-mobile'>{_GL["nav.brand_short"]}</span>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto top_nav_app">
                                {
                                    (
                                        iccima.user.__id && iccima.user.type == "admin" ?
                                            (
                                                <>
                                                    <Link className="nav-link" style={{
                                                        color: "rgb(155, 25, 25)"
                                                    }} onClick={handleShowOfCanv} href="#"> <i className='fa fa-database'></i> {_GL["nav.admin"]}</Link>
                                                    <Offcanvas show={showOfCanv} onHide={handleCloseOfCanv}
                                                        backdrop={true}
                                                        placement={placementOfCanc}
                                                    >
                                                        <Offcanvas.Header closeButton>
                                                            <img className='img-offcanvas-site' src="" alt="" />
                                                            <Offcanvas.Title className='text-primary'>{_GL['nav.admin.ofc.title']}
                                                            </Offcanvas.Title>
                                                        </Offcanvas.Header>
                                                        <Offcanvas.Body>
                                                            <Link className="nav-link " href={`${iccima.adminPanel.dashboard}`}> <i className='fa fa-tachometer'></i> {_GL["nav.admin.ofc.dashboard"]}</Link>
                                                            <Link className="nav-link" href={`${iccima.adminPanel.forms}`}> <i className='fa fa-address-card'></i> {_GL["nav.admin.ofc.forms_confirm"]}</Link>

                                                        </Offcanvas.Body>
                                                    </Offcanvas>
                                                </>
                                            )
                                            :
                                            ("")
                                    )
                                }
                                <Link className="nav-link" href={`${appUrl}`}> <i className='fa fa-home'></i> {_GL["nav.home"]}</Link>
                                <Link className="nav-link" href={`${appUrl}/#`}> <i className='fa fa-info-circle'></i> {_GL["nav.hint"]}</Link>
                                {
                                    (
                                        iccima.user.__id ? (
                                            (iccima.user.type == "merchant") ?
                                                (
                                                    <>
                                                        <Link className="nav-link" style={{
                                                            color: "rgb(155, 25, 25)"
                                                        }} href={iccima.user.spl}> <i className='fa fa-user-circle-o'></i>  {_GL["nav.profile"]}</Link>
                                                        <Link className="nav-link" href={iccima.links.logout}> <i className='fa fa-sign-out'></i> {_GL["nav.logout"]}</Link>
                                                    </>
                                                ) :
                                                (
                                                    <></>
                                                )
                                        ) : (<>
                                            <a className="nav-link" href={loginSsoUrl}> <i className="fa fa-user-circle-o"></i> {_GL["nav.login"]} </a>
                                        </>)
                                    )

                                }


                                <Link className="nav-link" href="#" onClick={handleNonDo}> <li className="select-opt text-dark">
                                    <i className='fa fa-language'></i> <select value={iccima.user.lang} onInput={handleSelectLang} name="language" id="language">
                                        <option value="Persian">فارسی</option>
                                        <option value="English">English</option>
                                    </select>
                                </li>
                                </Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </section>
            <Toaster
                position="top-left"
                reverseOrder={true}
            />
        </div>
    );
}
