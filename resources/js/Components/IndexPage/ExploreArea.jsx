
import CardResult from "./CardResult";

export default function ExploreArea({ dataSearch, req_params }) {
    const handleClickMore = (e) => {
        document.getElementById('getMoreApiBtn').click();
    }
    return (
        <div>
            <section id="explore" className="explore">
                <div className="container">
                    <div className="explore-content">
                        {
                            req_params ?
                                (<div>
                                    <div className="section-header">
                                        <h2>نتایج جستجو <span className="badge bg-finance rounded-pill ms-auto">{dataSearch.length}</span></h2>
                                    </div>
                                    {(dataSearch.length) ?
                                        (

                                            <div className="row">

                                                {dataSearch.map((info, ik_loop) => (
                                                    <CardResult key={ik_loop} info={info} />
                                                ))}

                                                <div className="mt-5 p-2">
                                                    <center>
                                                        <button onClick={handleClickMore} type="button" className="btn btn-warning MoreBtnCards"> <i className="fa fa-search-plus"></i> بیشتر </button>
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
                                            <h2 style={{
                                                fontSize:"35px"
                                            }} className="mb-4 text-secondary">ابتدا فیلتر خود را انتخاب کرده و سپس جستجو را بزنید !</h2>
                                        </div>
                                    </div>
                                </div>)
                        }

                    </div>
                </div>
            </section>
        </div>
    );
}
