import { useState, useRef, useEffect } from 'react';
import { Head } from '@inertiajs/react'
import { usePage } from '@inertiajs/react'
import MainLayout from '@/Layouts/MainLayout';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { iterate_prepare_data } from '../../Utils/IccObjArr';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function Forms({ }) {
    const ws_username = import.meta.env.VITE_AUTH_WS_USERNAME || '';
    const ws_password = import.meta.env.VITE_AUTH_WS_PASSWORD || '';
    const [dataRecords, setDataRecords] = useState([]);

    const { iccima, _GL } = usePage().props;
    const fetchSingleData = async (page = 1) => {
        let _post_data = {
            page
        };
        document.getElementById('loading-page-iccima').style.display = "inline-flex";
        try {
            const response = await axios.post(`${iccima.ws.admin.forms}`, _post_data, {
                headers: {
                    'ICCIMA-AUTH-USERNAME': `${ws_username}`,
                    'ICCIMA-AUTH-PASSWORD': `${ws_password}`,
                }
            });
            document.getElementById('loading-page-iccima').style.display = "none";
            console.log(response.data.data)
            setDataRecords(response.data.data);
        } catch (error) {
            document.getElementById('loading-page-iccima').style.display = "none";
            toast.error(`Error fetching single data : ${error.message}`);
            let status_code = error.response.status;

            console.log(error)
        }
    };
    useEffect(() => {
        fetchSingleData();
    }, []);
    return (
        <MainLayout>
            <div>
                <Head title="فرم های خود اظهاری" />
                {
                    dataRecords ?
                        (
                            <div className="table-responsive p-3 m-2 table-iccima-center-all">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">{_GL['admin.forms.tbl.fullname']}</th>
                                            <th scope="col">{_GL['admin.forms.tbl.show_form']}</th>
                                            <th scope="col">{_GL['admin.forms.tbl.show_original']}</th>
                                            <th scope="col">{_GL['admin.forms.tbl.show_date']}</th>
                                            <th scope="col">{_GL['admin.forms.tbl.operation']}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataRecords?.data?.map((itemRecord, ik_loop) => (

                                            <tr key={ik_loop + 1}>
                                                <th scope="row">{ik_loop + 1}</th>
                                                <td>{
                                                    itemRecord.original_user._owner_fullname ? itemRecord.original_user._owner_fullname.toString() :
                                                        itemRecord.original_user._co_title.toString()
                                                }</td>
                                                <td>
                                                    <Button variant="primary" className='p-2' >
                                                        <i className='fa fa-info'></i>
                                                    </Button>
                                                </td>
                                                <td>
                                                    <Button variant="secondary" className='p-1' >
                                                        <i className='fa fa-info-circle'></i>
                                                    </Button>
                                                </td>
                                                <td>
                                                    {
                                                        itemRecord._jalali_updated_at.toString()
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        itemRecord.confirmed ?
                                                            (
                                                                <button type="button" className="btn btn-danger p-1">
                                                                    <i className='fa fa-times'></i>
                                                                </button>
                                                            ) :
                                                            (
                                                                <button type="button" className="btn btn-success p-1">
                                                                    <i className='fa fa-check'></i>
                                                                </button>
                                                            )

                                                    }


                                                </td>
                                            </tr>
                                        ))}


                                    </tbody>
                                </table>
                            </div>
                        ) :
                        (
                            <div className='placeholder-single-content'>
                                <img src="/images/placeholder-loading-iccima-1.gif" alt="در حال بازگذاری ..." />
                            </div>
                        )
                }

            </div>
        </MainLayout>
    )
}