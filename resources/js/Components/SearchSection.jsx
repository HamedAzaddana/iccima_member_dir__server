import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import toast, { Toaster } from 'react-hot-toast';

export default function SearchSection({ ws_s_route, ws_search_get_fv, sendDataToIndex }) {
    const ws_username = import.meta.env.VITE_AUTH_WS_USERNAME || '';
    const ws_password = import.meta.env.VITE_AUTH_WS_PASSWORD || '';
    let default_filters = {
        kws: "",
        person_type: "",
        first_name: "",
        last_name: "",
        corp_name: "",
        province: "",
        rank: "",
        product_name: "",
        hs_code: "",
        activity_type: [],
    };
    const [showAdvance, setShowAdvance] = useState(false);
    const [filters, setFilters] = useState([]);
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
    useEffect(() => {
        fetchDatafilters()
    }, []);
    const handleCloseSV = () => setShowAdvance(false);
    const handleShowSV = () => setShowAdvance(true);

    const [values, setValues] = useState(default_filters);
    const SubmitBtn = useRef(null);
    function getMoreRApi(e) {
        getDataPrepare(e, 1);
    }
    function handleChangeVs(e) {
        const key = e.target.id;
        const value = e.target.value;
        // console.log(key)
        // console.log(value)
        setValues(values => ({
            ...values,
            [key]: value,
        }))
    }
    function handleCheckVs(e) {
        const { activity_type } = values;
        const { value, checked } = e.target;
        // console.log(`${value} is ${checked}`);
        if (checked) {
            setValues({
                ...values,
                activity_type: [...activity_type, value],
            });
        } else {
            setValues({
                ...values,
                activity_type: activity_type.filter(
                    (v) => (
                        v !== value
                    )
                )
            });
        }

    }
    function getDataPrepare(e, is_more = 0) {
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
        handleCloseSV();
        axios.post(`${ws_s_route}`, _post_data, {
            headers: {
                'ICCIMA-AUTH-USERNAME': `${ws_username}`,
                'ICCIMA-AUTH-PASSWORD': `${ws_password}`,
            }
        })
            .then(res => {
                sendDataToIndex(res.data);
                // setValues(default_filters);
            })
            .catch((err) => {
                document.getElementById('loading-page-iccima').style.display = "none";
                toast.error(`${err.message}`);
            });
    }
    function handleSearch(e) {
        getDataPrepare(e);
    }
    return (
        <section style={
            {
                paddingTop: '0',
            }
        } className="hero-section d-flex justify-content-center align-items-center" id="section_1">
            <button onClick={getMoreRApi} id='getMoreApiBtn' className='d-none'></button>
            <form style={{
                width: "100%"
            }} onSubmit={handleSearch} className="mt-4 pt-2 mb-lg-0 mb-5">
                <div className='p-3'>
                    <div className="row">
                        <div className="col-md-3 col-lg-3 col-sm-12">
                            <div className="input-group input-group-lg">
                                <span className="input-group-text bi-search">
                                </span>
                                <input type="search" className="form-control" id="kws"
                                    placeholder="کلمه کلیدی + Enter" aria-label="Search"
                                    value={values.kws} onChange={handleChangeVs}
                                />

                            </div>
                        </div>
                        <div className="col-md-3 col-lg-3 col-sm-12 low-level-filter">
                            <div className="input-group input-group-lg">
                                <span className="input-group-text bi-globe">
                                </span>
                                <Form.Select style={{
                                    height: '100%',
                                    borderRadius: '30px',
                                    cursor: 'pointer',
                                }} onChange={handleChangeVs} defaultValue="null" id="province">
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
                            </div>
                        </div>
                        <div className="col-md-3 col-lg-3 col-sm-12 low-level-filter">
                            <div className="input-group input-group-lg">
                                <span className="input-group-text bi-universal-access">
                                </span>
                                <Form.Select style={{
                                    height: '100%',
                                    borderRadius: '30px',
                                    cursor: 'pointer',
                                }} onChange={handleChangeVs} defaultValue="null" id="rank">
                                    <option value={"all"}> همه رتبه ها </option>
                                    {(filters?.ranks?.length) ?
                                        (
                                            <>
                                                {filters?.ranks?.map((item, item_index) => (
                                                    <option style={
                                                        {
                                                            fontFamily: "iran_sans"
                                                        }
                                                    } key={item_index} value={item.value}>{item.label}</option>
                                                ))}
                                            </>
                                        )
                                        :
                                        (
                                            <></>
                                        )
                                    }
                                </Form.Select>
                            </div>
                        </div>

                        <div className="col-md-3 col-lg-3 col-sm-12">
                            <button id='btn-do-search' ref={SubmitBtn} type="submit" className="form-control btn btn-success"> جستجو <i className='fa fa-search'></i></button>
                        </div>
                        <div className="col-md-3 col-lg-3 col-sm-12 mt-3">
                            <Button id='btn-adv-search' type="button" variant="dark" onClick={handleShowSV} className="form-control btn btn-success">
                                جستجو پیشرفته <i className='fa fa-cogs'></i>
                            </Button>
                            <Modal centered size="lg" show={showAdvance} onHide={handleCloseSV}>
                                <Modal.Header closeButton>
                                    <Modal.Title>جستجوی پیشرفته</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6 col-sm-12">
                                            <label className='m-1 p-1'> <i className='fa fa-address-card'></i> نوع شخص : </label>
                                            <Form.Select onChange={handleChangeVs} defaultValue="null" id="person_type">
                                                <option value={"all"}> همه نوع </option>
                                                {(filters?.person_types?.length) ?
                                                    (
                                                        <>
                                                            {filters?.person_types?.map((item, item_index) => (
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
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-12"></div>

                                        <div className="col-lg-6 col-md-6 col-sm-12 mt-4">
                                            <Form.Group className="mb-3">
                                                <Form.Label> <i className='fa fa-user'></i> نام : </Form.Label>
                                                <Form.Control value={values.first_name} onChange={handleChangeVs} id="first_name" type="text" placeholder="" />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label> <i className='fa fa-university'></i>  نام شرکت : </Form.Label>
                                                <Form.Control value={values.corp_name} onChange={handleChangeVs} id="corp_name" type="text" placeholder="" />
                                            </Form.Group>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-12 mt-4">
                                            <Form.Group className="mb-3">
                                                <Form.Label> <i className='fa fa-user-circle'></i> نام خانوادگی : </Form.Label>
                                                <Form.Control value={values.last_name} onChange={handleChangeVs} id="last_name" type="text" placeholder="" />
                                            </Form.Group>
                                        </div>

                                        <div className="col-lg-6 col-md-6 col-sm-12 mt-4 low-level-filter-modal">
                                            <label className='m-1 p-1'> <i className='fa fa-globe'></i> استان : </label>
                                            <Form.Select onChange={handleChangeVs} defaultValue="null" id="province">
                                                <option value={"all"}> همه استان ها</option>
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
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-12 mt-4 low-level-filter-modal">
                                            <label className='m-1 p-1'> <i className='fa fa-universal-access'></i> رتبه : </label>
                                            <Form.Select onChange={handleChangeVs} defaultValue="null" id="rank">
                                                <option value={"all"}> همه رتبه ها</option>
                                                {(filters?.ranks?.length) ?
                                                    (
                                                        <>
                                                            {filters?.ranks?.map((item, item_index) => (
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
                                        </div>

                                        <div className="col-lg-6 col-md-6 col-sm-12 mt-4">
                                            <Form.Group className="mb-3">
                                                <Form.Label> <i className='fa fa-area-chart'></i> نام کالا : </Form.Label>
                                                <Form.Control value={values.product_name} onChange={handleChangeVs} id="product_name" type="text" placeholder="" />
                                            </Form.Group>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-12 mt-4">
                                            <Form.Group className="mb-3">
                                                <Form.Label> <i className='fa fa-barcode'></i> کد HS : </Form.Label>
                                                <Form.Control value={values.hs_code} onChange={handleChangeVs} id="hs_code" type="text" placeholder="" />
                                            </Form.Group>
                                        </div>

                                        <div className="col-lg-6 col-md-6 col-sm-12 mt-4">
                                            <label className='p-1 m-1'> <i className='fa fa-shopping-basket'></i> نوع فعالیت : </label>
                                            {(filters?.activity_types?.length) ?
                                                (
                                                    <>
                                                        {filters?.activity_types?.map((item, item_index) => (
                                                            <Form.Check
                                                                onChange={handleCheckVs}
                                                                key={item_index}
                                                                type="checkbox"
                                                                id={`activity_type-opt`}
                                                                name="activity_type"
                                                                label={item.label}
                                                                value={item.value}
                                                                reverse
                                                            />
                                                        ))}
                                                    </>
                                                )
                                                :
                                                (
                                                    <></>
                                                )
                                            }

                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-12 mt-4"></div>

                                    </div>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleCloseSV}>
                                        بستن <i className='fa fa-times'></i>
                                    </Button>
                                    <Button variant="primary" onClick={handleSearch}>
                                        اعمال فیلتر <i className='fa fa-search-plus'></i>
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    </div>
                </div>
            </form>
            <div><Toaster
                position="top-left"
                reverseOrder={true}
            /></div>

        </section >
    );
}