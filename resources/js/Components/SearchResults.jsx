import SearchResultCard from "./SearchResultCard";


export default function SearchResults({ dataSearch, req_params }) {

    function handleClickMore(e) {
        document.getElementById('getMoreApiBtn').click();
    }
    return (
        <section className="explore-section section-padding" id="section_2">
            <div className='container'>
                {
                    req_params ?
                        (<div>
                            <div className="container">
                                <div className="col-12 text-center">
                                    <h2 className="mb-4">نتایج جستجو <span className="badge bg-finance rounded-pill ms-auto">{dataSearch.length}</span></h2>
                                </div>
                            </div>
                            {(dataSearch.length) ?
                                (

                                    <div className="row mr-5 ml-5" id="box-search-results">
                                        
                                            {dataSearch.map((info, ik_loop) => (
                                                    <SearchResultCard key={ik_loop} info={info} />
                                            ))}
                                      
                                        <div className="mt-5 p-2">
                                            <center>
                                                <button onClick={handleClickMore} style={{
                                                    fontSize: '20px',
                                                    padding: '12px',
                                                }} type="button" className="btn btn-warning"> <i className="fa fa-search-plus"></i> بیشتر </button>
                                            </center>
                                        </div>
                                    </div>

                                )
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