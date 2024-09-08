
import { useState, useRef, useEffect } from 'react';

import axios from 'axios';
import Form from 'react-bootstrap/Form';
import toast, { Toaster } from 'react-hot-toast';
import { usePage } from '@inertiajs/react'

export default function WelcomHero({ ws_s_route, ws_search_get_fv, sendDataToIndex }) {
    const { iccima, _GL } = usePage().props;
    const ws_username = import.meta.env.VITE_AUTH_WS_USERNAME || '';
    const ws_password = import.meta.env.VITE_AUTH_WS_PASSWORD || '';
    const [filters, setFilters] = useState([]);
    let default_filters = {
        kws: "",
        province: "",
        group_act_type: "",
    };
    const [values, setValues] = useState(default_filters);
    const SubmitBtn = useRef(null);


    const fetchDatafilters = async () => {
        try {
            const response = await axios.post(`${ws_search_get_fv}`, {}, {
                headers: {
                    'ICCIMA-AUTH-USERNAME': `${ws_username}`,
                    'ICCIMA-AUTH-PASSWORD': `${ws_password}`,
                }
            });
            setFilters(response.data.data);
        } catch (error) {
            document.getElementById('loading-page-iccima').style.display = "none";
            toast.error(`Error fetching data : ${error.message}`);
            console.log(error)
        }
    };
    const getMoreRApi = (e) => {
        getDataPrepare(e, 1);
    }
    const getDataPrepare = (e, is_more = 0) => {
        let _post_data = values;
        if (is_more) {
            _post_data = {
                ..._post_data,
                more: 1
            }
        }
        e.preventDefault();
        console.log(_post_data);
        // set loading on !
        document.getElementById('loading-page-iccima').style.display = "inline-flex";
        axios.post(`${ws_s_route}`, _post_data, {
            headers: {
                'ICCIMA-AUTH-USERNAME': `${ws_username}`,
                'ICCIMA-AUTH-PASSWORD': `${ws_password}`,
            }
        })
            .then(res => {
                sendDataToIndex(res.data, is_more);
            })
            .catch((err) => {
                document.getElementById('loading-page-iccima').style.display = "none";
                toast.error(`${err.message}`);
            });
    }
    const handleSearch = (e) => {
        getDataPrepare(e);
    }
    const handleClickTopicV = (e) => {
        let fiv = e?.currentTarget?.getAttribute('fiv')?.toString();
        document.querySelector(`.single-list-topics-content .form-switch input.${fiv}`)?.click();
    }
    const handleKeyType = (e) => {
        if (e.key === 'Enter') {
            setTimeout(function () {
                document.getElementById('btn-do-search').click();
            }, 500);
        }
    }
    const handleChangeVs = (e) => {
        const key = e.target.id;
        const value = e.target.value;
        // console.log(key,value,e.target);
        setValues(values => ({
            ...values,
            [key]: value,
        }))
    }
    const handleChangeVsReactive = (e) => {
        const key = e.target.id;
        const value = e.target.value;
        // console.log(key,value,e.target);
        setValues(values => ({
            ...values,
            [key]: value,
        }))
        setTimeout(function () {
            document.getElementById('btn-do-search').click();
        }, 500);
    }
    const focusInputS1 = (e) => {
        document.getElementById("kws").focus();
    }
    useEffect(() => {
        fetchDatafilters();
    }, []);
    return (
        <div>
            <section id="home" className="welcome-hero">
                <button onClick={getMoreRApi} id='getMoreApiBtn' className='d-none'></button>
                <div className="container">
                    <div className="welcome-hero-txt">
                        <h2> {_GL["welocom.tip"]} </h2>
                        <p>
                            {_GL["welocom.title"]}
                        </p>
                    </div>
                    <div className="welcome-hero-serch-box row">
                        <div className="col-md-4 col-lg-3 col-sm-12 InputS1" onClick={focusInputS1}>
                            <div className="single-welcome-hero-form">
                                <input
                                    id="kws"
                                    className='text-dark'
                                    value={values.kws} onChange={handleChangeVs}
                                    onKeyDown={handleKeyType}
                                    type="text" placeholder={_GL["welocom.plchldrInput"]} />

                                <div className="welcome-hero-form-icon">
                                    <i className="flaticon-list-with-dots"></i>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-lg-3 col-sm-12 mt-4 InputS2">
                            <div style={{
                                width: "100%",
                                border: 0,

                            }} className="single-welcome-hero-form">
                                <Form.Select className='without-icon SelectProvince' onChange={handleChangeVs} defaultValue="null" id="province">
                                    <option value={"all"}> {_GL["welocom.plchldrProvince"]} </option>
                                    {(filters?.provinces?.length) ?
                                        (
                                            <>
                                                {filters?.provinces?.map((item, item_index) => (
                                                    <option key={item_index} value={item.value}>{item.label}</option>
                                                ))}
                                            </>
                                        )
                                        :
                                        (
                                            <></>
                                        )
                                    }
                                </Form.Select>
                                <div className="welcome-hero-form-icon" style={{
                                    right: '42px',
                                }}>
                                    <i className="flaticon-gps-fixed-indicator"></i>
                                </div>
                            </div>

                        </div>
                        <div className="col-md-4 col-lg-3 col-sm-12 mt-4 InputS2">
                            <div style={{
                                width: "100%",
                                border: 0,
                            }} className="single-welcome-hero-form">
                                <Form.Select className='without-icon SelectProvince' onChange={handleChangeVs} defaultValue="null" id="activity_str">
                                    <option value={"all"}> {_GL["welocom.plchldrActivityStr"]} </option>
                                    {(filters?.activity_str_search?.length) ?
                                        (
                                            <>
                                                {filters?.activity_str_search?.map((item, item_index) => (
                                                    <option key={item_index} value={item.value}>{item.label}</option>
                                                ))}
                                            </>
                                        )
                                        :
                                        (
                                            <></>
                                        )
                                    }
                                </Form.Select>
                                <div className="welcome-hero-form-icon" style={{
                                    right: '42px',
                                }}>
                                    <i className="fa fa-quote-right"></i>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-1 col-lg-1 col-sm-12 mt-4 InputS3">
                            <center>
                                <button onClick={handleSearch} id='btn-do-search' ref={SubmitBtn} type="submit" className="form-control btn btn-danger mb-4"> {_GL["welocom.btnSearch"]} <i className='fa fa-search'></i></button>
                            </center>
                        </div>
                    </div>
                </div>
            </section>
            <section id="list-topics" className="list-topics">
                <div>
                    <div className="list-topics-content">
                        <ul>
                            <li>
                                <div className="single-list-topics-content" fiv="group_act_type_v1"
                                    onClick={handleClickTopicV}>
                                    <div className="single-list-topics-icon">
                                        <i className="fa fa-cogs"></i>
                                    </div>
                                    <h2>{_GL["welocom.boxIndustry"]}</h2>
                                    <div className="form-check form-switch">
                                        <input className="form-check-input group_act_type_v1" type="radio"
                                            id="group_act_type"
                                            name="group_act_type"
                                            value={_GL["welocom.boxIndustry"]}
                                            onChange={handleChangeVsReactive}
                                        />
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="single-list-topics-content" fiv="group_act_type_v2"
                                    onClick={handleClickTopicV}>
                                    <div className="single-list-topics-icon">
                                        <i className="fa fa-address-card"></i>
                                    </div>
                                    <h2>{_GL["welocom.boxCommerce"]}</h2>
                                    <div className="form-check form-switch">
                                        <input className="form-check-input group_act_type_v2" type="radio"
                                            id="group_act_type"
                                            value={_GL["welocom.boxCommerce"]}
                                            name="group_act_type"
                                            onChange={handleChangeVsReactive}
                                        />
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="single-list-topics-content" fiv="group_act_type_v3"
                                    onClick={handleClickTopicV}>
                                    <div className="single-list-topics-icon">
                                        <i className="fa fa-leaf"></i>
                                    </div>
                                    <h2>{_GL["welocom.boxAgri"]}</h2>
                                    <div className="form-check form-switch">
                                        <input className="form-check-input group_act_type_v3" type="radio"
                                            id="group_act_type"
                                            value={_GL["welocom.boxAgri"]}
                                            name="group_act_type"
                                            onChange={handleChangeVsReactive}
                                        />
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="single-list-topics-content" fiv="group_act_type_v4"
                                    onClick={handleClickTopicV}>
                                    <div className="single-list-topics-icon">
                                        <i className="fa fa-diamond"></i>
                                    </div>
                                    <h2>{_GL["welocom.boxMine"]}</h2>
                                    <div className="form-check form-switch">
                                        <input className="form-check-input group_act_type_v4" type="radio"
                                            id="group_act_type"
                                            value={_GL["welocom.boxMine"]}
                                            name="group_act_type"
                                            onChange={handleChangeVsReactive}
                                        />
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
            <div>
                <Toaster
                    position="top-left"
                    reverseOrder={true}
                />
            </div>
        </div>
    );
}
