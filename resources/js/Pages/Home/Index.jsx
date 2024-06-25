import { useState,useRef,useEffect } from 'react';
import { Head } from '@inertiajs/react'
import MainLayout from '@/Layouts/MainLayout';

import SearchSection from "../../Components/SearchSection";
import SearchResults from '../../Components/SearchResults';


export default function Index({ ws_s_route,ws_search_get_fv }) {
    
    const TopClickRef = useRef(null);
    const [dataSearch, setDataSearch] = useState([]);

    function handleDataSearch(data) {
        setDataSearch(data);
        console.log(data);
        TopClickRef.current.click();
    }
    useEffect(() => {
        // set loading off !
    }, [dataSearch]);
    return (
        <MainLayout>
            <Head title="خانه" />
            <SearchSection sendDataToIndex={handleDataSearch} ws_s_route={ws_s_route} ws_search_get_fv={ws_search_get_fv} />
            <a ref={TopClickRef}  className="d-none" href="#section_2"></a>
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
            <SearchResults dataSearch={dataSearch.data} kws={dataSearch.req} />
            <section className="timeline-section section-padding" id="section_3">
                <div className="section-overlay"></div>

                <div className="container">
                    <div className="row">

                        <div className="col-12 text-center">
                            <h2 className="text-white mb-4">How does it work?</h2>
                        </div>

                        <div className="col-lg-10 col-12 mx-auto">
                            <div className="timeline-container">
                                <ul className="vertical-scrollable-timeline" id="vertical-scrollable-timeline">
                                    <div className="list-progress">
                                        <div className="inner"></div>
                                    </div>

                                    <li>
                                        <h4 className="text-white mb-3">Search your favourite topic</h4>

                                        <p className="text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                            Reiciendis, cumque magnam? Sequi, cupiditate quibusdam alias illum sed esse ad
                                            dignissimos libero sunt, quisquam numquam aliquam? Voluptas, accusamus omnis?
                                        </p>

                                        <div className="icon-holder">
                                            <i className="bi-search"></i>
                                        </div>
                                    </li>

                                    <li>
                                        <h4 className="text-white mb-3">Bookmark &amp; Keep it for yourself</h4>

                                        <p className="text-white">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint
                                            animi necessitatibus aperiam repudiandae nam omnis est vel quo, nihil repellat
                                            quia velit error modi earum similique odit labore. Doloremque, repudiandae?</p>

                                        <div className="icon-holder">
                                            <i className="bi-bookmark"></i>
                                        </div>
                                    </li>

                                    <li>
                                        <h4 className="text-white mb-3">Read &amp; Enjoy</h4>

                                        <p className="text-white">Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                            Animi vero quisquam, rem assumenda similique voluptas distinctio, iste est hic
                                            eveniet debitis ut ducimus beatae id? Quam culpa deleniti officiis autem?</p>

                                        <div className="icon-holder">
                                            <i className="bi-book"></i>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-12 text-center mt-5">
                            <p className="text-white">
                                Want to learn more?
                                <a href="#" className="btn custom-btn custom-border-btn ms-3">Check out Youtube</a>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="faq-section section-padding" id="section_4">
                <div className="container">
                    <div className="row">

                        <div className="col-lg-6 col-12">
                            <h2 className="mb-4">Frequently Asked Questions</h2>
                        </div>

                        <div className="clearfix"></div>

                        <div className="col-lg-5 col-12">
                            <img src="images/faq_graphic.jpg" className="img-fluid" alt="FAQs" />
                        </div>

                        <div className="col-lg-6 col-12 m-auto">
                            <div className="accordion" id="accordionExample">
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingOne">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse"
                                            data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            What is Topic Listing?
                                        </button>
                                    </h2>

                                    <div id="collapseOne" className="accordion-collapse collapse show"
                                        aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            Topic Listing is free Bootstrap 5 CSS template. <strong>You are not allowed to
                                                redistribute this template</strong> on any other template collection website
                                            without our permission. Please contact TemplateMo for more detail. Thank you.
                                        </div>
                                    </div>
                                </div>

                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingTwo">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                            data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                            How to find a topic?
                                        </button>
                                    </h2>

                                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo"
                                        data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            You can search on Google with <strong>keywords</strong> such as templatemo
                                            portfolio, templatemo one-page layouts, photography, digital marketing, etc.
                                        </div>
                                    </div>
                                </div>

                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingThree">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                            data-bs-target="#collapseThree" aria-expanded="false"
                                            aria-controls="collapseThree">
                                            Does it need to paid?
                                        </button>
                                    </h2>

                                    <div id="collapseThree" className="accordion-collapse collapse"
                                        aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            You can modify any of this with custom CSS or overriding our default variables.
                                            It's also worth noting that just about any HTML can go within the
                                            <code>.accordion-body</code>, though the transition does limit overflow.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            <section className="contact-section section-padding section-bg" id="section_5">
                <div className="container">
                    <div className="row">

                        <div className="col-lg-12 col-12 text-center">
                            <h2 className="mb-5">Get in touch</h2>
                        </div>

                        <div className="col-lg-5 col-12 mb-4 mb-lg-0">

                        </div>

                        <div className="col-lg-3 col-md-6 col-12 mb-3 mb-lg- mb-md-0 ms-auto">
                            <h4 className="mb-3">Head office</h4>

                            <p>Bay St &amp;, Larkin St, San Francisco, CA 94109, United States</p>

                            <hr />

                            <p className="d-flex align-items-center mb-1">
                                <span className="me-2">Phone</span>

                                <a href="tel: 305-240-9671" className="site-footer-link">
                                    305-240-9671
                                </a>
                            </p>

                            <p className="d-flex align-items-center">
                                <span className="me-2">Email</span>

                                <a href="mailto:info@company.com" className="site-footer-link">
                                    info@company.com
                                </a>
                            </p>
                        </div>

                        <div className="col-lg-3 col-md-6 col-12 mx-auto">
                            <h4 className="mb-3">Dubai office</h4>

                            <p>Burj Park, Downtown Dubai, United Arab Emirates</p>

                            <hr />

                            <p className="d-flex align-items-center mb-1">
                                <span className="me-2">Phone</span>

                                <a href="tel: 110-220-3400" className="site-footer-link">
                                    110-220-3400
                                </a>
                            </p>

                            <p className="d-flex align-items-center">
                                <span className="me-2">Email</span>

                                <a href="mailto:info@company.com" className="site-footer-link">
                                    info@company.com
                                </a>
                            </p>
                        </div>

                    </div>
                </div>
            </section>
        </MainLayout >
    )
}