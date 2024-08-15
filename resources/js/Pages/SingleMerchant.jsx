import { useState, useRef, useEffect } from 'react';
import { Head } from '@inertiajs/react'
import MainLayout from '@/Layouts/MainLayout';


export default function SingleMerchant({  }) {

    const [dataSingle, setDataSingle] = useState([]);
    useEffect(() => {
        // set loading off !
    }, [dataSingle]);
    return (
        <MainLayout>
            <div>
                <Head title="اطلاعات" />

            </div>
        </MainLayout>
    )
}