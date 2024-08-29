import { useState, useRef, useEffect } from 'react';
import { Head } from '@inertiajs/react'
import { usePage } from '@inertiajs/react'
import MainLayout from '@/Layouts/MainLayout';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { iterate_prepare_data } from '../../Utils/IccObjArr';

export default function Dashboard({ }) {
    const ws_username = import.meta.env.VITE_AUTH_WS_USERNAME || '';
    const ws_password = import.meta.env.VITE_AUTH_WS_PASSWORD || '';
    const { iccima, _GL } = usePage().props;
    useEffect(() => {

    },[]);
    return (
        <MainLayout>
            <div>
                <Head title="داشبورد مدیریت" />
                <div>
                    
                </div>
            </div>
        </MainLayout>
    )
}