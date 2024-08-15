import { useState, useRef, useEffect } from 'react';
import { Head } from '@inertiajs/react'
import MainLayout from '@/Layouts/MainLayout';
import axios from 'axios';

export default function SingleMerchant({ hid, route_ws_get_single }) {
    const ws_username = import.meta.env.VITE_AUTH_WS_USERNAME || '';
    const ws_password = import.meta.env.VITE_AUTH_WS_PASSWORD || '';
    const appUrl = import.meta.env.VITE_APP_URL || 'http://127.0.0.1:8000';
    const [dataSingle, setDataSingle] = useState([]);
    const get_jalali_year = (gy, gm, gd) => {
        let g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
        let jy = 0;
        if (gy > 1600) {
            jy = 979;
            gy -= 1600;
        }
        else {
            jy = 0;
            gy -= 621;
        }
        let gy2 = (gm > 2) ? (gy + 1) : gy;
        let days = (365 * gy) + (parseInt((gy2 + 3) / 4)) - (parseInt((gy2 + 99) / 100)) + (parseInt((gy2 + 399) / 400)) - 80 + gd + g_d_m[gm - 1];
        jy += 33 * (parseInt(days / 12053));
        days %= 12053;
        jy += 4 * (parseInt(days / 1461));
        days %= 1461;
        if (days > 365) {
            jy += parseInt((days - 1) / 365);
            days = (days - 1) % 365;
        }
        let jm = (days < 186) ? 1 + parseInt(days / 31) : 7 + parseInt((days - 186) / 30);
        let jd = 1 + ((days < 186) ? (days % 31) : ((days - 186) % 30));
        var resultY = jy.toString();
        var resultM = jm < 10 ? "0" + jm.toString() : jm.toString();
        var resultD = jd < 10 ? "0" + jd.toString() : jd.toString();
        return resultY;
    }
    const handleNonDo = (e) => {
        e.preventDefault();
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
            setDataSingle(response.data.data);
            console.log(response.data.data)

        } catch (error) {
            document.getElementById('loading-page-iccima').style.display = "none";
            toast.error(`Error fetching single data : ${error.message}`);
            console.log(error)
        }
    };
    useEffect(() => {
        fetchSingleData();
        // console.log(JSON.parse(dataSingle.co_title).Persian)
    }, []);



    return (
        <MainLayout>
            <div>
                (dataSingle ?
                (
                <Head title={JSON.parse(dataSingle.co_title).Persian} />
                ):
                <div></div>
                )
            </div>
        </MainLayout>
    )
}