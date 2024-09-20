
import Button from 'react-bootstrap/cjs/Button.js';
import Offcanvas from 'react-bootstrap/cjs/Offcanvas.js';
import { Link } from '@inertiajs/react'
import { usePage } from '@inertiajs/react'
import { useState, useEffect } from 'react';

export default function MenuAdmin() {
    const { iccima, _GL } = usePage().props;
    const [showOfCanv, setShowOfCanc] = useState(false);
    const [placementOfCanc, setPlacementOfCanc] = useState("end");
    const handleCloseOfCanv = (e) => {
        setShowOfCanc(false);
    }
    const handleToggleShowSub = (e) => {
        let href_id = e.currentTarget.getAttribute("href");
        const subTarget = document.querySelector(href_id);
        subTarget.classList.toggle('show');
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
                                        <Offcanvas.Title className='text-primary fw-bolder'>{_GL['nav.admin.ofc.title']}
                                        </Offcanvas.Title>
                                    </Offcanvas.Header>
                                    <Offcanvas.Body className={`app-lang-${iccima.user.lang}`}>
                                        <div id="sidebar-plus-iccima-admin" className="border rounded">
                                            <div className="nav flex-column py-3">
                                                <Link className="nav-link " href={`${iccima.adminPanel.dashboard}`}> <i className='fa fa-tachometer'></i> {_GL["nav.admin.ofc.dashboard"]}</Link>
                                                <Link className="nav-link" href={`${iccima.adminPanel.forms}`}> <i className='fa fa-address-card'></i> {_GL["nav.admin.ofc.forms_confirm"]}</Link>
                                            </div>
                                        </div>

                                    </Offcanvas.Body>
                                </Offcanvas>
                            </>
                        )
                        :
                        ("")
                )
            }
        </div>
    );
}
