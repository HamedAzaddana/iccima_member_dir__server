import { useState, useRef, useEffect } from 'react';
import { Head } from '@inertiajs/react'
import { usePage } from '@inertiajs/react'
import MainLayout from '@/Layouts/MainLayout';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { iterate_prepare_data } from '../Utils/IccObjArr';
import { get_jalali_year } from '../Utils/IccDate';


export default function SingleMerchant({ hid, route_ws_get_single, route_404_page, route_ws_saveVals, route_ws_delBrImg }) {
    const ws_username = import.meta.env.VITE_AUTH_WS_USERNAME || '';
    const ws_password = import.meta.env.VITE_AUTH_WS_PASSWORD || '';
    const [forms, setForms] = useState(null);
    const [dataSingle, setDataSingle] = useState([]);
    const { iccima } = usePage().props;
    const handleChangeVs = (e) => {
        const key = e.target.id;
        const value = e.target.value;
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
    const handleSubmitForm = (e) => {
        document.getElementById('loading-page-iccima').style.display = "inline-flex";
        let _post_data = forms;
        let formData = new FormData();
        if(_post_data){
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
                console.log(res)
                document.getElementById('loading-page-iccima').style.display = "none";
                let status_code = res?.status;
                if(status_code == 200 || status_code==201){
                    toast.success(`اطلاعات با موفقیت به روز شد. `);
                }else{
                    toast.error(`خطایی رخ داد !`); 
                }
            })
            .catch((err) => {
                document.getElementById('loading-page-iccima').style.display = "none";
                toast.error(`${err.message}`);
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

    }, []);


    // console.log(dataSingle)
    return (
        <MainLayout>
            <div>
                <Head title={dataSingle?.co_title ? (dataSingle.co_title).Persian : "اطلاعات"} />
                {
                    dataSingle?.co_title ?
                        (
                            <div className='placeholder-single-content'>
                                <div className="container">
                                    {
                                        iccima.user.__id && iccima.user.__id == hid ?
                                            (
                                                <div className="card shadow-lg p-3 mb-5 bg-body rounded">
                                                    <div className="card-body text-dark">
                                                        <div className="row">
                                                            <div className="col-lg-12 col-md-12 col-sm-12">
                                                                <h3 className='text-primary font-weight-bold'>فرم خوداظهاری بازرگان</h3>
                                                                <div className='p-2 mt-1'>
                                                                    <div className="mb-3 row">
                                                                        <div className="col-lg-6 col-md-6 col-sm-12 mt-2">
                                                                            <label className="form-label">نام برند تجاری</label>
                                                                            <input onChange={handleChangeVs} value={dataSingle?.__merchant_e?.Persian?.brand_title?.toString()} type="text" className="form-control" id="brand_title__e" />
                                                                        </div>
                                                                        <div className="col-lg-6 col-md-6 col-sm-12 mt-2">
                                                                            <label className="form-label">لوگو برند تجاری</label>
                                                                            <input onChange={handleChangeFile} type="file" className="form-control" id="brand_file__e" />
                                                                            <div className="form-text">فرمت های قابل قبول: png, jpg, jpeg</div>
                                                                            <div className="form-text">حداکثر حجم قابل قبول: 1MB </div>
                                                                            <br />
                                                                            <div className='iccima-brand-img'>
                                                                                <img src="https://www.hubspot.com/hs-fs/hubfs/Pepsi_logo_2014.svg.png?width=450&height=458&name=Pepsi_logo_2014.svg.png" alt={dataSingle?.__merchant_e?.brand_title?.toString()} />
                                                                            </div>
                                                                            <button type='button' className='btn btn-danger m-3'>حذف</button>
                                                                            {
                                                                                dataSingle?.__merchant_e?.brand_image ?
                                                                                    ("") :
                                                                                    ("")
                                                                            }

                                                                        </div>
                                                                    </div>
                                                                    <div className="mb-3 row">
                                                                        <div className="col-lg-4 col-md-4 col-sm-12 mt-2">
                                                                            <label className="form-label">تلفن شرکت</label>
                                                                            <input onChange={handleChangeVs} value={dataSingle?.__merchant_e?.co_phone?.toString()} type="text" className="form-control" id="co_phone__e" />
                                                                        </div>
                                                                        <div className="col-lg-4 col-md-4 col-sm-12 mt-2">
                                                                            <label className="form-label">فکس شرکت</label>
                                                                            <input onChange={handleChangeVs} value={dataSingle?.__merchant_e?.co_fax?.toString()} type="text" className="form-control" id="co_fax__e" />
                                                                        </div>
                                                                        <div className="col-lg-4 col-md-4 col-sm-12 mt-2">
                                                                            <label className="form-label">وب سایت شرکت</label>
                                                                            <input onChange={handleChangeVs} value={dataSingle?.__merchant_e?.co_website?.toString()} type="text" className="form-control" id="co_website__e" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="mb-3">
                                                                        <label className="form-label">آدرس شرکت</label>
                                                                        <textarea onChange={handleChangeVs} className="form-control iccima_met" id="co_main_address__e" rows="5"
                                                                            defaultValue={dataSingle?.__merchant_e?.co_main_address?.Persian?.toString()}></textarea>
                                                                    </div>
                                                                    <div className="mb-3">
                                                                        <label className="form-label">اتاق های مشترک</label>
                                                                        <textarea onChange={handleChangeVs} className="form-control iccima_met" id="shared_chambers__e" rows="5"
                                                                            defaultValue={dataSingle?.__merchant_e?.shared_chambers?.Persian?.toString()}></textarea>
                                                                    </div>
                                                                    <div className="mb-3">
                                                                        <label className="form-label">کمیسیون های تخصصی</label>
                                                                        <textarea onChange={handleChangeVs} className="form-control iccima_met" id="specialized_committees__e" rows="5"
                                                                            defaultValue={dataSingle?.__merchant_e?.specialized_committees?.Persian?.toString()}></textarea>
                                                                    </div>
                                                                    <div className="mb-3">
                                                                        <label className="form-label">تشکل ها</label>
                                                                        <textarea onChange={handleChangeVs} className="form-control iccima_met" id="guild_types__e" rows="5"
                                                                            defaultValue={dataSingle?.__merchant_e?.guild_types?.Persian?.toString()}></textarea>
                                                                    </div>
                                                                    <button onClick={handleSubmitForm} type='button' className='btn btn-success m-3'> <i className='fa fa-pencil-square-o'></i> ثبت تغییرات</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                            :
                                            (<div></div>)
                                    }
                                    <div className="card shadow-lg p-3 mb-5 bg-body rounded">
                                        <div className="card-body text-dark">
                                            <div className="row">
                                                <div className="col-lg-8 col-md-7 col-sm-12 mt-2">
                                                    <h1 className='text-primary'>
                                                        {(dataSingle.co_title).Persian}
                                                    </h1>
                                                    <h2 className='text-primary mt-3'>
                                                        <strong>  {dataSingle.owner_fullname ? (dataSingle.owner_fullname).Persian : (dataSingle.co_title).Persian} </strong>
                                                    </h2>
                                                    <h3 className='text-dark mt-2'>
                                                        <strong>{dataSingle.co_type.Persian} {dataSingle.jalali_year ? `تاسیس ${dataSingle.jalali_year}` : ""}</strong>
                                                    </h3>
                                                    <h4 className='text-dark mt-2'>
                                                        {dataSingle?.province?.Persian} {dataSingle?.city?.Persian}
                                                    </h4>
                                                </div>
                                                <div className="col-lg-2 col-md-2 col-sm-12 mt-4">
                                                    {dataSingle.co_image_new ? (<img className='cover-img-single' src={dataSingle.co_image_new} alt={dataSingle.owner_fullname ? (dataSingle.owner_fullname).Persian : (dataSingle.co_title).Persian} />) : ("")}
                                                </div>
                                                <div className="col-lg-2 col-md-2 col-sm-12 mt-4">
                                                    {dataSingle.owner_image_new ? (<img className='cover-img-single' src={dataSingle.owner_image_new} alt={dataSingle.owner_fullname ? (dataSingle.owner_fullname).Persian : (dataSingle.co_title).Persian} />) : ("")}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card shadow-lg p-3 mb-5 bg-body rounded">
                                        <div className="card-body text-dark">
                                            <div className="row">
                                                <div className="col-lg-6 col-md-6 col-sm-12">
                                                    <h5 className='text-primary'> نشانی </h5>
                                                    <p className='mt-1 pt-1 text-dark text-justify' dangerouslySetInnerHTML={{ __html: dataSingle.co_main_address.Persian }} ></p>
                                                    <br />
                                                    <h5 className='text-primary'> وب سایت </h5>
                                                    <p className='text-dark font-weight-bold mt-2'>{dataSingle.co_website ? dataSingle.co_website : "---"}</p>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-12">
                                                    <h5 className='text-primary'> تلفن </h5>
                                                    <p className='text-dark font-weight-bold mt-2'>{dataSingle.co_phone ? dataSingle.co_phone : "---"}</p>
                                                    <br />
                                                    <h5 className='text-primary'> فکس </h5>
                                                    <p className='text-dark font-weight-bold mt-2'>{dataSingle.co_fax ? dataSingle.co_fax : "---"}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card shadow-lg p-3 mb-5 bg-body rounded">
                                        <div className="card-body text-dark">
                                            <div className="row">
                                                <div className="col-lg-12 col-md-12 col-sm-12">
                                                    <h5 className='text-primary'> رشته فعالیت </h5>
                                                    <p className='mt-1 pt-1 text-dark text-justify' dangerouslySetInnerHTML={{ __html: dataSingle.biz_activities.Persian ? dataSingle.biz_activities.Persian : "---" }} ></p>
                                                    <br />
                                                    <h5 className='text-primary'> نوع فعالیت </h5>
                                                    <p className='mt-1 pt-1 text-dark text-justify' dangerouslySetInnerHTML={{ __html: dataSingle.biz_activitiy_goods__merged.Persian ? dataSingle.biz_activitiy_goods__merged.Persian : "---" }} ></p>
                                                    <br />
                                                    <h5 className='text-primary'> گواهی های مبدا صادر شده</h5>
                                                    <p className='mt-1 pt-1 text-dark text-justify' dangerouslySetInnerHTML={{ __html: dataSingle.coo_biz_activities__merged.Persian ? dataSingle.coo_biz_activities__merged.Persian : "---" }} ></p>
                                                    <br />
                                                    <h5 className='text-primary'> کد های HS تجاری</h5>
                                                    <p className='mt-1 pt-1 text-dark text-justify' dangerouslySetInnerHTML={{ __html: dataSingle.biz_act_goods_hs_codes__merged.Persian ? dataSingle.biz_act_goods_hs_codes__merged.Persian : "---" }} ></p>
                                                    <br />
                                                    <h5 className='text-primary'> اتاق های مشترک </h5>
                                                    <p className='mt-1 pt-1 text-dark text-justify' dangerouslySetInnerHTML={{ __html: dataSingle.shared_chambers__merged.Persian ? dataSingle.shared_chambers__merged.Persian : "---" }} ></p>
                                                    <br />
                                                    <h5 className='text-primary'> کمیسیون های تخصصی </h5>
                                                    <p className='mt-1 pt-1 text-dark text-justify' dangerouslySetInnerHTML={{ __html: dataSingle.specialized_committees__merged.Persian ? dataSingle.specialized_committees__merged.Persian : "---" }} ></p>
                                                    <br />
                                                    <h5 className='text-primary'> تشکل ها</h5>
                                                    <p className='mt-1 pt-1 text-dark text-justify' dangerouslySetInnerHTML={{ __html: dataSingle.guild_types__merged.Persian ? dataSingle.guild_types__merged.Persian : "---" }} ></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ) :
                        (
                            <div className='placeholder-single-content'>
                                <img src="/images/placeholder-loading-iccima-1.gif" alt="در حال بازگذاری ..." />
                            </div>
                        )
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