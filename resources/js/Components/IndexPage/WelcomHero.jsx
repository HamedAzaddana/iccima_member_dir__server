
import { useState, useRef, useEffect } from 'react';

import axios from 'axios';
import Form from 'react-bootstrap/Form';
import toast, { Toaster } from 'react-hot-toast';
import { event } from 'jquery';

export default function WelcomHero({ ws_s_route, ws_search_get_fv, sendDataToIndex }) {
    const ws_username = import.meta.env.VITE_AUTH_WS_USERNAME || '';
    const ws_password = import.meta.env.VITE_AUTH_WS_PASSWORD || '';
    const SubmitBtn = useRef(null);
    let default_filters = {
        kws: "",
        province: "",
        group_act_type: "",
    };
    const [filters, setFilters] = useState([]);
    const [values, setValues] = useState(default_filters);
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
    const handleClickTopicV = (e)=>{
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
                        <h2>به سادگی یک کلیک، با اعضای اتاق ایران آشنا شوید. </h2>
                        <p>
                            بستر ارتباط آنلاین دارندگان کارت های عضویت و بازرگانی
                        </p>
                    </div>
                    <div className="welcome-hero-serch-box row">
                        <div className="col-md-6 col-lg-6 col-sm-12 InputS1" onClick={focusInputS1}>
                            <div style={{
                                width: "100%",
                                border: 0
                            }} className="single-welcome-hero-form">
                                <input style={{
                                    position: "relative",
                                    right: "30px",
                                }}
                                    id="kws"
                                    className='text-dark'
                                    value={values.kws} onChange={handleChangeVs}
                                    onKeyDown={handleKeyType}
                                    type="text" placeholder="نام،رشته فعالیت، نام کالا ..." />

                                <div className="welcome-hero-form-icon">
                                    <i className="flaticon-list-with-dots"></i>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 col-sm-12 mt-4 InputS2">
                            <div style={{
                                width: "100%",
                                border: 0,

                            }} className="single-welcome-hero-form">
                                <Form.Select className='without-icon SelectProvince' onChange={handleChangeVs} defaultValue="null" id="province">
                                    <option value={"all"}> همه استان ها  </option>
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
                        <div className="col-md-2 col-lg-2 col-sm-12 mt-4 InputS3">
                            <button onClick={handleSearch} id='btn-do-search' ref={SubmitBtn} type="submit" className="form-control btn btn-danger mb-4"> جستجو <i className='fa fa-search'></i></button>
                        </div>
                    </div>
                </div>
            </section>
            <section id="list-topics" className="list-topics">
                <div className="container">
                    <div className="list-topics-content">
                        <ul>
                            <li>
                                <div className="single-list-topics-content" fiv="group_act_type_v1" 
                                 onClick={handleClickTopicV}>
                                    <div className="single-list-topics-icon">
                                        <i className="fa fa-cogs"></i>
                                    </div>
                                    <h2>صنعت</h2>
                                    <div className="form-check form-switch">
                                        <input className="form-check-input group_act_type_v1" type="radio"
                                            id="group_act_type"
                                            name="group_act_type"
                                            value="صنعت"
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
                                    <h2>بازرگانی</h2>
                                    <div className="form-check form-switch">
                                        <input className="form-check-input group_act_type_v2" type="radio"
                                            id="group_act_type"
                                            value="بازرگانی"
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
                                    <h2>کشاورزی</h2>
                                    <div className="form-check form-switch">
                                        <input className="form-check-input group_act_type_v3" type="radio"
                                            id="group_act_type"
                                            value="کشاورزی"
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
                                    <h2>معدن</h2>
                                    <div className="form-check form-switch">
                                        <input className="form-check-input group_act_type_v4" type="radio"
                                            id="group_act_type"
                                            value="معدن"
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
