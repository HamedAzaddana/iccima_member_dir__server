import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

export default function SearchSection({ ws_s_route, ws_search_get_fv, sendDataToIndex }) {
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
            const response = await axios.post(`${ws_search_get_fv}`, {});
            setFilters(response.data.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    useEffect(() => {
        fetchDatafilters()
    }, []);
    const handleCloseSV = () => setShowAdvance(false);
    const handleShowSV = () => setShowAdvance(true);

    const [values, setValues] = useState(default_filters);
    const SubmitBtn = useRef(null);
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
    function handleSearch(e) {
        e.preventDefault();
        // console.log(values);
        // set loading on !

        handleCloseSV();
        axios.post(`${ws_s_route}`, values)
            .then(res => {
                sendDataToIndex(res.data);
                setValues(default_filters);
            });
    }

    return (
        <section className="hero-section d-flex justify-content-center align-items-center" id="section_1">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-12 mx-auto">
                        <h2 className="text-white text-center">دایرکتوری اعضای اتاق بازرگانی، صنایع، معادن و کشاورزی ایران</h2>
                        <center>
                            <Button variant="dark" onClick={handleShowSV}>
                                جستجو پیشرفته <i className='fa fa-cogs'></i>
                            </Button>

                            <Modal size="lg" show={showAdvance} onHide={handleCloseSV}>
                                <Modal.Header closeButton>
                                    <Modal.Title>جستجوی پیشرفته</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6 col-sm-12">
                                            <label className='m-1 p-1'> نوع شخص : </label>
                                            <Form.Select onChange={handleChangeVs} defaultValue="null" id="person_type">
                                                <option value={"null"} disabled> انتخاب کنید ...</option>
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
                                        <br />
                                        <div className="col-lg-6 col-md-6 col-sm-12 mt-4">
                                            <Form.Group className="mb-3">
                                                <Form.Label>نام : </Form.Label>
                                                <Form.Control value={values.first_name} onChange={handleChangeVs} id="first_name" type="text" placeholder="" />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label>نام شرکت : </Form.Label>
                                                <Form.Control value={values.corp_name} onChange={handleChangeVs} id="corp_name" type="text" placeholder="" />
                                            </Form.Group>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-12 mt-4">
                                            <Form.Group className="mb-3">
                                                <Form.Label>نام خانوادگی : </Form.Label>
                                                <Form.Control value={values.last_name} onChange={handleChangeVs} id="last_name" type="text" placeholder="" />
                                            </Form.Group>
                                        </div>
                                        <br />
                                        <div className="col-lg-6 col-md-6 col-sm-12 mt-4">
                                            <label className='m-1 p-1'> استان : </label>
                                            <Form.Select onChange={handleChangeVs} defaultValue="null" id="province">
                                                <option value={"null"} disabled> انتخاب کنید ...</option>
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
                                        <div className="col-lg-6 col-md-6 col-sm-12 mt-4">
                                            <label className='m-1 p-1'> رتبه : </label>
                                            <Form.Select onChange={handleChangeVs} defaultValue="null" id="rank">
                                                <option value={"null"} disabled> انتخاب کنید ...</option>
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
                                        <br />
                                        <div className="col-lg-6 col-md-6 col-sm-12 mt-4">
                                            <Form.Group className="mb-3">
                                                <Form.Label>نام کالا : </Form.Label>
                                                <Form.Control value={values.product_name} onChange={handleChangeVs} id="product_name" type="text" placeholder="" />
                                            </Form.Group>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-12 mt-4">
                                            <Form.Group className="mb-3">
                                                <Form.Label>کد HS : </Form.Label>
                                                <Form.Control value={values.hs_code} onChange={handleChangeVs} id="hs_code" type="text" placeholder="" />
                                            </Form.Group>
                                        </div>
                                        <br />
                                        <div className="col-lg-6 col-md-6 col-sm-12 mt-4">
                                            <label className='p-1 m-1'>نوع فعالیت : </label>
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
                                        <br />
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
                        </center>
                        <form onSubmit={handleSearch} className="mt-4 pt-2 mb-lg-0 mb-5">
                            <div className="input-group input-group-lg">
                                <span className="input-group-text bi-search" id="basic-addon1">
                                </span>
                                <input type="search" className="form-control" id="kws"
                                    placeholder="کلمه کلیدی + Enter" aria-label="Search"
                                    value={values.kws} onChange={handleChangeVs}
                                />
                                <button ref={SubmitBtn} type="submit" className="form-control btn btn-success"> جستجو <i className='fa fa-search'></i></button>

                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </section >
    );
}