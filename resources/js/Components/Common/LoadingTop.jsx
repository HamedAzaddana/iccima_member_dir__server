import {  useRef } from 'react';

export default function LoadingTop() {
    const loadingPageRef = useRef(null);
    function handleGoTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    return (
        <div>
            <div ref={loadingPageRef} id='loading-page-iccima' className="layout-overlay-loading layout-menu-toggle" style={{
                display: 'none'
            }}>
                <img src={`https://static.spotapps.co/assets/widgets/loading.gif`} alt="لطفا منتظر بمانید ..." />
            </div>
            <img onClick={handleGoTop} src="/images/top.png" id="top-icon" alt="top"></img>
        </div>
    );
}
