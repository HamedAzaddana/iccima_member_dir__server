import '../../css/global.css';
import '../../css/theme/font-awesome.min.css';
import '../../css/theme/linearicons.css';
import '../../css/theme/animate.css';
import '../../css/theme/flaticon.css';
import '../../css/theme/bootstrap.min.css';
import '../../css/theme/bootsnav.css';
import '../../css/theme/style.css';
import '../../css/theme/responsive.css';
import { usePage } from '@inertiajs/react'

import HeaderTop from '../Components/Common/HeaderTop';
import TopArea from '../Components/Common/TopArea';
import axios from 'axios';
import FooterBottom from '../Components/Common/FooterBottom';
import LoadingTop from '../Components/Common/LoadingTop';
import { useEffect, useState } from 'react';
import { browser_session_set, get_query_param_url } from '../Utils/IccObjArr';
import toast, { Toaster } from 'react-hot-toast';
import TagManager from 'react-gtm-module';

export default function Main({ children }) {
    const ws_username = import.meta.env.VITE_AUTH_WS_USERNAME || '';
    const ws_password = import.meta.env.VITE_AUTH_WS_PASSWORD || '';
    const gtm_google_id = import.meta.env.VITE_GTM_GOOGLE_ID || '';
    const { iccima } = usePage().props;
    const [onlines, setOnlines] = useState(0);

    const tagManagerArgs = {
        gtmId: gtm_google_id
    }
    const setAppLang = () => {
        let lang_app_setter = (
            get_query_param_url("lang") && typeof get_query_param_url("lang") != undefined
        ) ? get_query_param_url("lang") : "";
        let validated_lang_qp = "";
        if (lang_app_setter && (lang_app_setter == "Persian" || lang_app_setter == "English")) {
            validated_lang_qp = lang_app_setter;
        }
        let lang_set_app = iccima.user.lang ? iccima.user.lang : validated_lang_qp;
        browser_session_set("lang_iccima_system", lang_set_app);
    };
    const getOnlineUsers = () => {
        axios.post(`${iccima.links.onlines}`, {}, {
            headers: {
                'ICCIMA-AUTH-USERNAME': `${ws_username}`,
                'ICCIMA-AUTH-PASSWORD': `${ws_password}`,
            }
        })
            .then(res => {
                let status_code = res?.status;
                if (status_code == 200 || status_code == 201) {
                    setOnlines(res?.data?.data);

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
    useEffect(() => {
        setAppLang();
        getOnlineUsers();
        TagManager.initialize(tagManagerArgs);

    }, []);
    return (
        <div className={`app-lang-${iccima.user.lang}`}>
            <HeaderTop />
            <TopArea />
            <div id='iccima-main-content-layout'>
                {children}
            </div>
            <FooterBottom cntOnlines={onlines} />
            <LoadingTop />
            <Toaster
                position="top-left"
                reverseOrder={true}
            />
        </div>
    );
}
