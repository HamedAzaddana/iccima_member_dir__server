import { useState, useRef, useEffect } from 'react';
import { Head } from '@inertiajs/react'
import { usePage } from '@inertiajs/react'
import MainLayout from '@/Layouts/MainLayout';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { iterate_prepare_data } from '../../Utils/IccObjArr';

export default function Forms({ }) {
    const ws_username = import.meta.env.VITE_AUTH_WS_USERNAME || '';
    const ws_password = import.meta.env.VITE_AUTH_WS_PASSWORD || '';
    const { iccima, _GL } = usePage().props;
    const fetchSingleData = async () => {
        document.getElementById('loading-page-iccima').style.display = "inline-flex";
        try {
            const response = await axios.post(`${iccima.ws.admin.forms}`, {}, {
                headers: {
                    'ICCIMA-AUTH-USERNAME': `${ws_username}`,
                    'ICCIMA-AUTH-PASSWORD': `${ws_password}`,
                }
            });
            document.getElementById('loading-page-iccima').style.display = "none";
            // console.log(response.data.data)
            // setDataSingle(iterate_prepare_data(response.data.data));
            // setForms(iterate_prepare_data(response.data.data.__forms));
            // if (response?.data?.data?.__forms?.brand_image) {
            //     setUploadedBrImg(response?.data?.data?.__forms?.brand_image);
            // }
        } catch (error) {
            document.getElementById('loading-page-iccima').style.display = "none";
            toast.error(`Error fetching single data : ${error.message}`);
            let status_code = error.response.status;
           
            console.log(error)
        }
    };
    useEffect(() => {
        fetchSingleData();
    },[]);
    return (
        <MainLayout>
            <div>
                <Head title="فرم های خود اظهاری" />
                <div>
                    
                </div>
            </div>
        </MainLayout>
    )
}