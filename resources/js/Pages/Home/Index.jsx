import { useState, useRef, useEffect } from 'react';
import { Head } from '@inertiajs/react'
import MainLayout from '@/Layouts/MainLayout';

import SearchSection from "../../Components/SearchSection";
import SearchResults from '../../Components/SearchResults';
import HelpSection from '../../Components/HelpSection';


export default function Index({ ws_s_route, ws_search_get_fv }) {

    const TopClickRef = useRef(null);
    const [dataSearch, setDataSearch] = useState([]);




    function handleDataSearch(data) {
        setDataSearch(data);
        console.log(data);
        TopClickRef.current.click();
    }
    useEffect(() => {
        // set loading off !
        document.getElementById('loading-page-iccima').style.display = "none";
    }, [dataSearch]);
    return (
        <MainLayout>
            <div>
                <Head title="خانه" />
                <SearchSection
                    sendDataToIndex={handleDataSearch}
                    ws_s_route={ws_s_route}
                    ws_search_get_fv={ws_search_get_fv}
                />
                <a ref={TopClickRef} className="d-none" href="#section_2"></a>
                <section className="featured-section">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-4 col-12 mb-4 mb-lg-0">
                                <div className="custom-block bg-white shadow-lg">
                                    <a href="https://otaghiranonline.ir/">
                                        <div className="d-flex">
                                            <div>
                                                <h5 className="mb-2">پایگاه خبری اتاق ایران آنلاین</h5>

                                                <p className="mb-0">پایگاه خبری اتاق بازرگانی، صنایع، معادن و کشاورزی ایران؛ صدای رسای بخش خصوصی </p>
                                            </div>
                                        </div>

                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb9m3CZmuzIUBqrQjNoJNRgnVIMLcbOj0ZQg&s"
                                            className="custom-block-image img-fluid" alt="" />
                                    </a>
                                </div>
                            </div>

                            <div className="col-lg-6 col-12">
                                <div className="custom-block custom-block-overlay">
                                    <div className="d-flex flex-column h-100">
                                        <img src="images/businesswoman-using-tablet-analysis.jpg"
                                            className="custom-block-image img-fluid" alt="" />

                                        <div className="custom-block-overlay-text d-flex">
                                            <div>
                                                <h5 className="text-white mb-2">گزارش های مرکز پژوهش ها </h5>

                                                <p className="text-white">پژوهش های کاربردی از نگاه بخش خصوصی به نقل از مرکز پژوهش های اتاق ایران </p>

                                                <a href="https://iccima.ir/%d8%b3%d9%84%d8%a7%d9%85%d8%aa-%d8%a7%d8%af%d8%a7%d8%b1%db%8c-%d9%88-%d9%85%d9%82%d8%a7%d8%a8%d9%84%d9%87-%d8%a8%d8%a7-%d9%81%d8%b3%d8%a7%d8%af/%d9%85%d8%b5%d9%88%d8%a8%d8%a7%d8%aa-%d8%a7%d8%aa%d8%a7%d9%82-%d9%87%d8%a7%db%8c-%d9%85%d8%b4%d8%aa%d8%b1%da%a9/" className="btn btn-primary mt-2 mt-lg-3">بیشتر بخوانید</a>
                                            </div>
                                        </div>

                                        <div className="section-overlay"></div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
                <SearchResults dataSearch={dataSearch.data} kws={dataSearch.req}  />
                <HelpSection />
            </div>
        </MainLayout >
    )
}