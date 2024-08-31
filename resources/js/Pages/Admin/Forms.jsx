import { useState, useRef, useEffect } from 'react';
import { Head } from '@inertiajs/react'
import { usePage } from '@inertiajs/react'
import MainLayout from '@/Layouts/MainLayout';
import axios from 'axios';
import { get_query_param_url } from '../../Utils/IccObjArr';
import toast, { Toaster } from 'react-hot-toast';

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
    
    const handleChangePage = (e) => {
        e.preventDefault();
        let href = e.currentTarget.getAttribute("href");
        let current_page = get_query_param_url('page',href)
        fetchSingleData(current_page)
    };
    const handleChangeConfirm = (e) => {
        changeStatus(e.currentTarget.getAttribute("data-hid"), e.currentTarget.getAttribute("data-status"))
    };
    const changeStatus = async (hid = "", status = 0) => {
        let _post_data = {
            status, hid
        };
        document.getElementById('loading-page-iccima').style.display = "inline-flex";
        try {
            const response = await axios.post(`${iccima.ws.admin.form_status}`, _post_data, {
                headers: {
                    'ICCIMA-AUTH-USERNAME': `${ws_username}`,
                    'ICCIMA-AUTH-PASSWORD': `${ws_password}`,
                }
            });
            document.getElementById('loading-page-iccima').style.display = "none";
            toast.success(`${_GL['toast.edited_success']}`);
            console.log(response.data.data)
            fetchSingleData();
        } catch (error) {
            document.getElementById('loading-page-iccima').style.display = "none";
            toast.error(`Error fetching single data : ${error.message}`);
            let status_code = error.response.status;
            console.log(error)
        }
    }
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
                                            <th scope="col">{_GL['admin.forms.tbl.show_date']}</th>
                                            <th scope="col">{_GL['admin.forms.tbl.operation']}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataRecords?.data?.map((itemRecord, ik_loop) => (

                                            <tr key={ik_loop + 1} className={itemRecord.confirmed ? `table-success` : `table-danger`}>
                                                <th scope="row">{ik_loop + 1}</th>
                                                <td>{
                                                    itemRecord.original_user._owner_fullname ? itemRecord.original_user._owner_fullname.toString() :
                                                        itemRecord.original_user._co_title.toString()
                                                }</td>

                                                <td>
                                                    <a className='btn btn-primary p-1' href={itemRecord._spl.toString()} target='_blank' >
                                                        <i className='fa fa-info-circle'></i>
                                                    </a>
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
                                                                <button data-status={0} data-hid={itemRecord._id} onClick={handleChangeConfirm} title={_GL['admin.forms.tbl.unconfirm']} type="button" className="btn btn-danger p-1">
                                                                    <i className='fa fa-times'></i>
                                                                </button>
                                                            ) :
                                                            (
                                                                <button data-status={1} data-hid={itemRecord._id} onClick={handleChangeConfirm} title={_GL['admin.forms.tbl.confirm']} type="button" className="btn btn-success p-1">
                                                                    <i className='fa fa-check'></i>
                                                                </button>
                                                            )

                                                    }
                                                </td>
                                            </tr>
                                        ))}


                                    </tbody>
                                </table>
                                {
                                     (dataRecords?.links?.length != 3) ? (
                                        <div className='mt-5'>
                                        <nav aria-label="Page navigation example">
                                            <ul className="pagination justify-content-center">
                                                {dataRecords?.links?.map((paginItem, ik_loop) => (
                                                    (
                                                        <li key={ik_loop+1} className={`page-item ${!paginItem.url ? 'disabled' : ''} ${paginItem.active ? 'active' : ''}`}>
                                                            <a onClick={handleChangePage} className="page-link" href={paginItem.url} tabIndex="-1" aria-disabled="true">
                                                                {
                                                                    paginItem.label=="pagination.previous" ? "<":
                                                                    (
                                                                        paginItem.label=="pagination.next" ? ">" : paginItem.label
                                                                    )
                                                                }
                                                            </a>
                                                        </li>
                                                    )
                                                )
                                                )}
                                            </ul>
                                        </nav>
                                    </div>
                                     ):("")
                                }
                              
                            </div>

                        ) :
                        (
                            <div className='placeholder-single-content'>
                                <img src="/images/placeholder-loading-iccima-1.gif" alt="در حال بازگذاری ..." />
                            </div>
                        )
                }
                <Toaster
                    position="top-left"
                    reverseOrder={true}
                />
            </div>
        </MainLayout>
    )
}