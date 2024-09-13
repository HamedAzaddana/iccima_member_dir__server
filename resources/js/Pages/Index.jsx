import { useState, useRef, useEffect } from 'react';
import { Head } from '@inertiajs/react'
import MainLayout from '@/Layouts/MainLayout';

import WelcomHero from '../Components/IndexPage/WelcomHero'
import ExploreArea from '../Components/IndexPage/ExploreArea'

import MatchHeight from 'matchheight';
import 'animate.css';
// import WOW from 'wow.js/src/WOW';

export default function Index({ ws_s_route, ws_search_get_fv }) {

    const TopClickRef = useRef(null);
    const [dataSearch, setDataSearch] = useState([]);
    const handleDataSearch = (data, is_more) => {
        setDataSearch(data);
        console.log(data);
        if (!is_more) {
            TopClickRef.current.click();
        }
    }
    useEffect(() => {
        document.getElementById('loading-page-iccima').style.display = "none";
        new MatchHeight();
        // new WOW().init();
    }, [dataSearch]);
    return (
        <MainLayout>
            <div>
                <Head title="" />
                <WelcomHero
                    sendDataToIndex={handleDataSearch}
                    ws_s_route={ws_s_route}
                    ws_search_get_fv={ws_search_get_fv} />
              
                <ExploreArea
                    dataSearch={dataSearch.data}
                    req_params={dataSearch.req}
                />
                
                <a ref={TopClickRef} className="d-none" href="#explore"></a>
            </div>
        </MainLayout>
    )
}