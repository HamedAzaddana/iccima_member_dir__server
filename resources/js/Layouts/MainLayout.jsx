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

export default function Main({ children }) {
    const { iccima } = usePage().props;
    
    return (
        <div className={`app-lang-${iccima.user.lang}`}>
            <HeaderTop />
            <TopArea />

            {children}
            <FooterBottom />
            <LoadingTop />
        </div>
    );
}
