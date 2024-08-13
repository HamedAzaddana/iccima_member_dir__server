

export default function HeaderTop() {

    return (
        <div>
            <header id="header-top" className="header-top">
                <ul>
                    <li>
                        <div className="header-top-left  text-dark">
                            <ul>
                                <li className="select-opt text-dark">
                                    <select name="language" id="language">
                                        <option value="Persian">فارسی</option>
                                        <option value="English">English</option>
                                    </select>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li className="head-responsive-right pull-right">
                        <div className="header-top-right">
                            <ul>
                                <li className="header-top-contact  text-dark">
                                    +21 4444 3333
                                </li>
                                <li className="header-top-contact  text-dark">
                                    <a href="#" className=" text-dark"> <i className="fa fa-user-circle-o"></i> ورود</a>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </header>
        </div>
    );
}
