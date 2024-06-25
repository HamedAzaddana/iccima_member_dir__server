import SearchResultCard from "./SearchResultCard";

export default function SearchResults({ dataSearch, kws }) {
    return (
        <section className="explore-section section-padding" id="section_2">
            <div className='container'>
                {
                    kws ?
                        (<div>
                            <div className="container">
                                <div className="col-12 text-center">
                                    <h2 className="mb-4">نتایج جستجو <span className="badge bg-finance rounded-pill ms-auto">{dataSearch.length}</span></h2>
                                </div>
                            </div>
                            {(dataSearch.length) ?
                                (<div>
                                    {dataSearch.map((info,ik_loop) => (
                                        <SearchResultCard key={ik_loop} info={info}  />
                                    ))}
                                </div>)
                                :
                                (<div>
                                    <div className="alert alert-dark" role="alert">
                                        نتیجه ای یافت نشد !
                                    </div>
                                </div>)
                            }
                        </div>)
                        :
                        (<div>
                            <div className="container">
                                <div className="col-12 text-center">
                                    <h2 className="mb-4 text-primary"></h2>
                                </div>
                            </div>
                        </div>)
                }


            </div>
        </section>
    );
}