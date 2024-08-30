
import CardResult from "./CardResult";
import { usePage } from '@inertiajs/react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export default function ExploreArea({ dataSearch, req_params }) {
    const { iccima, _GL } = usePage().props;
    const ws_username = import.meta.env.VITE_AUTH_WS_USERNAME || '';
    const ws_password = import.meta.env.VITE_AUTH_WS_PASSWORD || '';
    const [showCaptcha, setShowCaptcha] = useState(false);

    const handleCloseCaptcha = (e) => setShowCaptcha(false);
    const handleShowCaptcha = (e) => {
        handleMakeCaptcha(e);
        setShowCaptcha(true);
    }

    const handleClickMore = (e) => {
        document.getElementById('getMoreApiBtn').click();
    }
    const handleValidateCaptcha = (e) => {
        let continue_code = document.getElementById('field-captcha-text').value;
        let _post_data = {
            continue_code
        };
        axios.post(`${iccima.links.validate_captcha}`, _post_data, {
            headers: {
                'ICCIMA-AUTH-USERNAME': `${ws_username}`,
                'ICCIMA-AUTH-PASSWORD': `${ws_password}`,
            }
        })
            .then(res => {
                console.log(res)
                let status_code = res?.status;
                if ((status_code == 200 || status_code == 201)) {
                    handleClickMore(e); 
                    handleCloseCaptcha(e);
                } else {
                    handleMakeCaptcha(e);
                    toast.error(`${_GL['toast.error']}`);
                }
            })
            .catch((err) => {
                console.log(err)
                let errors = err?.response?.data?.data;
                if (Array.isArray(errors) && errors) {
                    errors.forEach((error_item) => {
                        toast.error(`${error_item}`);
                    });
                } else {
                    toast.error(`${err?.response?.data?.data?.msg}`);
                }
                handleMakeCaptcha(e);
            });

    }
    const handleMakeCaptcha = (e) => {
        axios.post(`${iccima.links.get_captcha}`, {}, {
            headers: {
                'ICCIMA-AUTH-USERNAME': `${ws_username}`,
                'ICCIMA-AUTH-PASSWORD': `${ws_password}`,
            }
        })
            .then(res => {
                // console.log(res)
                let status_code = res?.status;
                if ((status_code == 200 || status_code == 201) && res?.data?.captcha) {
                    document.getElementById('captcha-img-iccima').src = res?.data?.captcha;
                    document.getElementById('field-captcha-text').focus();
                    document.getElementById('captcha-img-iccima').style.display = "block";

                } else {
                    toast.error(`${_GL['toast.error']}`);
                }
            })
            .catch((err) => {
                // console.log(err)
                let errors = err?.response?.data?.data;
                if (Array.isArray(errors) && errors) {
                    errors.forEach((error_item) => {
                        toast.error(`${error_item}`);
                    });
                } else {
                    toast.error(`${err?.response?.data?.data?.msg}`);
                }
            });
    }
    return (
        <div id="explore" className={(!dataSearch?.length) ? 'explore-parent-div':''}>
            <section className="explore">
                <div className="container">
                    <div className="explore-content">
                        {
                            req_params ?
                                (<div>
                                    <div className="section-header">
                                        <h2> {_GL['explore.listResults']} <span className="badge bg-finance rounded-pill ms-auto">{dataSearch.length}</span></h2>
                                    </div>
                                    {(dataSearch.length) ?
                                        (
                                            <div className="row">

                                                {dataSearch.map((info, ik_loop) => (
                                                    <CardResult key={ik_loop} info={info} />
                                                ))}
                                                {
                                                    (req_params.show_more_btn ?
                                                        (<div className="mt-5 p-2">
                                                            <>

                                                                <center>
                                                                    <Button className="btn btn-warning MoreBtnCards" onClick={handleShowCaptcha}>
                                                                        {_GL['explore.moreResult']}
                                                                    </Button>
                                                                </center>
                                                                <div className="iccima-modal">
                                                                    <Modal dir={`${iccima.user.lang == 'Persian' ? 'rtl' : 'ltr'}`} show={showCaptcha} onHide={handleCloseCaptcha}>
                                                                        <Modal.Body>
                                                                            <p>
                                                                                {_GL['explore.captcha.label']}
                                                                            </p>
                                                                            <br />
                                                                            <center>
                                                                                <img id="captcha-img-iccima" src="" alt="" />
                                                                            </center>
                                                                            <br />
                                                                            <div className="row">
                                                                                <div className="col-lg-10 col-md-10 col-sm-10">
                                                                                    <input id="field-captcha-text" type="text" className="text-dark form-control" />
                                                                                </div>
                                                                                <div className="col-lg-2 col-md-2 col-sm-2">
                                                                                    <button onClick={handleMakeCaptcha} type="button" className="btn "><i className="fa fa-refresh"></i></button>
                                                                                </div>
                                                                            </div>
                                                                        </Modal.Body>
                                                                        <Modal.Footer>
                                                                            <Button variant="secondary" onClick={handleCloseCaptcha}>
                                                                            {_GL['explore.captcha.btnClose']}
                                                                            </Button>
                                                                            <Button onClick={handleValidateCaptcha} className="btn btn-success">
                                                                            {_GL['explore.captcha.btnSubmit']}
                                                                            </Button>
                                                                        </Modal.Footer>
                                                                    </Modal>
                                                                </div>
                                                            </>


                                                        </div>) :
                                                        ("")
                                                    )
                                                }

                                            </div>
                                        )
                                        :
                                        (<div>
                                            <div className="alert alert-dark" role="alert">
                                                {_GL['explore.noResults']}
                                            </div>
                                        </div>)
                                    }
                                </div>)
                                :
                                (<div>
                                    <div className="container">
                                        <div className="col-12 text-center">
                                            <h2 style={{
                                                fontSize: "35px"
                                            }} className="mb-4 text-secondary"></h2>
                                        </div>
                                    </div>
                                </div>)
                        }
                    </div>
                </div>
                <div>
                    <Toaster
                        position="top-left"
                        reverseOrder={true}
                    />
                </div>
            </section>
        </div>
    );
}
