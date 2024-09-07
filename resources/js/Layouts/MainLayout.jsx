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

import FooterBottom from '../Components/Common/FooterBottom';
import LoadingTop from '../Components/Common/LoadingTop';
import { useEffect } from 'react';
import { browser_session_set, get_query_param_url } from '../Utils/IccObjArr';

export default function Main({ children }) {
    const { iccima } = usePage().props;
    useEffect(() => {
        let lang_app_setter = (
            get_query_param_url("lang") && typeof get_query_param_url("lang") != undefined
        ) ? get_query_param_url("lang") : "";
        let validated_lang_qp = "";
        if (lang_app_setter && (lang_app_setter == "Persian" || lang_app_setter == "English")) {
            validated_lang_qp = lang_app_setter;
        }
        let lang_set_app = iccima.user.lang ? iccima.user.lang : validated_lang_qp;
        browser_session_set("lang_iccima_system", lang_set_app);
    }, []);
    return (
        <div className={`app-lang-${iccima.user.lang}`}>
            <HeaderTop />
            <TopArea />
            <div id='iccima-main-content-layout'>
                {children}
            </div>
            <FooterBottom />
            <LoadingTop />
        </div>
    );
}
