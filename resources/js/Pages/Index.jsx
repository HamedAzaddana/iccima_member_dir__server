import { useState, useRef, useEffect } from 'react';
import { Head } from '@inertiajs/react'
import MainLayout from '@/Layouts/MainLayout';

import  WelcomHero from '../Components/IndexPage/WelcomHero'
import  ExploreArea from '../Components/IndexPage/ExploreArea'

// import MatchHeight from 'matchheight';
// import 'animate.css';
// import WOW from 'wow.js/src/WOW';

export default function Index({ ws_s_route, ws_search_get_fv }) {

    
    const [dataSearch, setDataSearch] = useState([]);
    function handleDataSearch(data, is_more) {
        // setDataSearch(data);
        // console.log(data);
        // if (!is_more) {
        //     TopClickRef.current.click();
        // }
    }
    useEffect(() => {
        // set loading off !
        // document.getElementById('loading-page-iccima').style.display = "none";
        // new MatchHeight();
        // new WOW().init();
    }, [dataSearch]);
    return (
        <MainLayout>
            <div>
                <Head title="خانه" />
                <WelcomHero />
                <ExploreArea />
            </div>
        </MainLayout>
    )
}