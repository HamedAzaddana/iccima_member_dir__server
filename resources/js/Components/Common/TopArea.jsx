
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from '@inertiajs/react'
import { usePage } from '@inertiajs/react'

export default function TopArea() {
    const { iccima } = usePage().props
    const appUrl = import.meta.env.VITE_APP_URL || 'http://127.0.0.1:8000';
    const loginSsoUrl = import.meta.env.VITE_LOGIN_URL_SSO || 'http://127.0.0.1:8000/loginSso';
    const logoutUrl = import.meta.env.VITE_LOGIN_URL_SSO || 'http://127.0.0.1:8000/loginSso';

    const handleNonDo = (e) => {
        e.preventDefault();
    }
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
                        <span className='navbar-title-site'>دایرکتوری اعضای اتاق بازرگانی، صنایع، معادن و کشاورزی ایران</span>
                        <span className='navbar-title-site-mobile'>دایرکتوری اعضای اتاق بازرگانی</span>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto top_nav_app">
                                <Link className="nav-link" href={`${appUrl}`}> <i className='fa fa-home'></i> خانه</Link>
                                <Link className="nav-link" href={`${appUrl}/#`}> <i className='fa fa-info-circle'></i> راهنما</Link>
                                {
                                    iccima.user.__id ?
                                        (
                                            <>
                                                <Link className="nav-link" href="#"> <i className='fa fa-user-circle-o'></i> پروفایل</Link>
                                                <Link className="nav-link" href={iccima.links.logout}> <i className='fa fa-sign-out'></i> خروج</Link>
                                            </>
                                        ) :
                                        (
                                            <a className="nav-link" href={loginSsoUrl}> <i className="fa fa-user-circle-o"></i> ورود </a>
                                        )
                                }


                                <Link className="nav-link" href="#" onClick={handleNonDo}> <li className="select-opt text-dark">
                                    <select name="language" id="language">
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
        </div>
    );
}
