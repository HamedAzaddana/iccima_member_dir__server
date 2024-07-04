import '../../css/home.css';
import '../../css/theme/bootstrap-icons.css';
import '../../css/theme/bootstrap.min.css';
import '../../css/theme/templatemo-topic-listing.css';
import '../../css/theme/font-awesome.css';
import NavBar from '../Components/NavBar';
import FooterBar from '../Components/FooterBar';
import { useRef } from 'react';


export default function Main({ children }) {
    const appUrl = import.meta.env.VITE_APP_URL || 'http://127.0.0.1:8000';
    const loadingPageRef = useRef(null);
    function handleGoTop(){
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    return (
        <div>
            <div id="top">
                <main>
                    <NavBar />
                    {children}
                    <div ref={loadingPageRef} id='loading-page-iccima' className="layout-overlay-loading layout-menu-toggle" style={{
                        display: 'none'
                    }}>
                        <img src={`https://static.spotapps.co/assets/widgets/loading.gif`} alt="لطفا منتظر بمانید ..." />
                    </div>
                    <img onClick={handleGoTop} src="/images/top.png" id="top-icon" alt="top"></img>
                </main>
                <FooterBar />
            </div>
        </div>
    );
}
