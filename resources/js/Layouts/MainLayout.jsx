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
    return (
        <div>
            <div id="top">
                <main>
                    <NavBar />
                    {children}
                    {/* <div ref={loadingPageRef} className="layout-overlay-loading layout-menu-toggle d-none" style={{
                        display: 'inline-flex'
                    }}>
                        <img src={`${appUrl}/images/loading-loader-fst2.gif`} alt="لطفا منتظر بمانید ..." />
                    </div> */}
                </main>
                <FooterBar />
            </div>
        </div>
    );
}
