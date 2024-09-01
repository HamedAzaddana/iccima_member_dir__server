import { useState, useRef, useEffect } from 'react';
import { Head } from '@inertiajs/react'
import { usePage } from '@inertiajs/react'
import MainLayout from '@/Layouts/MainLayout';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { iterate_prepare_data, format_at_email_str } from '../Utils/IccObjArr';

export default function SingleMerchant({ slug, hid, route_ws_get_single, route_404_page, route_ws_saveVals, route_ws_delBrImg }) {
    const ws_username = import.meta.env.VITE_AUTH_WS_USERNAME || '';
    const ws_password = import.meta.env.VITE_AUTH_WS_PASSWORD || '';

    const [uploadedBrImg, setUploadedBrImg] = useState("");
    const [forms, setForms] = useState(null);
    const [dataSingle, setDataSingle] = useState([]);
    const { iccima, _GL } = usePage().props;
    const handleChangeVs = (e) => {
        const key = e.target.id;
        const value = e?.target?.value?.toString();
        // console.log(key,value)
        setForms(forms => ({
            ...forms,
            [key]: value,
        }))
    }
    const handleChangeFile = (e) => {
        const key = e.target.id;
        setForms(forms => ({
            ...forms,
            [key]: e.target?.files[0],
        }))
    }

    const handleDeleteBImg = (e) => {
        document.getElementById('loading-page-iccima').style.display = "inline-flex";

        axios.post(`${route_ws_delBrImg}`, {}, {
            headers: {
                'ICCIMA-AUTH-USERNAME': `${ws_username}`,
                'ICCIMA-AUTH-PASSWORD': `${ws_password}`,
                'ICCIMA-AUTH-USER-TOKEN': `${iccima.user.__token}`,
            }
        })
            .then(res => {
                // console.log(res)
                document.getElementById('loading-page-iccima').style.display = "none";
                let status_code = res?.status;
                if (status_code == 200 || status_code == 201) {
                    setUploadedBrImg("");
                    toast.success(`${_GL['toast.edited_success']}`);
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
    const handleIncView = () => {
        let _post_data = {
            hid
        };
        axios.post(`${iccima.links.inc_view}`, _post_data, {
            headers: {
                'ICCIMA-AUTH-USERNAME': `${ws_username}`,
                'ICCIMA-AUTH-PASSWORD': `${ws_password}`,
            }
        })
            .then(res => {

                let status_code = res?.status;
                if (status_code == 200 || status_code == 201) {
                    // success
                } else {
                    toast.error(`${_GL['toast.error']}`);
                }
            })
            .catch((err) => {

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
    const handleSubmitForm = (e) => {
        document.getElementById('loading-page-iccima').style.display = "inline-flex";
        let _post_data = forms;
        let formData = new FormData();
        if (_post_data) {
            for (const [key_obj, value_obj] of Object.entries(_post_data)) {
                formData.append(key_obj, value_obj);
            }
        }
        axios.post(`${route_ws_saveVals}`, formData, {
            headers: {
                'ICCIMA-AUTH-USERNAME': `${ws_username}`,
                'ICCIMA-AUTH-PASSWORD': `${ws_password}`,
                'ICCIMA-AUTH-USER-TOKEN': `${iccima.user.__token}`,
                'Content-Type': 'multipart/form-data',
            }
        })
            .then(res => {
                // console.log(res)
                document.getElementById('loading-page-iccima').style.display = "none";
                let status_code = res?.status;
                if (status_code == 200 || status_code == 201) {
                    if (res?.data?.data?.brand_image) {
                        setUploadedBrImg(res?.data?.data?.brand_image);
                    }
                    toast.success(`${_GL['toast.edited_success']}`);
                    fetchSingleData();
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
    const fetchSingleData = async () => {
        let _post_data = {
            hid
        };
        document.getElementById('loading-page-iccima').style.display = "inline-flex";
        try {
            const response = await axios.post(`${route_ws_get_single}`, _post_data, {
                headers: {
                    'ICCIMA-AUTH-USERNAME': `${ws_username}`,
                    'ICCIMA-AUTH-PASSWORD': `${ws_password}`,
                }
            });
            document.getElementById('loading-page-iccima').style.display = "none";
            setDataSingle(iterate_prepare_data(response.data.data));
            setForms(iterate_prepare_data(response.data.data.__forms));
            console.log(response.data.data)
            if (response?.data?.data?.__forms?.brand_image) {
                setUploadedBrImg(response?.data?.data?.__forms?.brand_image);
            }
        } catch (error) {
            document.getElementById('loading-page-iccima').style.display = "none";
            toast.error(`Error fetching single data : ${error.message}`);
            let status_code = error.response.status;
            if (status_code == 404) {
                window.location = route_404_page;
            }
            console.log(error)
        }
    };
    useEffect(() => {
        fetchSingleData();
        if (dataSingle?.show_in_index && dataSingle?.show_in_index == 1) {
            handleIncView();
        }
    }, []);
    useEffect(() => {
        if (dataSingle?.show_in_index && dataSingle?.show_in_index == 1) {
            handleIncView();
        }
    }, [dataSingle]);
    return (
        <MainLayout>
            <div>
                <Head title={dataSingle?.co_title ? (dataSingle.co_title)[iccima.user.lang.toString()] : "اطلاعات"} />

                {
                    <>
                        {
                            (dataSingle?.co_title) ?
                                (
                                    <div className='placeholder-single-content'>
                                        <div className="container">
                                            {
                                                (iccima.user.__id && iccima.user.__id == hid) || (iccima.user.__id && iccima.user.type == "admin" && slug == "viaAdminPanel") ?
                                                    (
                                                        <div>
                                                            <center className='icon-box-single-page'><i className='fa fa-id-card'></i></center>
                                                            <div className="card card-box-single-page  p-3 mb-5 rounded">
                                                                <div className="card-body text-dark">
                                                                    <div className="row">
                                                                        <div className="col-lg-12 col-md-12 col-sm-12">
                                                                            <h3 className='text-dark font-weight-bold'>{_GL['singlePage.form.title']}</h3>
                                                                            {
                                                                                !forms?.confirmed ? (
                                                                                    <div className="alert alert-danger m-3" role="alert">
                                                                                        {_GL['singlePage.un_confirmed']}
                                                                                    </div>
                                                                                ) : (
                                                                                    <div className="alert alert-success m-3" role="alert">
                                                                                        {_GL['singlePage.confirmed']}
                                                                                    </div>
                                                                                )
                                                                            }
                                                                            <div className='p-2 mt-1'>
                                                                                <div className="mb-3 row">
                                                                                    <div className="col-lg-6 col-md-6 col-sm-12 mt-2">
                                                                                        <label className="form-label"> {_GL['singlePage.form.brand_title']} </label>
                                                                                        <input onChange={handleChangeVs} value={forms?.brand_title?.toString()} type="text" className="form-control" id="brand_title" />
                                                                                    </div>
                                                                                    <div className="col-lg-6 col-md-6 col-sm-12 mt-2">
                                                                                        <label className="form-label"> {_GL['singlePage.form.brand_logo']} </label>
                                                                                        <input onChange={handleChangeFile} type="file" className="form-control" id="brand_file" />
                                                                                        <div className="form-text">{_GL['singlePage.form.brand_logo_valid_size']} </div>
                                                                                        <div className="form-text">{_GL['singlePage.form.brand_logo_valid_types']}</div>
                                                                                        <br />

                                                                                        {
                                                                                            !uploadedBrImg ?
                                                                                                (
                                                                                                    <p>

                                                                                                    </p>
                                                                                                ) :
                                                                                                (
                                                                                                    <div>
                                                                                                        <div className='iccima-brand-img'>
                                                                                                            <img src={uploadedBrImg} alt={forms?.brand_title?.toString()} />
                                                                                                        </div>
                                                                                                        <button onClick={handleDeleteBImg} type='button' className='btn btn-danger m-3 p-1'><i className='fa fa-trash'></i></button>
                                                                                                    </div>

                                                                                                )
                                                                                        }

                                                                                    </div>
                                                                                </div>
                                                                                <div className="mb-3 row">
                                                                                    <div className="col-lg-4 col-md-4 col-sm-12 mt-2">
                                                                                        <label className="form-label">{_GL['singlePage.form.phone']}</label>
                                                                                        <input onChange={handleChangeVs} value={forms?.co_phone?.toString()} type="text" className="form-control" id="co_phone" />
                                                                                    </div>
                                                                                    <div className="col-lg-4 col-md-4 col-sm-12 mt-2">
                                                                                        <label className="form-label">{_GL['singlePage.form.fax']}</label>
                                                                                        <input onChange={handleChangeVs} value={forms?.co_fax?.toString()} type="text" className="form-control" id="co_fax" />
                                                                                    </div>
                                                                                    <div className="col-lg-4 col-md-4 col-sm-12 mt-2">
                                                                                        <label className="form-label"> {_GL['singlePage.form.website']}</label>
                                                                                        <input onChange={handleChangeVs} value={forms?.co_website?.toString()} type="text" className="form-control" id="co_website" />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="mb-3">
                                                                                    <label className="form-label">{_GL['singlePage.form.address']}</label>
                                                                                    <textarea onChange={handleChangeVs} className="form-control iccima_met" id="co_main_address" rows="5"
                                                                                        defaultValue={forms?.co_main_address?.toString()}></textarea>
                                                                                </div>
                                                                                <div className="mb-3">
                                                                                    <label className="form-label">{_GL['singlePage.form.otash_moshtarak']}</label>
                                                                                    <textarea onChange={handleChangeVs} className="form-control iccima_met" id="shared_chambers" rows="5"
                                                                                        defaultValue={forms?.shared_chambers?.toString()}></textarea>
                                                                                </div>
                                                                                <div className="mb-3">
                                                                                    <label className="form-label">{_GL['singlePage.form.commis_takh']}</label>
                                                                                    <textarea onChange={handleChangeVs} className="form-control iccima_met" id="specialized_committees" rows="5"
                                                                                        defaultValue={forms?.specialized_committees?.toString()}></textarea>
                                                                                </div>
                                                                                <div className="mb-3">
                                                                                    <label className="form-label">{_GL['singlePage.form.tashakol']}</label>
                                                                                    <textarea onChange={handleChangeVs} className="form-control iccima_met" id="guild_types" rows="5"
                                                                                        defaultValue={forms?.guild_types?.toString()}></textarea>
                                                                                </div>
                                                                                {
                                                                                    (iccima.user.__id && iccima.user.__id == hid) ?
                                                                                        (
                                                                                            <button onClick={handleSubmitForm} type='button' className='btn btn-success m-3'> <i className='fa fa-pencil-square-o'></i>  {_GL['singlePage.form.btnSave']} </button>
                                                                                        ) :
                                                                                        (
                                                                                            <span></span>
                                                                                        )
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    )
                                                    :
                                                    (<div></div>)
                                            }
                                            {
                                                (dataSingle?.show_in_index && dataSingle?.show_in_index == 1) ?
                                                    (
                                                        <div>
                                                            <div className="row mt-4">
                                                                <div className="col-lg-6 col-md-6 col-sm-12">
                                                                    <center className='icon-box-single-page'><i className='fa fa-user-circle'></i></center>
                                                                    <div className="card  shadow-lg card-box-single-page p-3 mb-5 rounded">
                                                                        <div className="card-body text-dark">
                                                                            <center>
                                                                                {dataSingle.co_image_new ? (<img className='cover-img-single' src={dataSingle.co_image_new} alt={dataSingle.owner_fullname ? (dataSingle.owner_fullname)[iccima.user.lang.toString()] : (dataSingle.co_title)[iccima.user.lang.toString()]} />) : ("")}
                                                                                {dataSingle.owner_image_new ? (<img className='cover-img-single' src={dataSingle.owner_image_new} alt={dataSingle.owner_fullname ? (dataSingle.owner_fullname)[iccima.user.lang.toString()] : (dataSingle.co_title)[iccima.user.lang.toString()]} />) : ("")}
                                                                            </center>

                                                                            <br />
                                                                            <div className='mt-3'>
                                                                                <p className='label-single-page'> {_GL['singlePage.co_title']}</p>
                                                                                <h1 className='text-dark title-single-page'>
                                                                                    <strong> {(dataSingle.co_title)[iccima.user.lang.toString()]} </strong>
                                                                                </h1>
                                                                                <br />
                                                                                {
                                                                                    dataSingle?.brand_title ?
                                                                                        (
                                                                                            <div>
                                                                                                <p className='label-single-page'> {_GL['singlePage.form.brand_title']}</p>
                                                                                                <h1 className='text-dark title-single-page'>
                                                                                                    <strong> {dataSingle?.brand_title ? (dataSingle?.brand_title)[iccima.user.lang.toString()] : ''} </strong>
                                                                                                </h1>
                                                                                                <br />
                                                                                            </div>
                                                                                        ) :
                                                                                        ("")
                                                                                }

                                                                                {
                                                                                    dataSingle?.brand_image ?
                                                                                        (
                                                                                            <div>
                                                                                                <p className='label-single-page'> {_GL['singlePage.form.brand_logo']}</p>
                                                                                                <h1 className='text-dark title-single-page'>
                                                                                                    <img className='cover-img-single' src={dataSingle.brand_image} alt={dataSingle.brand_title ? (dataSingle.brand_title)[iccima.user.lang.toString()] : (dataSingle.co_title)[iccima.user.lang.toString()]} />
                                                                                                </h1>
                                                                                                <br />
                                                                                            </div>
                                                                                        ) :
                                                                                        ("")
                                                                                }

                                                                               
                                                                                <p className='label-single-page'> {_GL['singlePage.user_title']}</p>
                                                                                <h2 className='text-dark title-single-page'>
                                                                                    <strong>  {dataSingle.owner_fullname ? (dataSingle.owner_fullname)[iccima.user.lang.toString()] : (dataSingle.co_title)[iccima.user.lang.toString()]} </strong>
                                                                                </h2>
                                                                                <br />
                                                                                <p className='label-single-page'>{_GL['singlePage.co_type']}</p>
                                                                                <h3 className='text-dark title-single-page'>
                                                                                    <strong>{dataSingle.co_type[iccima.user.lang.toString()]} {dataSingle.jalali_year ? `${_GL['singlePage.establish']} ${dataSingle.jalali_year}` : ""}</strong>
                                                                                </h3>
                                                                                <br />
                                                                                <p className='label-single-page'> {_GL['singlePage.city_province']} </p>
                                                                                <h3 className='text-dark title-single-page'>
                                                                                    <strong> {dataSingle?.province?.[iccima.user.lang.toString()]} {dataSingle?.city?.[iccima.user.lang.toString()]}</strong>
                                                                                </h3>
                                                                                <br />
                                                                                <p className='label-single-page'> {_GL['singlePage.reshte_faaliat']} </p>
                                                                                <p className='mt-1 pt-1 text-dark text-justify p-single-page-content' dangerouslySetInnerHTML={{ __html: dataSingle.biz_activities[iccima.user.lang.toString()] ? dataSingle.biz_activities[iccima.user.lang.toString()] : "---" }} ></p>
                                                                                <br />
                                                                                <p className='label-single-page'> {_GL['singlePage.noe_faaliat']} </p>
                                                                                <p className='mt-1 pt-1 text-dark text-justify p-single-page-content' dangerouslySetInnerHTML={{ __html: dataSingle.biz_activitiy_goods__merged[iccima.user.lang.toString()] ? dataSingle.biz_activitiy_goods__merged[iccima.user.lang.toString()] : "---" }} ></p>
                                                                                <br />
                                                                                <p className='label-single-page'>  {_GL['singlePage.govahi_mabda']} </p>
                                                                                <p className='mt-1 pt-1 text-dark text-justify p-single-page-content' dangerouslySetInnerHTML={{ __html: dataSingle.coo_biz_activities__merged[iccima.user.lang.toString()] ? dataSingle.coo_biz_activities__merged[iccima.user.lang.toString()] : "---" }} ></p>
                                                                                <br />
                                                                                <p className='label-single-page'> {_GL['singlePage.hs_codes']} </p>
                                                                                <p className='mt-1 pt-1 text-dark text-justify p-single-page-content' dangerouslySetInnerHTML={{ __html: dataSingle.biz_act_goods_hs_codes__merged[iccima.user.lang.toString()] ? dataSingle.biz_act_goods_hs_codes__merged[iccima.user.lang.toString()] : "---" }} ></p>
                                                                                <br />
                                                                                <p className='label-single-page'>  {_GL['singlePage.otash_moshtarak']}</p>
                                                                                <p className='mt-1 pt-1 text-dark text-justify p-single-page-content' dangerouslySetInnerHTML={{ __html: dataSingle.shared_chambers__merged[iccima.user.lang.toString()] ? dataSingle.shared_chambers__merged[iccima.user.lang.toString()] : "---" }} ></p>
                                                                                <br />
                                                                                <p className='label-single-page'> {_GL['singlePage.commis_takh']} </p>
                                                                                <p className='mt-1 pt-1 text-dark text-justify p-single-page-content' dangerouslySetInnerHTML={{ __html: dataSingle.specialized_committees__merged[iccima.user.lang.toString()] ? dataSingle.specialized_committees__merged[iccima.user.lang.toString()] : "---" }} ></p>
                                                                                <br />
                                                                                <p className='label-single-page'> {_GL['singlePage.tashakol']} </p>
                                                                                <p className='mt-1 pt-1 text-dark text-justify p-single-page-content' dangerouslySetInnerHTML={{ __html: dataSingle.guild_types__merged[iccima.user.lang.toString()] ? dataSingle.guild_types__merged[iccima.user.lang.toString()] : "---" }} ></p>


                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-6 col-md-6 col-sm-12">
                                                                    <center className='icon-box-single-page'>
                                                                        <i className='fa fa-volume-control-phone'></i>
                                                                        <strong className='text-dark view-count-eye-single-page'>  {dataSingle?.view_count}  <i className='fa fa-eye'></i></strong>
                                                                    </center>
                                                                    <div className="card card-box-single-page  p-3 mb-5  rounded">
                                                                        <div className="card-body text-dark">
                                                                            <div className='mt-1'>
                                                                                <p className='label-single-page'> {_GL['singlePage.address']} </p>
                                                                                <p className='mt-1 pt-1 text-dark text-justify p-single-page-content' dangerouslySetInnerHTML={{ __html: dataSingle.co_main_address[iccima.user.lang.toString()] }} ></p>
                                                                                <br />
                                                                                <p className='label-single-page'>  {_GL['singlePage.website']} </p>
                                                                                <p className='text-dark font-weight-bold mt-2 p-single-page-content'>{dataSingle.co_website ? dataSingle.co_website : "---"}</p>
                                                                                <br />
                                                                                <p className='label-single-page'> {_GL['singlePage.phone']} </p>
                                                                                <p className='text-dark font-weight-bold mt-2 p-single-page-content'>{dataSingle.co_phone ? dataSingle.co_phone : "---"}</p>
                                                                                <br />
                                                                                <p className='label-single-page'> {_GL['singlePage.fax']} </p>
                                                                                <p className='text-dark font-weight-bold mt-2 p-single-page-content'>{dataSingle.co_fax ? dataSingle.co_fax : "---"}</p>
                                                                                <br />
                                                                                <p className='label-single-page'> {_GL['singlePage.email']} </p>
                                                                                <p className='text-dark font-weight-bold mt-2 p-single-page-content'>{dataSingle.co_email ? format_at_email_str(dataSingle.co_email) : "---"}</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ) :
                                                    (<></>)
                                            }

                                        </div>
                                    </div>
                                ) :
                                (
                                    <div className='placeholder-single-content'>
                                        <img src="/images/placeholder-loading-iccima-1.gif" alt="در حال بازگذاری ..." />
                                    </div>
                                )
                        }
                    </>

                }


                <div>
                    <Toaster
                        position="top-left"
                        reverseOrder={true}
                    />
                </div>
            </div>
        </MainLayout>
    )
}