
import CardResult from "./CardResult";
import { usePage } from '@inertiajs/react'

export default function ExploreArea({ dataSearch, req_params }) {
    const { iccima,_GL } = usePage().props; 

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
                                        <h2> {_GL['explore.listResults']} <span className="badge bg-finance rounded-pill ms-auto">{dataSearch.length}</span></h2>
                                    </div>
                                    {(dataSearch.length) ?
                                        (
                                            <div className="row">

                                                {dataSearch.map((info, ik_loop) => (
                                                    <CardResult key={ik_loop} info={info} />
                                                ))}
                                                {
                                                    (req_params.show_more_btn ?
                                                        (<div className="mt-5 p-2">
                                                            <center>
                                                                <button onClick={handleClickMore} type="button" className="btn btn-warning MoreBtnCards"> <i className="fa fa-search-plus"></i>  {_GL['explore.moreResult']} </button>
                                                            </center>
                                                        </div>) :
                                                        ("")
                                                    )
                                                }

                                            </div>
                                        )
                                        :
                                        (<div>
                                            <div className="alert alert-dark" role="alert">
                                            {_GL['explore.noResults']}
                                            </div>
                                        </div>)
                                    }
                                </div>)
                                :
                                (<div>
                                    <div className="container">
                                        <div className="col-12 text-center">
                                            <h2 style={{
                                                fontSize: "35px"
                                            }} className="mb-4 text-secondary"></h2>
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
