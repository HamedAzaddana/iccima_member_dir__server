import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import { usePage, Link, Head, createInertiaApp } from "@inertiajs/react";
import Container from "react-bootstrap/cjs/Container.js";
import Nav from "react-bootstrap/cjs/Nav.js";
import Navbar from "react-bootstrap/cjs/Navbar.js";
import axios from "axios";
import Offcanvas from "react-bootstrap/cjs/Offcanvas.js";
import toast, { Toaster } from "react-hot-toast";
import { ReactSession } from "react-client-session";
import TagManager from "react-gtm-module";
import Form from "react-bootstrap/cjs/Form.js";
import Button from "react-bootstrap/cjs/Button.js";
import Modal from "react-bootstrap/cjs/Modal.js";
import MatchHeight from "matchheight";
import createServer from "@inertiajs/react/server";
import ReactDOMServer from "react-dom/server";
const global = "";
const fontAwesome_min = "";
const linearicons = "";
const animate$1 = "";
const flaticon = "";
const bootstrap_min = "";
const bootsnav = "";
const style = "";
const responsive = "";
function HeaderTop() {
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("header", { id: "header-top", className: "header-top" }) });
}
function get_jalali_year(gy, gm, gd) {
  let g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  let jy = 0;
  if (gy > 1600) {
    jy = 979;
    gy -= 1600;
  } else {
    jy = 0;
    gy -= 621;
  }
  let gy2 = gm > 2 ? gy + 1 : gy;
  let days = 365 * gy + parseInt((gy2 + 3) / 4) - parseInt((gy2 + 99) / 100) + parseInt((gy2 + 399) / 400) - 80 + gd + g_d_m[gm - 1];
  jy += 33 * parseInt(days / 12053);
  days %= 12053;
  jy += 4 * parseInt(days / 1461);
  days %= 1461;
  if (days > 365) {
    jy += parseInt((days - 1) / 365);
    days = (days - 1) % 365;
  }
  return jy;
}
function testJSON(text) {
  if (typeof text !== "string") {
    return false;
  }
  try {
    JSON.parse(text);
    return true;
  } catch (error) {
    return false;
  }
}
function iterate_prepare_data(object) {
  let new_obj = {};
  Object.keys(object).forEach((key) => {
    let _val = object[key];
    if (testJSON(_val)) {
      _val = JSON.parse(_val);
    }
    let array_convert_merge_keys = [
      "biz_activitiy_goods",
      // نوع فعالیت array
      "coo_biz_activities",
      // گواهی های مبدا صادر شده array
      "biz_act_goods_hs_codes",
      // کد های hs تجاری array
      "shared_chambers",
      // اتاق های مشترک array
      "specialized_committees",
      // کمیسیون های تخصصی array
      "guild_types"
      // تشکل ها array
    ];
    if (key == "co_establish_date") {
      let lang = browser_session_get("lang_iccima_system");
      let new_val = _val;
      if (lang == "Persian") {
        new_val = _val ? get_jalali_year(_val, 1, 1) : 0;
      }
      let new_key = "year_establishing";
      new_obj[new_key] = new_val;
    }
    if (key == "co_image") {
      let new_val = !_val || _val == "null" ? "" : "data:image/png;base64, " + _val;
      let new_key = "co_image_new";
      new_obj[new_key] = new_val;
    }
    if (key == "owner_image") {
      let new_val = !_val || _val == "null" ? "" : "data:image/png;base64, " + _val;
      let new_key = "owner_image_new";
      new_obj[new_key] = new_val;
    }
    if (array_convert_merge_keys.includes(key)) {
      let new_key = `${key}__merged`;
      let new_val = {};
      if (Array.isArray(_val)) {
        let Persian_str = "";
        let English_str = "";
        _val.forEach((_val_item) => {
          Persian_str += _val_item.Persian ? `${_val_item.Persian} <br>` : "";
          English_str += _val_item.English ? `${_val_item.English} <br>` : "";
        });
        new_val.Persian = Persian_str;
        new_val.English = English_str;
      } else {
        new_val = _val;
      }
      new_obj[new_key] = new_val;
    }
    new_obj[key] = _val;
  });
  return new_obj;
}
function format_at_email_str(email) {
  return email.replace("@", " [at] ");
}
function get_query_param_url(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
  if (!results)
    return null;
  if (!results[2])
    return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
function toEnglishDigits(str) {
  var e = "۰".charCodeAt(0);
  str = str.replace(/[۰-۹]/g, function(t) {
    return t.charCodeAt(0) - e;
  });
  e = "٠".charCodeAt(0);
  str = str.replace(/[٠-٩]/g, function(t) {
    return t.charCodeAt(0) - e;
  });
  return str;
}
function browser_session_set(key, val) {
  ReactSession.setStoreType("sessionStorage");
  ReactSession.set(key, JSON.stringify(val));
}
function browser_session_get(key) {
  if (typeof ReactSession.get(key) != void 0 && ReactSession.get(key)) {
    return JSON.parse(ReactSession.get(key));
  } else {
    return null;
  }
}
function TopArea() {
  const ws_username = "H40MN?jcVE4(Z3LW-3WwZ4;G!wwQxe";
  const ws_password = "jR+VZu7%5beGbNq6TYYSBv&WwPATCuQeRGf4v8Wm%w7$(X#h4SpPEbXyqFweKB3V";
  const { iccima, _GL: _GL2 } = usePage().props;
  const appUrl = "https://plus.iccima.ir";
  const loginSsoUrl = "https://sso.iccima.ir/Login/?returnUrl=https://plus.iccima.ir/authentication/loginSso/&type=1";
  const [showOfCanv, setShowOfCanc] = useState(false);
  const [placementOfCanc, setPlacementOfCanc] = useState("end");
  const handleSelectLang = (e, setter = "", redirect = "") => {
    let _post_data = {};
    if (setter) {
      _post_data = {
        lang: setter
      };
    } else {
      _post_data = {
        lang: e.target.value
      };
    }
    document.getElementById("loading-page-iccima").style.display = "inline-flex";
    axios.post(`${iccima.links.ch_lang}`, _post_data, {
      headers: {
        "ICCIMA-AUTH-USERNAME": `${ws_username}`,
        "ICCIMA-AUTH-PASSWORD": `${ws_password}`
      }
    }).then((res) => {
      document.getElementById("loading-page-iccima").style.display = "none";
      let status_code = res == null ? void 0 : res.status;
      if (status_code == 200 || status_code == 201) {
        var queryParams = new URLSearchParams(window.location.search);
        queryParams.set("lang", _post_data["lang"]);
        history.replaceState(null, null, "?" + queryParams.toString());
        if (redirect) {
          window.location.href = redirect;
        } else {
          window.location.reload();
        }
      } else {
        toast.error(`${_GL2["toast.error"]}`);
      }
    }).catch((err) => {
      var _a, _b, _c, _d, _e;
      document.getElementById("loading-page-iccima").style.display = "none";
      let errors = (_b = (_a = err == null ? void 0 : err.response) == null ? void 0 : _a.data) == null ? void 0 : _b.data;
      if (Array.isArray(errors) && errors) {
        errors.forEach((error_item) => {
          toast.error(`${error_item}`);
        });
      } else {
        toast.error(`${err.message} : ${(_e = (_d = (_c = err == null ? void 0 : err.response) == null ? void 0 : _c.data) == null ? void 0 : _d.data) == null ? void 0 : _e.msg}`);
      }
    });
  };
  const handleNonDo = (e) => {
    e.preventDefault();
  };
  const handleCloseOfCanv = (e) => {
    setShowOfCanc(false);
  };
  const handleShowOfCanv = (e) => {
    e.preventDefault();
    setShowOfCanc(true);
  };
  useEffect(() => {
    if (iccima.user.lang == "English") {
      setPlacementOfCanc("start");
    }
    let lang_qp = get_query_param_url("lang");
    let redirect_qp = get_query_param_url("redirect");
    if ((lang_qp == "Persian" || lang_qp == "English") && redirect_qp == "true") {
      handleSelectLang(null, lang_qp, appUrl);
    }
  }, []);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("section", { className: "top-area", children: /* @__PURE__ */ jsx(Navbar, { collapseOnSelect: true, expand: "lg", className: "bg-body-tertiary", children: /* @__PURE__ */ jsxs(Container, { children: [
      /* @__PURE__ */ jsx(Link, { href: `${appUrl}`, children: /* @__PURE__ */ jsx(Navbar.Brand, { children: /* @__PURE__ */ jsx("img", { style: {
        width: "60px",
        height: "60px",
        borderRadius: "20%",
        filter: "contrast(180%)"
      }, src: "/images/iccima_iran.png", alt: "" }) }) }),
      /* @__PURE__ */ jsx("span", { className: "navbar-title-site", children: _GL2["nav.brand_long"] }),
      /* @__PURE__ */ jsx("span", { className: "navbar-title-site-mobile", children: _GL2["nav.brand_short"] }),
      /* @__PURE__ */ jsx(Navbar.Toggle, { "aria-controls": "responsive-navbar-nav" }),
      /* @__PURE__ */ jsx(Navbar.Collapse, { id: "responsive-navbar-nav", children: /* @__PURE__ */ jsxs(Nav, { className: "me-auto top_nav_app", children: [
        iccima.user.__id && iccima.user.type == "admin" ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs(Link, { className: "nav-link", style: {
            color: "rgb(155, 25, 25)"
          }, onClick: handleShowOfCanv, href: "#", children: [
            " ",
            /* @__PURE__ */ jsx("i", { className: "fa fa-database" }),
            " ",
            _GL2["nav.admin"]
          ] }),
          /* @__PURE__ */ jsxs(
            Offcanvas,
            {
              show: showOfCanv,
              onHide: handleCloseOfCanv,
              backdrop: true,
              placement: placementOfCanc,
              children: [
                /* @__PURE__ */ jsxs(Offcanvas.Header, { closeButton: true, children: [
                  /* @__PURE__ */ jsx("img", { className: "img-offcanvas-site", src: "", alt: "" }),
                  /* @__PURE__ */ jsx(Offcanvas.Title, { className: "text-primary", children: _GL2["nav.admin.ofc.title"] })
                ] }),
                /* @__PURE__ */ jsxs(Offcanvas.Body, { children: [
                  /* @__PURE__ */ jsxs(Link, { className: "nav-link ", href: `${iccima.adminPanel.dashboard}`, children: [
                    " ",
                    /* @__PURE__ */ jsx("i", { className: "fa fa-tachometer" }),
                    " ",
                    _GL2["nav.admin.ofc.dashboard"]
                  ] }),
                  /* @__PURE__ */ jsxs(Link, { className: "nav-link", href: `${iccima.adminPanel.forms}`, children: [
                    " ",
                    /* @__PURE__ */ jsx("i", { className: "fa fa-address-card" }),
                    " ",
                    _GL2["nav.admin.ofc.forms_confirm"]
                  ] })
                ] })
              ]
            }
          )
        ] }) : "",
        /* @__PURE__ */ jsxs(Link, { className: "nav-link", href: `${appUrl}`, children: [
          " ",
          /* @__PURE__ */ jsx("i", { className: "fa fa-home" }),
          " ",
          _GL2["nav.home"]
        ] }),
        /* @__PURE__ */ jsxs(Link, { className: "nav-link", href: `${appUrl}/#`, children: [
          " ",
          /* @__PURE__ */ jsx("i", { className: "fa fa-info-circle" }),
          " ",
          _GL2["nav.hint"]
        ] }),
        iccima.user.__id ? iccima.user.type == "merchant" ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs(Link, { className: "nav-link", style: {
            color: "rgb(155, 25, 25)"
          }, href: iccima.user.spl, children: [
            " ",
            /* @__PURE__ */ jsx("i", { className: "fa fa-user-circle-o" }),
            "  ",
            _GL2["nav.profile"]
          ] }),
          /* @__PURE__ */ jsxs(Link, { className: "nav-link", href: iccima.links.logout, children: [
            " ",
            /* @__PURE__ */ jsx("i", { className: "fa fa-sign-out" }),
            " ",
            _GL2["nav.logout"]
          ] })
        ] }) : /* @__PURE__ */ jsx(Fragment, {}) : /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("a", { className: "nav-link", href: loginSsoUrl, children: [
          " ",
          /* @__PURE__ */ jsx("i", { className: "fa fa-user-circle-o" }),
          " ",
          _GL2["nav.login"],
          " "
        ] }) }),
        /* @__PURE__ */ jsxs(Link, { className: "nav-link", href: "#", onClick: handleNonDo, children: [
          " ",
          /* @__PURE__ */ jsxs("li", { className: "select-opt text-dark", children: [
            /* @__PURE__ */ jsx("i", { className: "fa fa-language" }),
            " ",
            /* @__PURE__ */ jsxs("select", { value: iccima.user.lang, onInput: handleSelectLang, name: "language", id: "language-app-iccima", children: [
              /* @__PURE__ */ jsx("option", { value: "Persian", children: "فارسی" }),
              /* @__PURE__ */ jsx("option", { value: "English", children: "English" })
            ] })
          ] })
        ] })
      ] }) })
    ] }) }) }),
    /* @__PURE__ */ jsx(
      Toaster,
      {
        position: "top-left",
        reverseOrder: true
      }
    )
  ] });
}
function FooterBottom({ cntOnlines }) {
  const { iccima, _GL: _GL2 } = usePage().props;
  let footer_title_1 = _GL2["footer.title_1"];
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("footer", { id: "iccima-footer", className: "footer", children: /* @__PURE__ */ jsx("div", { className: "m-1 p-1", children: /* @__PURE__ */ jsx("div", { className: "footer-menu", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
    /* @__PURE__ */ jsx("div", { className: "col-lg-1 col-md-1 col-sm-12 mb-2", children: /* @__PURE__ */ jsx("div", { className: "navbar-header", children: /* @__PURE__ */ jsx("center", { children: /* @__PURE__ */ jsx("img", { style: {
      width: "60px",
      height: "60px",
      borderRadius: "20%",
      filter: "contrast(180%)"
    }, src: "/images/iccima_iran.png", alt: "" }) }) }) }),
    /* @__PURE__ */ jsx(
      "div",
      {
        dangerouslySetInnerHTML: { __html: footer_title_1 },
        className: "col-lg-9 col-md-9 col-sm-12  text-dark"
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "col-lg-2 col-md-2 col-sm-12 text-success", children: /* @__PURE__ */ jsxs("strong", { children: [
      " ",
      _GL2["footer.online_users"],
      "  ",
      cntOnlines,
      " "
    ] }) })
  ] }) }) }) }) });
}
function LoadingTop() {
  const loadingPageRef = useRef(null);
  function handleGoTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("div", { ref: loadingPageRef, id: "loading-page-iccima", className: "layout-overlay-loading layout-menu-toggle", style: {
      display: "none"
    }, children: /* @__PURE__ */ jsx("img", { src: `https://static.spotapps.co/assets/widgets/loading.gif`, alt: "لطفا منتظر بمانید ..." }) }),
    /* @__PURE__ */ jsx("img", { onClick: handleGoTop, src: "/images/top.png", id: "top-icon", alt: "top" })
  ] });
}
function Main({ children }) {
  const ws_username = "H40MN?jcVE4(Z3LW-3WwZ4;G!wwQxe";
  const ws_password = "jR+VZu7%5beGbNq6TYYSBv&WwPATCuQeRGf4v8Wm%w7$(X#h4SpPEbXyqFweKB3V";
  const gtm_google_id = "G-G0TKJBLS89";
  const { iccima } = usePage().props;
  const [onlines, setOnlines] = useState(0);
  const tagManagerArgs = {
    gtmId: gtm_google_id
  };
  const setAppLang = () => {
    let lang_app_setter = get_query_param_url("lang") && typeof get_query_param_url("lang") != void 0 ? get_query_param_url("lang") : "";
    let validated_lang_qp = "";
    if (lang_app_setter && (lang_app_setter == "Persian" || lang_app_setter == "English")) {
      validated_lang_qp = lang_app_setter;
    }
    let lang_set_app = iccima.user.lang ? iccima.user.lang : validated_lang_qp;
    browser_session_set("lang_iccima_system", lang_set_app);
  };
  const getOnlineUsers = () => {
    axios.post(`${iccima.links.onlines}`, {}, {
      headers: {
        "ICCIMA-AUTH-USERNAME": `${ws_username}`,
        "ICCIMA-AUTH-PASSWORD": `${ws_password}`
      }
    }).then((res) => {
      var _a;
      let status_code = res == null ? void 0 : res.status;
      if (status_code == 200 || status_code == 201) {
        setOnlines((_a = res == null ? void 0 : res.data) == null ? void 0 : _a.data);
      } else {
        toast.error(`${_GL["toast.error"]}`);
      }
    }).catch((err) => {
      var _a, _b, _c, _d, _e;
      let errors = (_b = (_a = err == null ? void 0 : err.response) == null ? void 0 : _a.data) == null ? void 0 : _b.data;
      if (Array.isArray(errors) && errors) {
        errors.forEach((error_item) => {
          toast.error(`${error_item}`);
        });
      } else {
        toast.error(`${err.message} : ${(_e = (_d = (_c = err == null ? void 0 : err.response) == null ? void 0 : _c.data) == null ? void 0 : _d.data) == null ? void 0 : _e.msg}`);
      }
    });
  };
  useEffect(() => {
    setAppLang();
    getOnlineUsers();
    TagManager.initialize(tagManagerArgs);
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: `app-lang-${iccima.user.lang}`, children: [
    /* @__PURE__ */ jsx(HeaderTop, {}),
    /* @__PURE__ */ jsx(TopArea, {}),
    /* @__PURE__ */ jsx("div", { id: "iccima-main-content-layout", children }),
    /* @__PURE__ */ jsx(FooterBottom, { cntOnlines: onlines }),
    /* @__PURE__ */ jsx(LoadingTop, {}),
    /* @__PURE__ */ jsx(
      Toaster,
      {
        position: "top-left",
        reverseOrder: true
      }
    )
  ] });
}
function Dashboard({}) {
  usePage().props;
  useEffect(() => {
  }, []);
  return /* @__PURE__ */ jsx(Main, { children: /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(Head, { title: "داشبورد مدیریت" }),
    /* @__PURE__ */ jsx("div", {})
  ] }) });
}
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Dashboard
}, Symbol.toStringTag, { value: "Module" }));
function Forms({}) {
  var _a, _b, _c;
  const ws_username = "H40MN?jcVE4(Z3LW-3WwZ4;G!wwQxe";
  const ws_password = "jR+VZu7%5beGbNq6TYYSBv&WwPATCuQeRGf4v8Wm%w7$(X#h4SpPEbXyqFweKB3V";
  const [dataRecords, setDataRecords] = useState([]);
  const { iccima, _GL: _GL2 } = usePage().props;
  const fetchSingleData = async (page = 1) => {
    let _post_data = {
      page
    };
    document.getElementById("loading-page-iccima").style.display = "inline-flex";
    try {
      const response = await axios.post(`${iccima.ws.admin.forms}`, _post_data, {
        headers: {
          "ICCIMA-AUTH-USERNAME": `${ws_username}`,
          "ICCIMA-AUTH-PASSWORD": `${ws_password}`
        }
      });
      document.getElementById("loading-page-iccima").style.display = "none";
      console.log(response.data.data);
      setDataRecords(response.data.data);
    } catch (error) {
      document.getElementById("loading-page-iccima").style.display = "none";
      toast.error(`Error fetching single data : ${error.message}`);
      error.response.status;
      console.log(error);
    }
  };
  const handleChangePage = (e) => {
    e.preventDefault();
    let href = e.currentTarget.getAttribute("href");
    let current_page = get_query_param_url("page", href);
    fetchSingleData(current_page);
  };
  const handleChangeConfirm = (e) => {
    changeStatus(e.currentTarget.getAttribute("data-hid"), e.currentTarget.getAttribute("data-status"));
  };
  const handleChangeShowIndex = (e) => {
    changeShowIndex(e.currentTarget.getAttribute("data-hid"), e.currentTarget.getAttribute("data-status"));
  };
  const changeStatus = async (hid = "", status = 0) => {
    let _post_data = {
      status,
      hid
    };
    document.getElementById("loading-page-iccima").style.display = "inline-flex";
    try {
      const response = await axios.post(`${iccima.ws.admin.form_status}`, _post_data, {
        headers: {
          "ICCIMA-AUTH-USERNAME": `${ws_username}`,
          "ICCIMA-AUTH-PASSWORD": `${ws_password}`
        }
      });
      document.getElementById("loading-page-iccima").style.display = "none";
      toast.success(`${_GL2["toast.edited_success"]}`);
      console.log(response.data.data);
      fetchSingleData();
    } catch (error) {
      document.getElementById("loading-page-iccima").style.display = "none";
      toast.error(`Error fetching single data : ${error.message}`);
      error.response.status;
      console.log(error);
    }
  };
  const changeShowIndex = async (hid = "", status = 0) => {
    let _post_data = {
      status,
      hid
    };
    document.getElementById("loading-page-iccima").style.display = "inline-flex";
    try {
      const response = await axios.post(`${iccima.ws.admin.form_show_in_index}`, _post_data, {
        headers: {
          "ICCIMA-AUTH-USERNAME": `${ws_username}`,
          "ICCIMA-AUTH-PASSWORD": `${ws_password}`
        }
      });
      document.getElementById("loading-page-iccima").style.display = "none";
      toast.success(`${_GL2["toast.edited_success"]}`);
      console.log(response.data.data);
      fetchSingleData();
    } catch (error) {
      document.getElementById("loading-page-iccima").style.display = "none";
      toast.error(`Error fetching single data : ${error.message}`);
      error.response.status;
      console.log(error);
    }
  };
  useEffect(() => {
    fetchSingleData();
  }, []);
  return /* @__PURE__ */ jsx(Main, { children: /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(Head, { title: "فرم های خود اظهاری" }),
    dataRecords ? /* @__PURE__ */ jsxs("div", { className: "table-responsive p-3 m-2 table-iccima-center-all", children: [
      /* @__PURE__ */ jsxs("table", { className: "table table-striped", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { scope: "col", children: "#" }),
          /* @__PURE__ */ jsx("th", { scope: "col", children: _GL2["admin.forms.tbl.fullname"] }),
          /* @__PURE__ */ jsx("th", { scope: "col", children: _GL2["admin.forms.tbl.show_form"] }),
          /* @__PURE__ */ jsx("th", { scope: "col", children: _GL2["admin.forms.tbl.show_date"] }),
          /* @__PURE__ */ jsx("th", { scope: "col", children: _GL2["admin.forms.tbl.operation"] }),
          /* @__PURE__ */ jsx("th", { scope: "col", children: _GL2["admin.forms.tbl.show_index"] })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: (_a = dataRecords == null ? void 0 : dataRecords.data) == null ? void 0 : _a.map((itemRecord, ik_loop) => /* @__PURE__ */ jsxs("tr", { className: itemRecord.confirmed ? `table-success` : `table-danger`, children: [
          /* @__PURE__ */ jsx("th", { scope: "row", children: ik_loop + 1 }),
          /* @__PURE__ */ jsx("td", { children: itemRecord.original_user._owner_fullname ? itemRecord.original_user._owner_fullname.toString() : itemRecord.original_user._co_title.toString() }),
          /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("a", { className: "btn btn-primary p-1", href: itemRecord._spl.toString(), target: "_blank", children: /* @__PURE__ */ jsx("i", { className: "fa fa-info-circle" }) }) }),
          /* @__PURE__ */ jsx("td", { children: itemRecord._jalali_updated_at.toString() }),
          /* @__PURE__ */ jsx("td", { children: itemRecord.confirmed ? /* @__PURE__ */ jsx("button", { "data-status": 0, "data-hid": itemRecord._id, onClick: handleChangeConfirm, title: _GL2["admin.forms.tbl.unconfirm"], type: "button", className: "btn btn-danger p-1", children: /* @__PURE__ */ jsx("i", { className: "fa fa-times" }) }) : /* @__PURE__ */ jsx("button", { "data-status": 1, "data-hid": itemRecord._id, onClick: handleChangeConfirm, title: _GL2["admin.forms.tbl.confirm"], type: "button", className: "btn btn-success p-1", children: /* @__PURE__ */ jsx("i", { className: "fa fa-check" }) }) }),
          /* @__PURE__ */ jsx("td", { children: itemRecord._show_in_index ? /* @__PURE__ */ jsx("button", { "data-status": 0, "data-hid": itemRecord._id, onClick: handleChangeShowIndex, title: _GL2["admin.forms.tbl.unshow_index_title"], type: "button", className: "btn btn-outline-danger p-1", children: /* @__PURE__ */ jsx("i", { className: "fa fa-times" }) }) : /* @__PURE__ */ jsx("button", { "data-status": 1, "data-hid": itemRecord._id, onClick: handleChangeShowIndex, title: _GL2["admin.forms.tbl.show_index_title"], type: "button", className: "btn btn-outline-success p-1", children: /* @__PURE__ */ jsx("i", { className: "fa fa-check" }) }) })
        ] }, ik_loop + 1)) })
      ] }),
      ((_b = dataRecords == null ? void 0 : dataRecords.links) == null ? void 0 : _b.length) != 3 ? /* @__PURE__ */ jsx("div", { className: "mt-5", children: /* @__PURE__ */ jsx("nav", { "aria-label": "Page navigation example", children: /* @__PURE__ */ jsx("ul", { className: "pagination justify-content-center", children: (_c = dataRecords == null ? void 0 : dataRecords.links) == null ? void 0 : _c.map(
        (paginItem, ik_loop) => /* @__PURE__ */ jsx("li", { className: `page-item ${!paginItem.url ? "disabled" : ""} ${paginItem.active ? "active" : ""}`, children: /* @__PURE__ */ jsx("a", { onClick: handleChangePage, className: "page-link", href: paginItem.url, tabIndex: "-1", "aria-disabled": "true", children: paginItem.label == "pagination.previous" ? "<" : paginItem.label == "pagination.next" ? ">" : paginItem.label }) }, ik_loop + 1)
      ) }) }) }) : ""
    ] }) : /* @__PURE__ */ jsx("div", { className: "placeholder-single-content", children: /* @__PURE__ */ jsx("img", { src: "/images/placeholder-loading-iccima-1.gif", alt: "در حال بازگذاری ..." }) }),
    /* @__PURE__ */ jsx(
      Toaster,
      {
        position: "top-left",
        reverseOrder: true
      }
    )
  ] }) });
}
const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Forms
}, Symbol.toStringTag, { value: "Module" }));
function WelcomHero({ ws_s_route, ws_search_get_fv, sendDataToIndex }) {
  var _a, _b, _c, _d;
  const { iccima, _GL: _GL2 } = usePage().props;
  const ws_username = "H40MN?jcVE4(Z3LW-3WwZ4;G!wwQxe";
  const ws_password = "jR+VZu7%5beGbNq6TYYSBv&WwPATCuQeRGf4v8Wm%w7$(X#h4SpPEbXyqFweKB3V";
  const [filters, setFilters] = useState([]);
  let default_filters = {
    kws: "",
    province: "",
    group_act_type: ""
  };
  const [values, setValues] = useState(default_filters);
  const SubmitBtn = useRef(null);
  const fetchDatafilters = async () => {
    try {
      const response = await axios.post(`${ws_search_get_fv}`, {}, {
        headers: {
          "ICCIMA-AUTH-USERNAME": `${ws_username}`,
          "ICCIMA-AUTH-PASSWORD": `${ws_password}`
        }
      });
      setFilters(response.data.data);
    } catch (error) {
      document.getElementById("loading-page-iccima").style.display = "none";
      toast.error(`Error fetching data : ${error.message}`);
      console.log(error);
    }
  };
  const getMoreRApi = (e) => {
    getDataPrepare(e, 1);
  };
  const getDataPrepare = (e, is_more = 0) => {
    let _post_data = values;
    if (is_more) {
      _post_data = {
        ..._post_data,
        more: 1
      };
    }
    e.preventDefault();
    console.log(_post_data);
    document.getElementById("loading-page-iccima").style.display = "inline-flex";
    axios.post(`${ws_s_route}`, _post_data, {
      headers: {
        "ICCIMA-AUTH-USERNAME": `${ws_username}`,
        "ICCIMA-AUTH-PASSWORD": `${ws_password}`
      }
    }).then((res) => {
      sendDataToIndex(res.data, is_more);
    }).catch((err) => {
      document.getElementById("loading-page-iccima").style.display = "none";
      toast.error(`${err.message}`);
    });
  };
  const handleSearch = (e) => {
    getDataPrepare(e);
  };
  const handleClickTopicV = (e) => {
    var _a2, _b2, _c2;
    let fiv = (_b2 = (_a2 = e == null ? void 0 : e.currentTarget) == null ? void 0 : _a2.getAttribute("fiv")) == null ? void 0 : _b2.toString();
    (_c2 = document.querySelector(`.single-list-topics-content .form-switch input.${fiv}`)) == null ? void 0 : _c2.click();
  };
  const handleKeyType = (e) => {
    if (e.key === "Enter") {
      setTimeout(function() {
        document.getElementById("btn-do-search").click();
      }, 500);
    }
  };
  const handleChangeVs = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    setValues((values2) => ({
      ...values2,
      [key]: value
    }));
  };
  const handleChangeVsReactive = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    setValues((values2) => ({
      ...values2,
      [key]: value
    }));
    setTimeout(function() {
      document.getElementById("btn-do-search").click();
    }, 500);
  };
  const focusInputS1 = (e) => {
    document.getElementById("kws").focus();
  };
  useEffect(() => {
    fetchDatafilters();
  }, []);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("section", { id: "home", className: "welcome-hero", children: [
      /* @__PURE__ */ jsx("button", { onClick: getMoreRApi, id: "getMoreApiBtn", className: "d-none" }),
      /* @__PURE__ */ jsxs("div", { className: "top-content-container", children: [
        /* @__PURE__ */ jsxs("div", { className: "welcome-hero-txt", children: [
          /* @__PURE__ */ jsxs("h2", { children: [
            " ",
            _GL2["welocom.tip"],
            " "
          ] }),
          /* @__PURE__ */ jsx("p", { children: _GL2["welocom.title"] })
        ] }),
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", { className: "welcome-hero-serch-box row", children: [
          /* @__PURE__ */ jsx("div", { className: "col-md-4 col-lg-3 col-sm-12 InputS1", onClick: focusInputS1, children: /* @__PURE__ */ jsxs("div", { className: "single-welcome-hero-form", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                id: "kws",
                className: "text-dark",
                value: values.kws,
                onChange: handleChangeVs,
                onKeyDown: handleKeyType,
                type: "text",
                placeholder: _GL2["welocom.plchldrInput"]
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "welcome-hero-form-icon", children: /* @__PURE__ */ jsx("i", { className: "flaticon-list-with-dots" }) })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "col-md-4 col-lg-3 col-sm-12 mt-4 InputS2", children: /* @__PURE__ */ jsxs("div", { style: {
            width: "100%",
            border: 0
          }, className: "single-welcome-hero-form", children: [
            /* @__PURE__ */ jsxs(Form.Select, { className: "without-icon SelectProvince", onChange: handleChangeVs, defaultValue: "null", id: "province", children: [
              /* @__PURE__ */ jsxs("option", { value: "all", children: [
                " ",
                _GL2["welocom.plchldrProvince"],
                " "
              ] }),
              ((_a = filters == null ? void 0 : filters.provinces) == null ? void 0 : _a.length) ? /* @__PURE__ */ jsx(Fragment, { children: (_b = filters == null ? void 0 : filters.provinces) == null ? void 0 : _b.map((item, item_index) => /* @__PURE__ */ jsx("option", { value: item.value, children: item.label }, item_index)) }) : /* @__PURE__ */ jsx(Fragment, {})
            ] }),
            /* @__PURE__ */ jsx("div", { className: "welcome-hero-form-icon", style: {
              right: "42px"
            }, children: /* @__PURE__ */ jsx("i", { className: "flaticon-gps-fixed-indicator" }) })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "col-md-4 col-lg-3 col-sm-12 mt-4 InputS2", children: /* @__PURE__ */ jsxs("div", { style: {
            width: "100%",
            border: 0
          }, className: "single-welcome-hero-form", children: [
            /* @__PURE__ */ jsxs(Form.Select, { className: "without-icon SelectProvince", onChange: handleChangeVs, defaultValue: "null", id: "activity_str", children: [
              /* @__PURE__ */ jsxs("option", { value: "all", children: [
                " ",
                _GL2["welocom.plchldrActivityStr"],
                " "
              ] }),
              ((_c = filters == null ? void 0 : filters.activity_str_search) == null ? void 0 : _c.length) ? /* @__PURE__ */ jsx(Fragment, { children: (_d = filters == null ? void 0 : filters.activity_str_search) == null ? void 0 : _d.map((item, item_index) => /* @__PURE__ */ jsx("option", { value: item.value, children: item.label }, item_index)) }) : /* @__PURE__ */ jsx(Fragment, {})
            ] }),
            /* @__PURE__ */ jsx("div", { className: "welcome-hero-form-icon", style: {
              right: "42px"
            }, children: /* @__PURE__ */ jsx("i", { className: "fa fa-quote-right" }) })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "col-md-1 col-lg-1 col-sm-12 mt-4 InputS3", children: /* @__PURE__ */ jsx("center", { children: /* @__PURE__ */ jsxs("button", { onClick: handleSearch, id: "btn-do-search", ref: SubmitBtn, type: "submit", className: "form-control btn btn-danger mb-4", children: [
            " ",
            _GL2["welocom.btnSearch"],
            " ",
            /* @__PURE__ */ jsx("i", { className: "fa fa-search" })
          ] }) }) })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { id: "list-topics", className: "list-topics", children: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("div", { className: "list-topics-content", children: /* @__PURE__ */ jsxs("ul", { children: [
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
        "div",
        {
          className: "single-list-topics-content",
          fiv: "group_act_type_v1",
          onClick: handleClickTopicV,
          children: [
            /* @__PURE__ */ jsx("div", { className: "single-list-topics-icon", children: /* @__PURE__ */ jsx("i", { className: "fa fa-cogs" }) }),
            /* @__PURE__ */ jsx("h2", { children: _GL2["welocom.boxIndustry"] }),
            /* @__PURE__ */ jsx("div", { className: "form-check form-switch", children: /* @__PURE__ */ jsx(
              "input",
              {
                className: "form-check-input group_act_type_v1",
                type: "radio",
                id: "group_act_type",
                name: "group_act_type",
                value: _GL2["welocom.boxIndustry"],
                onChange: handleChangeVsReactive
              }
            ) })
          ]
        }
      ) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
        "div",
        {
          className: "single-list-topics-content",
          fiv: "group_act_type_v2",
          onClick: handleClickTopicV,
          children: [
            /* @__PURE__ */ jsx("div", { className: "single-list-topics-icon", children: /* @__PURE__ */ jsx("i", { className: "fa fa-address-card" }) }),
            /* @__PURE__ */ jsx("h2", { children: _GL2["welocom.boxCommerce"] }),
            /* @__PURE__ */ jsx("div", { className: "form-check form-switch", children: /* @__PURE__ */ jsx(
              "input",
              {
                className: "form-check-input group_act_type_v2",
                type: "radio",
                id: "group_act_type",
                value: _GL2["welocom.boxCommerce"],
                name: "group_act_type",
                onChange: handleChangeVsReactive
              }
            ) })
          ]
        }
      ) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
        "div",
        {
          className: "single-list-topics-content",
          fiv: "group_act_type_v3",
          onClick: handleClickTopicV,
          children: [
            /* @__PURE__ */ jsx("div", { className: "single-list-topics-icon", children: /* @__PURE__ */ jsx("i", { className: "fa fa-leaf" }) }),
            /* @__PURE__ */ jsx("h2", { children: _GL2["welocom.boxAgri"] }),
            /* @__PURE__ */ jsx("div", { className: "form-check form-switch", children: /* @__PURE__ */ jsx(
              "input",
              {
                className: "form-check-input group_act_type_v3",
                type: "radio",
                id: "group_act_type",
                value: _GL2["welocom.boxAgri"],
                name: "group_act_type",
                onChange: handleChangeVsReactive
              }
            ) })
          ]
        }
      ) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
        "div",
        {
          className: "single-list-topics-content",
          fiv: "group_act_type_v4",
          onClick: handleClickTopicV,
          children: [
            /* @__PURE__ */ jsx("div", { className: "single-list-topics-icon", children: /* @__PURE__ */ jsx("i", { className: "fa fa-diamond" }) }),
            /* @__PURE__ */ jsx("h2", { children: _GL2["welocom.boxMine"] }),
            /* @__PURE__ */ jsx("div", { className: "form-check form-switch", children: /* @__PURE__ */ jsx(
              "input",
              {
                className: "form-check-input group_act_type_v4",
                type: "radio",
                id: "group_act_type",
                value: _GL2["welocom.boxMine"],
                name: "group_act_type",
                onChange: handleChangeVsReactive
              }
            ) })
          ]
        }
      ) })
    ] }) }) }) }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
      Toaster,
      {
        position: "top-left",
        reverseOrder: true
      }
    ) })
  ] });
}
function CardResult({ info }) {
  const { iccima, _GL: _GL2 } = usePage().props;
  const handleNonDo = (e) => {
    e.preventDefault();
  };
  let card_info = iterate_prepare_data(info);
  let card_type_id = parseInt(card_info.card_type_id);
  parseInt(card_info.person_type_id);
  !card_info.co_image || card_info.co_image == "null" ? "https://cdn-icons-png.flaticon.com/512/9371/9371369.png" : "data:image/png;base64, " + card_info.co_image;
  let owner_image = !card_info.owner_image || card_info.owner_image == "null" ? "https://static-00.iconduck.com/assets.00/user-icon-2048x2048-ihoxz4vq.png" : "data:image/png;base64, " + card_info.owner_image;
  let co_title = card_info.co_title;
  let owner_fullname = card_info.owner_fullname;
  let co_type = card_info.co_type;
  let biz_activities = card_info.biz_activities;
  let biz_activities_html = biz_activities[iccima.user.lang.toString()] ? biz_activities[iccima.user.lang.toString()] : "";
  let city = card_info.city;
  let cover_image = !card_info.co_image || card_info.co_image == "null" ? owner_image : "data:image/png;base64, " + card_info.co_image;
  let year_locale_established = card_info.year_establishing;
  let co_phone = card_info.co_phone;
  let co_fax = card_info.co_fax;
  let co_website = card_info == null ? void 0 : card_info.co_website;
  console.log(co_website);
  let spl = card_info.spl;
  return /* @__PURE__ */ jsx("div", { className: "col-lg-12 col-md-12 col-sm-12 animate__animated animate__fadeIn animate__delay-0.7s wow", children: /* @__PURE__ */ jsx("div", { className: "single-explore-item", children: /* @__PURE__ */ jsx("div", { className: "single-explore-txt bg-theme-1", children: /* @__PURE__ */ jsxs("div", { className: "row CardResultContent", children: [
    /* @__PURE__ */ jsx("div", { className: "col-md-2 col-lg-2 col-sm-12 mt-3", children: /* @__PURE__ */ jsx("div", { className: "explore-person-img", children: /* @__PURE__ */ jsx("a", { href: "#", onClick: handleNonDo, children: /* @__PURE__ */ jsx("img", { className: "user-profile-cr", src: cover_image, alt: owner_fullname[iccima.user.lang.toString()] ? owner_fullname[iccima.user.lang.toString()] : co_title[iccima.user.lang.toString()] }) }) }) }),
    /* @__PURE__ */ jsxs("div", { className: "col-md-6 col-lg-6 col-sm-12 mt-3", children: [
      /* @__PURE__ */ jsx("h6", { className: "mt-1 pt-1 text-danger", children: /* @__PURE__ */ jsx("strong", { children: co_title[iccima.user.lang.toString()] }) }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 pt-1 text-dark", children: /* @__PURE__ */ jsx("strong", { children: owner_fullname[iccima.user.lang.toString()] ? owner_fullname[iccima.user.lang.toString()] : co_title[iccima.user.lang.toString()] }) }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 pt-1 text-dark", children: /* @__PURE__ */ jsxs("strong", { children: [
        co_type[iccima.user.lang.toString()],
        " ",
        year_locale_established ? ` , ${_GL2["cardResult.establish"]} ${year_locale_established}` : ""
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "mt-1 pt-1 text-dark text-justify", dangerouslySetInnerHTML: { __html: biz_activities_html } }),
      /* @__PURE__ */ jsx("br", {}),
      /* @__PURE__ */ jsxs("strong", { children: [
        " ",
        /* @__PURE__ */ jsx("i", { className: "fa fa-map-marker" }),
        " ",
        city[iccima.user.lang.toString()]
      ] }),
      "   |   ",
      /* @__PURE__ */ jsxs("strong", { children: [
        " ",
        /* @__PURE__ */ jsx("i", { className: "fa fa-id-card-o" }),
        " ",
        card_type_id == 2 ? `${_GL2["cardResult.ozviat"]}` : `${_GL2["cardResult.bazargani"]}`
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "col-md-3 col-lg-3 col-sm-12 mt-3 ContactsPartCardRs", children: [
      co_phone ? /* @__PURE__ */ jsxs("p", { className: "mt-1 p-1", children: [
        /* @__PURE__ */ jsxs("a", { className: "text-dark", href: `tel:+${co_phone}`, children: [
          " ",
          /* @__PURE__ */ jsx("i", { className: "fa fa-phone" }),
          " ",
          /* @__PURE__ */ jsx("strong", { children: co_phone })
        ] }),
        " "
      ] }) : "",
      co_fax ? /* @__PURE__ */ jsxs("p", { className: "mt-1 p-1", children: [
        /* @__PURE__ */ jsxs("a", { className: "text-dark", href: `fax:+${co_fax}`, children: [
          " ",
          /* @__PURE__ */ jsx("i", { className: "fa fa-fax" }),
          " ",
          /* @__PURE__ */ jsx("strong", { children: co_fax })
        ] }),
        " "
      ] }) : "",
      co_website ? /* @__PURE__ */ jsxs("p", { className: "mt-1 p-1 card-result-website", children: [
        /* @__PURE__ */ jsxs("a", { className: "text-dark toLowerCase-text", target: "_blank", href: `${co_website}`, children: [
          " ",
          /* @__PURE__ */ jsx("i", { className: "fa fa-globe" }),
          " ",
          /* @__PURE__ */ jsx("strong", { children: co_website })
        ] }),
        " "
      ] }) : "",
      /* @__PURE__ */ jsxs(Link, { style: {
        width: "max-content",
        fontSize: "12px",
        padding: "5px"
      }, className: "btn btn-sm btn-outline-secondary", href: spl, children: [
        " ",
        /* @__PURE__ */ jsx("i", { className: "fa fa-exclamation-circle" }),
        "  ",
        _GL2["cardResult.btnDetail"],
        " "
      ] })
    ] })
  ] }) }) }) });
}
function ExploreArea({ dataSearch, req_params }) {
  const { iccima, _GL: _GL2 } = usePage().props;
  const ws_username = "H40MN?jcVE4(Z3LW-3WwZ4;G!wwQxe";
  const ws_password = "jR+VZu7%5beGbNq6TYYSBv&WwPATCuQeRGf4v8Wm%w7$(X#h4SpPEbXyqFweKB3V";
  const [showCaptcha, setShowCaptcha] = useState(false);
  const handleCloseCaptcha = (e) => setShowCaptcha(false);
  const handleShowCaptcha = (e) => {
    handleMakeCaptcha();
    setShowCaptcha(true);
  };
  const handleClickMore = (e) => {
    document.getElementById("getMoreApiBtn").click();
  };
  const handleValidateCaptcha = (e) => {
    let continue_code = toEnglishDigits(document.getElementById("field-captcha-text").value);
    let _post_data = {
      continue_code
    };
    axios.post(`${iccima.links.validate_captcha}`, _post_data, {
      headers: {
        "ICCIMA-AUTH-USERNAME": `${ws_username}`,
        "ICCIMA-AUTH-PASSWORD": `${ws_password}`
      }
    }).then((res) => {
      console.log(res);
      let status_code = res == null ? void 0 : res.status;
      if (status_code == 200 || status_code == 201) {
        handleClickMore();
        handleCloseCaptcha();
      } else {
        handleMakeCaptcha();
        toast.error(`${_GL2["toast.error"]}`);
      }
    }).catch((err) => {
      var _a, _b, _c, _d, _e;
      console.log(err);
      let errors = (_b = (_a = err == null ? void 0 : err.response) == null ? void 0 : _a.data) == null ? void 0 : _b.data;
      if (Array.isArray(errors) && errors) {
        errors.forEach((error_item) => {
          toast.error(`${error_item}`);
        });
      } else {
        toast.error(`${(_e = (_d = (_c = err == null ? void 0 : err.response) == null ? void 0 : _c.data) == null ? void 0 : _d.data) == null ? void 0 : _e.msg}`);
      }
      handleMakeCaptcha();
    });
  };
  const handleMakeCaptcha = (e) => {
    axios.post(`${iccima.links.get_captcha}`, {}, {
      headers: {
        "ICCIMA-AUTH-USERNAME": `${ws_username}`,
        "ICCIMA-AUTH-PASSWORD": `${ws_password}`
      }
    }).then((res) => {
      var _a, _b;
      let status_code = res == null ? void 0 : res.status;
      if ((status_code == 200 || status_code == 201) && ((_a = res == null ? void 0 : res.data) == null ? void 0 : _a.captcha)) {
        document.getElementById("captcha-img-iccima").src = (_b = res == null ? void 0 : res.data) == null ? void 0 : _b.captcha;
        document.getElementById("field-captcha-text").focus();
        document.getElementById("captcha-img-iccima").style.display = "block";
      } else {
        toast.error(`${_GL2["toast.error"]}`);
      }
    }).catch((err) => {
      var _a, _b, _c, _d, _e;
      let errors = (_b = (_a = err == null ? void 0 : err.response) == null ? void 0 : _a.data) == null ? void 0 : _b.data;
      if (Array.isArray(errors) && errors) {
        errors.forEach((error_item) => {
          toast.error(`${error_item}`);
        });
      } else {
        toast.error(`${(_e = (_d = (_c = err == null ? void 0 : err.response) == null ? void 0 : _c.data) == null ? void 0 : _d.data) == null ? void 0 : _e.msg}`);
      }
    });
  };
  return /* @__PURE__ */ jsx("div", { id: "explore", className: !(dataSearch == null ? void 0 : dataSearch.length) ? "explore-parent-div" : "", children: /* @__PURE__ */ jsxs("section", { className: "explore", children: [
    /* @__PURE__ */ jsx("div", { className: "container-explore-area", children: /* @__PURE__ */ jsx("div", { className: "explore-content", children: req_params ? /* @__PURE__ */ jsx("div", { children: dataSearch.length ? /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("div", { className: "section-header", children: /* @__PURE__ */ jsxs("h2", { children: [
        " ",
        _GL2["explore.listResults"],
        " ",
        /* @__PURE__ */ jsx("span", { className: "badge bg-finance rounded-pill ms-auto", children: dataSearch.length })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "row", children: [
        dataSearch.map((info, ik_loop) => /* @__PURE__ */ jsx(CardResult, { info }, ik_loop)),
        req_params.show_more_btn ? /* @__PURE__ */ jsx("div", { className: "mt-5 p-2", children: /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("center", { children: /* @__PURE__ */ jsx(Button, { className: "btn btn-warning MoreBtnCards", onClick: handleShowCaptcha, children: _GL2["explore.moreResult"] }) }),
          /* @__PURE__ */ jsx("div", { className: "iccima-modal", children: /* @__PURE__ */ jsxs(Modal, { dir: `${iccima.user.lang == "Persian" ? "rtl" : "ltr"}`, show: showCaptcha, onHide: handleCloseCaptcha, children: [
            /* @__PURE__ */ jsxs(Modal.Body, { children: [
              /* @__PURE__ */ jsx("p", { children: _GL2["explore.captcha.label"] }),
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx("center", { children: /* @__PURE__ */ jsx("img", { id: "captcha-img-iccima", src: "", alt: "" }) }),
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsxs("div", { className: "row", children: [
                /* @__PURE__ */ jsx("div", { className: "col-lg-10 col-md-10 col-sm-10", children: /* @__PURE__ */ jsx("input", { id: "field-captcha-text", type: "text", className: "text-dark form-control" }) }),
                /* @__PURE__ */ jsx("div", { className: "col-lg-2 col-md-2 col-sm-2", children: /* @__PURE__ */ jsx("button", { onClick: handleMakeCaptcha, type: "button", className: "btn ", children: /* @__PURE__ */ jsx("i", { className: "fa fa-refresh" }) }) })
              ] })
            ] }),
            /* @__PURE__ */ jsxs(Modal.Footer, { children: [
              /* @__PURE__ */ jsx(Button, { variant: "secondary", onClick: handleCloseCaptcha, children: _GL2["explore.captcha.btnClose"] }),
              /* @__PURE__ */ jsx(Button, { onClick: handleValidateCaptcha, className: "btn btn-success", children: _GL2["explore.captcha.btnSubmit"] })
            ] })
          ] }) })
        ] }) }) : ""
      ] }),
      "ّ"
    ] }) : /* @__PURE__ */ jsx("div", {}) }) : /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsx("div", { className: "col-12 text-center", children: /* @__PURE__ */ jsx("h2", { style: {
      fontSize: "35px"
    }, className: "mb-4 text-secondary" }) }) }) }) }) }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
      Toaster,
      {
        position: "top-left",
        reverseOrder: true
      }
    ) })
  ] }) });
}
const animate = "";
function Index({ ws_s_route, ws_search_get_fv }) {
  const TopClickRef = useRef(null);
  const [dataSearch, setDataSearch] = useState([]);
  const handleDataSearch = (data, is_more) => {
    setDataSearch(data);
    console.log(data);
    if (!is_more) {
      TopClickRef.current.click();
    }
  };
  useEffect(() => {
    document.getElementById("loading-page-iccima").style.display = "none";
    new MatchHeight();
  }, [dataSearch]);
  return /* @__PURE__ */ jsx(Main, { children: /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(Head, { title: "" }),
    /* @__PURE__ */ jsx(
      WelcomHero,
      {
        sendDataToIndex: handleDataSearch,
        ws_s_route,
        ws_search_get_fv
      }
    ),
    /* @__PURE__ */ jsx(
      ExploreArea,
      {
        dataSearch: dataSearch.data,
        req_params: dataSearch.req
      }
    ),
    /* @__PURE__ */ jsx("a", { ref: TopClickRef, className: "d-none", href: "#explore" })
  ] }) });
}
const __vite_glob_0_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index
}, Symbol.toStringTag, { value: "Module" }));
function SingleMerchant$1({ slug, hid, route_ws_get_single, route_404_page, route_ws_saveVals, route_ws_delBrImg }) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
  const ws_username = "H40MN?jcVE4(Z3LW-3WwZ4;G!wwQxe";
  const ws_password = "jR+VZu7%5beGbNq6TYYSBv&WwPATCuQeRGf4v8Wm%w7$(X#h4SpPEbXyqFweKB3V";
  const [uploadedBrImg, setUploadedBrImg] = useState("");
  const [forms, setForms] = useState(null);
  const [dataSingle, setDataSingle] = useState([]);
  const { iccima, _GL: _GL2 } = usePage().props;
  const handleChangeVs = (e) => {
    var _a2, _b2;
    const key = e.target.id;
    const value = (_b2 = (_a2 = e == null ? void 0 : e.target) == null ? void 0 : _a2.value) == null ? void 0 : _b2.toString();
    setForms((forms2) => ({
      ...forms2,
      [key]: value
    }));
  };
  const handleChangeFile = (e) => {
    const key = e.target.id;
    setForms((forms2) => {
      var _a2;
      return {
        ...forms2,
        [key]: (_a2 = e.target) == null ? void 0 : _a2.files[0]
      };
    });
  };
  const handleDeleteBImg = (e) => {
    document.getElementById("loading-page-iccima").style.display = "inline-flex";
    axios.post(`${route_ws_delBrImg}`, {}, {
      headers: {
        "ICCIMA-AUTH-USERNAME": `${ws_username}`,
        "ICCIMA-AUTH-PASSWORD": `${ws_password}`,
        "ICCIMA-AUTH-USER-TOKEN": `${iccima.user.__token}`
      }
    }).then((res) => {
      document.getElementById("loading-page-iccima").style.display = "none";
      let status_code = res == null ? void 0 : res.status;
      if (status_code == 200 || status_code == 201) {
        setUploadedBrImg("");
        toast.success(`${_GL2["toast.edited_success"]}`);
      } else {
        toast.error(`${_GL2["toast.error"]}`);
      }
    }).catch((err) => {
      var _a2, _b2, _c2, _d2, _e2;
      document.getElementById("loading-page-iccima").style.display = "none";
      let errors = (_b2 = (_a2 = err == null ? void 0 : err.response) == null ? void 0 : _a2.data) == null ? void 0 : _b2.data;
      if (Array.isArray(errors) && errors) {
        errors.forEach((error_item) => {
          toast.error(`${error_item}`);
        });
      } else {
        toast.error(`${err.message} : ${(_e2 = (_d2 = (_c2 = err == null ? void 0 : err.response) == null ? void 0 : _c2.data) == null ? void 0 : _d2.data) == null ? void 0 : _e2.msg}`);
      }
    });
  };
  const handleIncView = () => {
    let _post_data = {
      hid
    };
    axios.post(`${iccima.links.inc_view}`, _post_data, {
      headers: {
        "ICCIMA-AUTH-USERNAME": `${ws_username}`,
        "ICCIMA-AUTH-PASSWORD": `${ws_password}`
      }
    }).then((res) => {
      let status_code = res == null ? void 0 : res.status;
      if (status_code == 200 || status_code == 201)
        ;
      else {
        toast.error(`${_GL2["toast.error"]}`);
      }
    }).catch((err) => {
      var _a2, _b2, _c2, _d2, _e2;
      let errors = (_b2 = (_a2 = err == null ? void 0 : err.response) == null ? void 0 : _a2.data) == null ? void 0 : _b2.data;
      if (Array.isArray(errors) && errors) {
        errors.forEach((error_item) => {
          toast.error(`${error_item}`);
        });
      } else {
        toast.error(`${err.message} : ${(_e2 = (_d2 = (_c2 = err == null ? void 0 : err.response) == null ? void 0 : _c2.data) == null ? void 0 : _d2.data) == null ? void 0 : _e2.msg}`);
      }
    });
  };
  const handleSubmitForm = (e) => {
    document.getElementById("loading-page-iccima").style.display = "inline-flex";
    let _post_data = forms;
    let formData = new FormData();
    if (_post_data) {
      for (const [key_obj, value_obj] of Object.entries(_post_data)) {
        formData.append(key_obj, value_obj);
      }
    }
    axios.post(`${route_ws_saveVals}`, formData, {
      headers: {
        "ICCIMA-AUTH-USERNAME": `${ws_username}`,
        "ICCIMA-AUTH-PASSWORD": `${ws_password}`,
        "ICCIMA-AUTH-USER-TOKEN": `${iccima.user.__token}`,
        "Content-Type": "multipart/form-data"
      }
    }).then((res) => {
      var _a2, _b2, _c2, _d2;
      document.getElementById("loading-page-iccima").style.display = "none";
      let status_code = res == null ? void 0 : res.status;
      if (status_code == 200 || status_code == 201) {
        if ((_b2 = (_a2 = res == null ? void 0 : res.data) == null ? void 0 : _a2.data) == null ? void 0 : _b2.brand_image) {
          setUploadedBrImg((_d2 = (_c2 = res == null ? void 0 : res.data) == null ? void 0 : _c2.data) == null ? void 0 : _d2.brand_image);
        }
        toast.success(`${_GL2["toast.edited_success"]}`);
        fetchSingleData();
      } else {
        toast.error(`${_GL2["toast.error"]}`);
      }
    }).catch((err) => {
      var _a2, _b2, _c2, _d2, _e2;
      document.getElementById("loading-page-iccima").style.display = "none";
      let errors = (_b2 = (_a2 = err == null ? void 0 : err.response) == null ? void 0 : _a2.data) == null ? void 0 : _b2.data;
      if (Array.isArray(errors) && errors) {
        errors.forEach((error_item) => {
          toast.error(`${error_item}`);
        });
      } else {
        toast.error(`${err.message} : ${(_e2 = (_d2 = (_c2 = err == null ? void 0 : err.response) == null ? void 0 : _c2.data) == null ? void 0 : _d2.data) == null ? void 0 : _e2.msg}`);
      }
    });
  };
  const fetchSingleData = async () => {
    var _a2, _b2, _c2, _d2, _e2, _f2;
    let _post_data = {
      hid
    };
    document.getElementById("loading-page-iccima").style.display = "inline-flex";
    try {
      const response = await axios.post(`${route_ws_get_single}`, _post_data, {
        headers: {
          "ICCIMA-AUTH-USERNAME": `${ws_username}`,
          "ICCIMA-AUTH-PASSWORD": `${ws_password}`
        }
      });
      document.getElementById("loading-page-iccima").style.display = "none";
      setDataSingle(iterate_prepare_data(response.data.data));
      setForms(iterate_prepare_data(response.data.data.__forms));
      console.log(response.data.data);
      if ((_c2 = (_b2 = (_a2 = response == null ? void 0 : response.data) == null ? void 0 : _a2.data) == null ? void 0 : _b2.__forms) == null ? void 0 : _c2.brand_image) {
        setUploadedBrImg((_f2 = (_e2 = (_d2 = response == null ? void 0 : response.data) == null ? void 0 : _d2.data) == null ? void 0 : _e2.__forms) == null ? void 0 : _f2.brand_image);
      }
    } catch (error) {
      document.getElementById("loading-page-iccima").style.display = "none";
      toast.error(`Error fetching single data : ${error.message}`);
      let status_code = error.response.status;
      if (status_code == 404) {
        window.location = route_404_page;
      }
      console.log(error);
    }
  };
  useEffect(() => {
    fetchSingleData();
    if ((dataSingle == null ? void 0 : dataSingle.show_in_index) && (dataSingle == null ? void 0 : dataSingle.show_in_index) == 1) {
      handleIncView();
    }
  }, []);
  useEffect(() => {
    if ((dataSingle == null ? void 0 : dataSingle.show_in_index) && (dataSingle == null ? void 0 : dataSingle.show_in_index) == 1) {
      handleIncView();
    }
  }, [dataSingle]);
  return /* @__PURE__ */ jsx(Main, { children: /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(Head, { title: (dataSingle == null ? void 0 : dataSingle.co_title) ? dataSingle.co_title[iccima.user.lang.toString()].toLowerCase() : "data" }),
    /* @__PURE__ */ jsx(Fragment, { children: (dataSingle == null ? void 0 : dataSingle.co_title) ? /* @__PURE__ */ jsx("div", { className: "placeholder-single-content", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      iccima.user.__id && iccima.user.__id == hid || iccima.user.__id && iccima.user.type == "admin" && slug == "viaAdminPanel" ? /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("center", { className: "icon-box-single-page", children: /* @__PURE__ */ jsx("i", { className: "fa fa-id-card" }) }),
        /* @__PURE__ */ jsx("div", { className: "card card-box-single-page  p-3 mb-5 rounded", children: /* @__PURE__ */ jsx("div", { className: "card-body text-dark", children: /* @__PURE__ */ jsx("div", { className: "row", children: /* @__PURE__ */ jsxs("div", { className: "col-lg-12 col-md-12 col-sm-12", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-dark font-weight-bold", children: _GL2["singlePage.form.title"] }),
          !(forms == null ? void 0 : forms.confirmed) ? /* @__PURE__ */ jsx("div", { className: "alert alert-danger m-3", role: "alert", children: _GL2["singlePage.un_confirmed"] }) : /* @__PURE__ */ jsx("div", { className: "alert alert-success m-3", role: "alert", children: _GL2["singlePage.confirmed"] }),
          /* @__PURE__ */ jsxs("div", { className: "p-2 mt-1", children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-3 row", children: [
              /* @__PURE__ */ jsxs("div", { className: "col-lg-6 col-md-6 col-sm-12 mt-2", children: [
                /* @__PURE__ */ jsxs("label", { className: "form-label", children: [
                  " ",
                  _GL2["singlePage.form.brand_title"],
                  " "
                ] }),
                /* @__PURE__ */ jsx("input", { onChange: handleChangeVs, value: (_a = forms == null ? void 0 : forms.brand_title) == null ? void 0 : _a.toString(), type: "text", className: "form-control", id: "brand_title" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "col-lg-6 col-md-6 col-sm-12 mt-2", children: [
                /* @__PURE__ */ jsxs("label", { className: "form-label", children: [
                  " ",
                  _GL2["singlePage.form.brand_logo"],
                  " "
                ] }),
                /* @__PURE__ */ jsx("input", { onChange: handleChangeFile, type: "file", className: "form-control", id: "brand_file" }),
                /* @__PURE__ */ jsxs("div", { className: "form-text", children: [
                  _GL2["singlePage.form.brand_logo_valid_size"],
                  " "
                ] }),
                /* @__PURE__ */ jsx("div", { className: "form-text", children: _GL2["singlePage.form.brand_logo_valid_types"] }),
                /* @__PURE__ */ jsx("br", {}),
                !uploadedBrImg ? /* @__PURE__ */ jsx("p", {}) : /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("div", { className: "iccima-brand-img", children: /* @__PURE__ */ jsx("img", { src: uploadedBrImg, alt: (_b = forms == null ? void 0 : forms.brand_title) == null ? void 0 : _b.toString() }) }),
                  /* @__PURE__ */ jsx("button", { onClick: handleDeleteBImg, type: "button", className: "btn btn-danger m-3 p-1", children: /* @__PURE__ */ jsx("i", { className: "fa fa-trash" }) })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mb-3 row", children: [
              /* @__PURE__ */ jsxs("div", { className: "col-lg-4 col-md-4 col-sm-12 mt-2", children: [
                /* @__PURE__ */ jsx("label", { className: "form-label", children: _GL2["singlePage.form.phone"] }),
                /* @__PURE__ */ jsx("input", { onChange: handleChangeVs, value: (_c = forms == null ? void 0 : forms.co_phone) == null ? void 0 : _c.toString(), type: "text", className: "form-control", id: "co_phone" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "col-lg-4 col-md-4 col-sm-12 mt-2", children: [
                /* @__PURE__ */ jsx("label", { className: "form-label", children: _GL2["singlePage.form.fax"] }),
                /* @__PURE__ */ jsx("input", { onChange: handleChangeVs, value: (_d = forms == null ? void 0 : forms.co_fax) == null ? void 0 : _d.toString(), type: "text", className: "form-control", id: "co_fax" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "col-lg-4 col-md-4 col-sm-12 mt-2", children: [
                /* @__PURE__ */ jsxs("label", { className: "form-label", children: [
                  " ",
                  _GL2["singlePage.form.website"]
                ] }),
                /* @__PURE__ */ jsx("input", { onChange: handleChangeVs, value: (_e = forms == null ? void 0 : forms.co_website) == null ? void 0 : _e.toString(), type: "text", className: "form-control", id: "co_website" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
              /* @__PURE__ */ jsx("label", { className: "form-label", children: _GL2["singlePage.form.address"] }),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  onChange: handleChangeVs,
                  className: "form-control iccima_met",
                  id: "co_main_address",
                  rows: "5",
                  defaultValue: (_f = forms == null ? void 0 : forms.co_main_address) == null ? void 0 : _f.toString()
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
              /* @__PURE__ */ jsx("label", { className: "form-label", children: _GL2["singlePage.form.otash_moshtarak"] }),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  onChange: handleChangeVs,
                  className: "form-control iccima_met",
                  id: "shared_chambers",
                  rows: "5",
                  defaultValue: (_g = forms == null ? void 0 : forms.shared_chambers) == null ? void 0 : _g.toString()
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
              /* @__PURE__ */ jsx("label", { className: "form-label", children: _GL2["singlePage.form.commis_takh"] }),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  onChange: handleChangeVs,
                  className: "form-control iccima_met",
                  id: "specialized_committees",
                  rows: "5",
                  defaultValue: (_h = forms == null ? void 0 : forms.specialized_committees) == null ? void 0 : _h.toString()
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
              /* @__PURE__ */ jsx("label", { className: "form-label", children: _GL2["singlePage.form.tashakol"] }),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  onChange: handleChangeVs,
                  className: "form-control iccima_met",
                  id: "guild_types",
                  rows: "5",
                  defaultValue: (_i = forms == null ? void 0 : forms.guild_types) == null ? void 0 : _i.toString()
                }
              )
            ] }),
            iccima.user.__id && iccima.user.__id == hid ? /* @__PURE__ */ jsxs("button", { onClick: handleSubmitForm, type: "button", className: "btn btn-success m-3", children: [
              " ",
              /* @__PURE__ */ jsx("i", { className: "fa fa-pencil-square-o" }),
              "  ",
              _GL2["singlePage.form.btnSave"],
              " "
            ] }) : /* @__PURE__ */ jsx("span", {})
          ] })
        ] }) }) }) })
      ] }) : /* @__PURE__ */ jsx("div", {}),
      (dataSingle == null ? void 0 : dataSingle.show_in_index) && (dataSingle == null ? void 0 : dataSingle.show_in_index) == 1 ? /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", { className: "row mt-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "col-lg-6 col-md-6 col-sm-12", children: [
          /* @__PURE__ */ jsx("center", { className: "icon-box-single-page", children: /* @__PURE__ */ jsx("i", { className: "fa fa-user-circle" }) }),
          /* @__PURE__ */ jsx("div", { className: "card  shadow-lg card-box-single-page p-3 mb-5 rounded", children: /* @__PURE__ */ jsxs("div", { className: "card-body text-dark", children: [
            /* @__PURE__ */ jsxs("center", { children: [
              dataSingle.co_image_new ? /* @__PURE__ */ jsx("img", { className: "cover-img-single", src: dataSingle.co_image_new, alt: dataSingle.owner_fullname ? dataSingle.owner_fullname[iccima.user.lang.toString()] : dataSingle.co_title[iccima.user.lang.toString()] }) : "",
              dataSingle.owner_image_new ? /* @__PURE__ */ jsx("img", { className: "cover-img-single", src: dataSingle.owner_image_new, alt: dataSingle.owner_fullname ? dataSingle.owner_fullname[iccima.user.lang.toString()] : dataSingle.co_title[iccima.user.lang.toString()] }) : ""
            ] }),
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsxs("div", { className: "mt-3", children: [
              /* @__PURE__ */ jsxs("p", { className: "label-single-page", children: [
                " ",
                _GL2["singlePage.co_title"]
              ] }),
              /* @__PURE__ */ jsx("h1", { className: "text-dark title-single-page", children: /* @__PURE__ */ jsxs("strong", { children: [
                " ",
                dataSingle.co_title[iccima.user.lang.toString()],
                " "
              ] }) }),
              /* @__PURE__ */ jsx("br", {}),
              (dataSingle == null ? void 0 : dataSingle.brand_title) ? /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("p", { className: "label-single-page", children: [
                  " ",
                  _GL2["singlePage.form.brand_title"]
                ] }),
                /* @__PURE__ */ jsx("h1", { className: "text-dark title-single-page", children: /* @__PURE__ */ jsxs("strong", { children: [
                  " ",
                  (dataSingle == null ? void 0 : dataSingle.brand_title) ? (dataSingle == null ? void 0 : dataSingle.brand_title)[iccima.user.lang.toString()] : "",
                  " "
                ] }) }),
                /* @__PURE__ */ jsx("br", {})
              ] }) : "",
              (dataSingle == null ? void 0 : dataSingle.brand_image) ? /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("p", { className: "label-single-page", children: [
                  " ",
                  _GL2["singlePage.form.brand_logo"]
                ] }),
                /* @__PURE__ */ jsx("h1", { className: "text-dark title-single-page", children: /* @__PURE__ */ jsx("img", { className: "cover-img-single", src: dataSingle.brand_image, alt: dataSingle.brand_title ? dataSingle.brand_title[iccima.user.lang.toString()] : dataSingle.co_title[iccima.user.lang.toString()] }) }),
                /* @__PURE__ */ jsx("br", {})
              ] }) : "",
              /* @__PURE__ */ jsxs("p", { className: "label-single-page", children: [
                " ",
                _GL2["singlePage.user_title"]
              ] }),
              /* @__PURE__ */ jsx("h2", { className: "text-dark title-single-page", children: /* @__PURE__ */ jsxs("strong", { children: [
                "  ",
                dataSingle.owner_fullname ? dataSingle.owner_fullname[iccima.user.lang.toString()] : dataSingle.co_title[iccima.user.lang.toString()],
                " "
              ] }) }),
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx("p", { className: "label-single-page", children: _GL2["singlePage.co_type"] }),
              /* @__PURE__ */ jsx("h3", { className: "text-dark title-single-page", children: /* @__PURE__ */ jsxs("strong", { children: [
                dataSingle.co_type[iccima.user.lang.toString()],
                " ",
                dataSingle.jalali_year ? `${_GL2["singlePage.establish"]} ${dataSingle.jalali_year}` : ""
              ] }) }),
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsxs("p", { className: "label-single-page", children: [
                " ",
                _GL2["singlePage.city_province"],
                " "
              ] }),
              /* @__PURE__ */ jsx("h3", { className: "text-dark title-single-page", children: /* @__PURE__ */ jsxs("strong", { children: [
                " ",
                (_j = dataSingle == null ? void 0 : dataSingle.province) == null ? void 0 : _j[iccima.user.lang.toString()],
                " ",
                (_k = dataSingle == null ? void 0 : dataSingle.city) == null ? void 0 : _k[iccima.user.lang.toString()]
              ] }) }),
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsxs("p", { className: "label-single-page", children: [
                " ",
                _GL2["singlePage.reshte_faaliat"],
                " "
              ] }),
              /* @__PURE__ */ jsx("div", { className: "mt-1 pt-1 text-dark text-justify p-single-page-content", dangerouslySetInnerHTML: { __html: dataSingle.biz_activities[iccima.user.lang.toString()] ? dataSingle.biz_activities[iccima.user.lang.toString()] : "---" } }),
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsxs("p", { className: "label-single-page", children: [
                " ",
                _GL2["singlePage.noe_faaliat"],
                " "
              ] }),
              /* @__PURE__ */ jsx("div", { className: "mt-1 pt-1 text-dark text-justify p-single-page-content", dangerouslySetInnerHTML: { __html: dataSingle.biz_activitiy_goods__merged[iccima.user.lang.toString()] ? dataSingle.biz_activitiy_goods__merged[iccima.user.lang.toString()] : "---" } }),
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsxs("p", { className: "label-single-page", children: [
                "  ",
                _GL2["singlePage.govahi_mabda"],
                " "
              ] }),
              /* @__PURE__ */ jsx("div", { className: "mt-1 pt-1 text-dark text-justify p-single-page-content", dangerouslySetInnerHTML: { __html: dataSingle.coo_biz_activities__merged[iccima.user.lang.toString()] ? dataSingle.coo_biz_activities__merged[iccima.user.lang.toString()] : "---" } }),
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsxs("p", { className: "label-single-page", children: [
                " ",
                _GL2["singlePage.hs_codes"],
                " "
              ] }),
              /* @__PURE__ */ jsx("div", { className: "mt-1 pt-1 text-dark text-justify p-single-page-content", dangerouslySetInnerHTML: { __html: dataSingle.biz_act_goods_hs_codes__merged[iccima.user.lang.toString()] ? dataSingle.biz_act_goods_hs_codes__merged[iccima.user.lang.toString()] : "---" } }),
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsxs("p", { className: "label-single-page", children: [
                "  ",
                _GL2["singlePage.otash_moshtarak"]
              ] }),
              /* @__PURE__ */ jsx("div", { className: "mt-1 pt-1 text-dark text-justify p-single-page-content", dangerouslySetInnerHTML: { __html: dataSingle.shared_chambers__merged[iccima.user.lang.toString()] ? dataSingle.shared_chambers__merged[iccima.user.lang.toString()] : "---" } }),
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsxs("p", { className: "label-single-page", children: [
                " ",
                _GL2["singlePage.commis_takh"],
                " "
              ] }),
              /* @__PURE__ */ jsx("div", { className: "mt-1 pt-1 text-dark text-justify p-single-page-content", dangerouslySetInnerHTML: { __html: dataSingle.specialized_committees__merged[iccima.user.lang.toString()] ? dataSingle.specialized_committees__merged[iccima.user.lang.toString()] : "---" } }),
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsxs("p", { className: "label-single-page", children: [
                " ",
                _GL2["singlePage.tashakol"],
                " "
              ] }),
              /* @__PURE__ */ jsx("div", { className: "mt-1 pt-1 text-dark text-justify p-single-page-content", dangerouslySetInnerHTML: { __html: dataSingle.guild_types__merged[iccima.user.lang.toString()] ? dataSingle.guild_types__merged[iccima.user.lang.toString()] : "---" } })
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "col-lg-6 col-md-6 col-sm-12", children: [
          /* @__PURE__ */ jsxs("center", { className: "icon-box-single-page", children: [
            /* @__PURE__ */ jsx("i", { className: "fa fa-volume-control-phone" }),
            /* @__PURE__ */ jsxs("strong", { className: "text-dark view-count-eye-single-page", children: [
              "  ",
              dataSingle == null ? void 0 : dataSingle.view_count,
              "  ",
              /* @__PURE__ */ jsx("i", { className: "fa fa-eye" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "card card-box-single-page  p-3 mb-5  rounded", children: /* @__PURE__ */ jsx("div", { className: "card-body text-dark", children: /* @__PURE__ */ jsxs("div", { className: "mt-1", children: [
            /* @__PURE__ */ jsxs("p", { className: "label-single-page", children: [
              " ",
              _GL2["singlePage.address"],
              " "
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mt-1 pt-1 text-dark text-justify p-single-page-content", dangerouslySetInnerHTML: { __html: dataSingle.co_main_address[iccima.user.lang.toString()] } }),
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsxs("p", { className: "label-single-page", children: [
              "  ",
              _GL2["singlePage.website"],
              " "
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-dark font-weight-bold mt-2 p-single-page-content", children: dataSingle.co_website ? dataSingle.co_website : "---" }),
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsxs("p", { className: "label-single-page", children: [
              " ",
              _GL2["singlePage.phone"],
              " "
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-dark font-weight-bold mt-2 p-single-page-content", children: dataSingle.co_phone ? dataSingle.co_phone : "---" }),
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsxs("p", { className: "label-single-page", children: [
              " ",
              _GL2["singlePage.fax"],
              " "
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-dark font-weight-bold mt-2 p-single-page-content", children: dataSingle.co_fax ? dataSingle.co_fax : "---" }),
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsxs("p", { className: "label-single-page", children: [
              " ",
              _GL2["singlePage.email"],
              " "
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-dark font-weight-bold mt-2 p-single-page-content", children: dataSingle.co_email ? format_at_email_str(dataSingle.co_email) : "---" })
          ] }) }) })
        ] })
      ] }) }) : /* @__PURE__ */ jsx(Fragment, {})
    ] }) }) : /* @__PURE__ */ jsx("div", { className: "placeholder-single-content", children: /* @__PURE__ */ jsx("img", { src: "/images/placeholder-loading-iccima-1.gif", alt: "در حال بازگذاری ..." }) }) }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
      Toaster,
      {
        position: "top-left",
        reverseOrder: true
      }
    ) })
  ] }) });
}
const __vite_glob_0_3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: SingleMerchant$1
}, Symbol.toStringTag, { value: "Module" }));
function SingleMerchant({ hid, route_ws_get_single, route_404_page, route_ws_saveVals, route_ws_delBrImg }) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
  const ws_username = "H40MN?jcVE4(Z3LW-3WwZ4;G!wwQxe";
  const ws_password = "jR+VZu7%5beGbNq6TYYSBv&WwPATCuQeRGf4v8Wm%w7$(X#h4SpPEbXyqFweKB3V";
  const [uploadedBrImg, setUploadedBrImg] = useState("");
  const [forms, setForms] = useState(null);
  const [dataSingle, setDataSingle] = useState([]);
  const { iccima, _GL: _GL2 } = usePage().props;
  const handleChangeVs = (e) => {
    var _a2, _b2;
    const key = e.target.id;
    const value = (_b2 = (_a2 = e == null ? void 0 : e.target) == null ? void 0 : _a2.value) == null ? void 0 : _b2.toString();
    setForms((forms2) => ({
      ...forms2,
      [key]: value
    }));
  };
  const handleChangeFile = (e) => {
    const key = e.target.id;
    setForms((forms2) => {
      var _a2;
      return {
        ...forms2,
        [key]: (_a2 = e.target) == null ? void 0 : _a2.files[0]
      };
    });
  };
  const handleDeleteBImg = (e) => {
    document.getElementById("loading-page-iccima").style.display = "inline-flex";
    axios.post(`${route_ws_delBrImg}`, {}, {
      headers: {
        "ICCIMA-AUTH-USERNAME": `${ws_username}`,
        "ICCIMA-AUTH-PASSWORD": `${ws_password}`,
        "ICCIMA-AUTH-USER-TOKEN": `${iccima.user.__token}`
      }
    }).then((res) => {
      console.log(res);
      document.getElementById("loading-page-iccima").style.display = "none";
      let status_code = res == null ? void 0 : res.status;
      if (status_code == 200 || status_code == 201) {
        setUploadedBrImg("");
        toast.success(`${_GL2["toast.edited_success"]}`);
      } else {
        toast.error(`${_GL2["toast.error"]}`);
      }
    }).catch((err) => {
      var _a2, _b2, _c2, _d2, _e2;
      document.getElementById("loading-page-iccima").style.display = "none";
      let errors = (_b2 = (_a2 = err == null ? void 0 : err.response) == null ? void 0 : _a2.data) == null ? void 0 : _b2.data;
      if (Array.isArray(errors) && errors) {
        errors.forEach((error_item) => {
          toast.error(`${error_item}`);
        });
      } else {
        toast.error(`${err.message} : ${(_e2 = (_d2 = (_c2 = err == null ? void 0 : err.response) == null ? void 0 : _c2.data) == null ? void 0 : _d2.data) == null ? void 0 : _e2.msg}`);
      }
    });
  };
  const handleSubmitForm = (e) => {
    document.getElementById("loading-page-iccima").style.display = "inline-flex";
    let _post_data = forms;
    let formData = new FormData();
    if (_post_data) {
      for (const [key_obj, value_obj] of Object.entries(_post_data)) {
        formData.append(key_obj, value_obj);
      }
    }
    axios.post(`${route_ws_saveVals}`, formData, {
      headers: {
        "ICCIMA-AUTH-USERNAME": `${ws_username}`,
        "ICCIMA-AUTH-PASSWORD": `${ws_password}`,
        "ICCIMA-AUTH-USER-TOKEN": `${iccima.user.__token}`,
        "Content-Type": "multipart/form-data"
      }
    }).then((res) => {
      var _a2, _b2, _c2, _d2;
      console.log(res);
      document.getElementById("loading-page-iccima").style.display = "none";
      let status_code = res == null ? void 0 : res.status;
      if (status_code == 200 || status_code == 201) {
        if ((_b2 = (_a2 = res == null ? void 0 : res.data) == null ? void 0 : _a2.data) == null ? void 0 : _b2.brand_image) {
          setUploadedBrImg((_d2 = (_c2 = res == null ? void 0 : res.data) == null ? void 0 : _c2.data) == null ? void 0 : _d2.brand_image);
        }
        toast.success(`${_GL2["toast.edited_success"]}`);
      } else {
        toast.error(`${_GL2["toast.error"]}`);
      }
    }).catch((err) => {
      var _a2, _b2, _c2, _d2, _e2;
      document.getElementById("loading-page-iccima").style.display = "none";
      let errors = (_b2 = (_a2 = err == null ? void 0 : err.response) == null ? void 0 : _a2.data) == null ? void 0 : _b2.data;
      if (Array.isArray(errors) && errors) {
        errors.forEach((error_item) => {
          toast.error(`${error_item}`);
        });
      } else {
        toast.error(`${err.message} : ${(_e2 = (_d2 = (_c2 = err == null ? void 0 : err.response) == null ? void 0 : _c2.data) == null ? void 0 : _d2.data) == null ? void 0 : _e2.msg}`);
      }
    });
  };
  const fetchSingleData = async () => {
    var _a2, _b2, _c2, _d2, _e2, _f2;
    let _post_data = {
      hid
    };
    document.getElementById("loading-page-iccima").style.display = "inline-flex";
    try {
      const response = await axios.post(`${route_ws_get_single}`, _post_data, {
        headers: {
          "ICCIMA-AUTH-USERNAME": `${ws_username}`,
          "ICCIMA-AUTH-PASSWORD": `${ws_password}`
        }
      });
      document.getElementById("loading-page-iccima").style.display = "none";
      console.log(response.data.data);
      setDataSingle(iterate_prepare_data(response.data.data));
      setForms(iterate_prepare_data(response.data.data.__forms));
      if ((_c2 = (_b2 = (_a2 = response == null ? void 0 : response.data) == null ? void 0 : _a2.data) == null ? void 0 : _b2.__forms) == null ? void 0 : _c2.brand_image) {
        setUploadedBrImg((_f2 = (_e2 = (_d2 = response == null ? void 0 : response.data) == null ? void 0 : _d2.data) == null ? void 0 : _e2.__forms) == null ? void 0 : _f2.brand_image);
      }
    } catch (error) {
      document.getElementById("loading-page-iccima").style.display = "none";
      toast.error(`Error fetching single data : ${error.message}`);
      let status_code = error.response.status;
      if (status_code == 404) {
        window.location = route_404_page;
      }
      console.log(error);
    }
  };
  useEffect(() => {
    fetchSingleData();
  }, []);
  return /* @__PURE__ */ jsx(Main, { children: /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(Head, { title: (dataSingle == null ? void 0 : dataSingle.co_title) ? dataSingle.co_title[iccima.user.lang.toString()] : "اطلاعات" }),
    (dataSingle == null ? void 0 : dataSingle.co_title) ? /* @__PURE__ */ jsx("div", { className: "placeholder-single-content", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      iccima.user.__id && iccima.user.__id == hid ? /* @__PURE__ */ jsx("div", { className: "card shadow-lg p-3 mb-5 bg-body rounded", children: /* @__PURE__ */ jsx("div", { className: "card-body text-dark", children: /* @__PURE__ */ jsx("div", { className: "row", children: /* @__PURE__ */ jsxs("div", { className: "col-lg-12 col-md-12 col-sm-12", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-primary font-weight-bold", children: _GL2["singlePage.form.title"] }),
        !(forms == null ? void 0 : forms.confirmed) ? /* @__PURE__ */ jsx("div", { className: "alert alert-danger m-3", role: "alert", children: _GL2["singlePage.un_confirmed"] }) : /* @__PURE__ */ jsx("div", { className: "alert alert-success m-3", role: "alert", children: _GL2["singlePage.confirmed"] }),
        /* @__PURE__ */ jsxs("div", { className: "p-2 mt-1", children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-3 row", children: [
            /* @__PURE__ */ jsxs("div", { className: "col-lg-6 col-md-6 col-sm-12 mt-2", children: [
              /* @__PURE__ */ jsxs("label", { className: "form-label", children: [
                " ",
                _GL2["singlePage.form.brand_title"],
                " "
              ] }),
              /* @__PURE__ */ jsx("input", { onChange: handleChangeVs, value: (_a = forms == null ? void 0 : forms.brand_title) == null ? void 0 : _a.toString(), type: "text", className: "form-control", id: "brand_title" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "col-lg-6 col-md-6 col-sm-12 mt-2", children: [
              /* @__PURE__ */ jsxs("label", { className: "form-label", children: [
                " ",
                _GL2["singlePage.form.brand_logo"],
                " "
              ] }),
              /* @__PURE__ */ jsx("input", { onChange: handleChangeFile, type: "file", className: "form-control", id: "brand_file" }),
              /* @__PURE__ */ jsxs("div", { className: "form-text", children: [
                _GL2["singlePage.form.brand_logo_valid_size"],
                " "
              ] }),
              /* @__PURE__ */ jsx("div", { className: "form-text", children: _GL2["singlePage.form.brand_logo_valid_types"] }),
              /* @__PURE__ */ jsx("br", {}),
              !uploadedBrImg ? /* @__PURE__ */ jsx("p", {}) : /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("div", { className: "iccima-brand-img", children: /* @__PURE__ */ jsx("img", { src: uploadedBrImg, alt: (_b = forms == null ? void 0 : forms.brand_title) == null ? void 0 : _b.toString() }) }),
                /* @__PURE__ */ jsx("button", { onClick: handleDeleteBImg, type: "button", className: "btn btn-danger m-3 p-1", children: /* @__PURE__ */ jsx("i", { className: "fa fa-trash" }) })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-3 row", children: [
            /* @__PURE__ */ jsxs("div", { className: "col-lg-4 col-md-4 col-sm-12 mt-2", children: [
              /* @__PURE__ */ jsx("label", { className: "form-label", children: _GL2["singlePage.form.phone"] }),
              /* @__PURE__ */ jsx("input", { onChange: handleChangeVs, value: (_c = forms == null ? void 0 : forms.co_phone) == null ? void 0 : _c.toString(), type: "text", className: "form-control", id: "co_phone" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "col-lg-4 col-md-4 col-sm-12 mt-2", children: [
              /* @__PURE__ */ jsx("label", { className: "form-label", children: _GL2["singlePage.form.fax"] }),
              /* @__PURE__ */ jsx("input", { onChange: handleChangeVs, value: (_d = forms == null ? void 0 : forms.co_fax) == null ? void 0 : _d.toString(), type: "text", className: "form-control", id: "co_fax" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "col-lg-4 col-md-4 col-sm-12 mt-2", children: [
              /* @__PURE__ */ jsxs("label", { className: "form-label", children: [
                " ",
                _GL2["singlePage.form.website"]
              ] }),
              /* @__PURE__ */ jsx("input", { onChange: handleChangeVs, value: (_e = forms == null ? void 0 : forms.co_website) == null ? void 0 : _e.toString(), type: "text", className: "form-control", id: "co_website" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
            /* @__PURE__ */ jsx("label", { className: "form-label", children: _GL2["singlePage.form.address"] }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                onChange: handleChangeVs,
                className: "form-control iccima_met",
                id: "co_main_address",
                rows: "5",
                defaultValue: (_f = forms == null ? void 0 : forms.co_main_address) == null ? void 0 : _f.toString()
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
            /* @__PURE__ */ jsx("label", { className: "form-label", children: _GL2["singlePage.form.otash_moshtarak"] }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                onChange: handleChangeVs,
                className: "form-control iccima_met",
                id: "shared_chambers",
                rows: "5",
                defaultValue: (_g = forms == null ? void 0 : forms.shared_chambers) == null ? void 0 : _g.toString()
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
            /* @__PURE__ */ jsx("label", { className: "form-label", children: _GL2["singlePage.form.commis_takh"] }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                onChange: handleChangeVs,
                className: "form-control iccima_met",
                id: "specialized_committees",
                rows: "5",
                defaultValue: (_h = forms == null ? void 0 : forms.specialized_committees) == null ? void 0 : _h.toString()
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
            /* @__PURE__ */ jsx("label", { className: "form-label", children: _GL2["singlePage.form.tashakol"] }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                onChange: handleChangeVs,
                className: "form-control iccima_met",
                id: "guild_types",
                rows: "5",
                defaultValue: (_i = forms == null ? void 0 : forms.guild_types) == null ? void 0 : _i.toString()
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("button", { onClick: handleSubmitForm, type: "button", className: "btn btn-success m-3", children: [
            " ",
            /* @__PURE__ */ jsx("i", { className: "fa fa-pencil-square-o" }),
            "  ",
            _GL2["singlePage.form.btnSave"],
            " "
          ] })
        ] })
      ] }) }) }) }) : /* @__PURE__ */ jsx("div", {}),
      /* @__PURE__ */ jsx("div", { className: "card shadow-lg p-3 mb-5 bg-body rounded", children: /* @__PURE__ */ jsx("div", { className: "card-body text-dark", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
        /* @__PURE__ */ jsxs("div", { className: "col-lg-8 col-md-7 col-sm-12 mt-2", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-primary", children: dataSingle.co_title[iccima.user.lang.toString()] }),
          /* @__PURE__ */ jsx("h2", { className: "text-primary mt-3", children: /* @__PURE__ */ jsxs("strong", { children: [
            "  ",
            dataSingle.owner_fullname ? dataSingle.owner_fullname[iccima.user.lang.toString()] : dataSingle.co_title[iccima.user.lang.toString()],
            " "
          ] }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-dark mt-2", children: /* @__PURE__ */ jsxs("strong", { children: [
            dataSingle.co_type[iccima.user.lang.toString()],
            " ",
            dataSingle.jalali_year ? `${_GL2["singlePage.establish"]} ${dataSingle.jalali_year}` : ""
          ] }) }),
          /* @__PURE__ */ jsxs("h4", { className: "text-dark mt-2", children: [
            (_j = dataSingle == null ? void 0 : dataSingle.province) == null ? void 0 : _j[iccima.user.lang.toString()],
            " ",
            (_k = dataSingle == null ? void 0 : dataSingle.city) == null ? void 0 : _k[iccima.user.lang.toString()]
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "col-lg-2 col-md-2 col-sm-12 mt-4", children: dataSingle.co_image_new ? /* @__PURE__ */ jsx("img", { className: "cover-img-single", src: dataSingle.co_image_new, alt: dataSingle.owner_fullname ? dataSingle.owner_fullname[iccima.user.lang.toString()] : dataSingle.co_title[iccima.user.lang.toString()] }) : "" }),
        /* @__PURE__ */ jsx("div", { className: "col-lg-2 col-md-2 col-sm-12 mt-4", children: dataSingle.owner_image_new ? /* @__PURE__ */ jsx("img", { className: "cover-img-single", src: dataSingle.owner_image_new, alt: dataSingle.owner_fullname ? dataSingle.owner_fullname[iccima.user.lang.toString()] : dataSingle.co_title[iccima.user.lang.toString()] }) : "" })
      ] }) }) }),
      /* @__PURE__ */ jsx("div", { className: "card shadow-lg p-3 mb-5 bg-body rounded", children: /* @__PURE__ */ jsx("div", { className: "card-body text-dark", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
        /* @__PURE__ */ jsxs("div", { className: "col-lg-6 col-md-6 col-sm-12", children: [
          /* @__PURE__ */ jsxs("h5", { className: "text-primary", children: [
            " ",
            _GL2["singlePage.address"],
            " "
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-1 pt-1 text-dark text-justify", dangerouslySetInnerHTML: { __html: dataSingle.co_main_address[iccima.user.lang.toString()] } }),
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsxs("h5", { className: "text-primary", children: [
            "  ",
            _GL2["singlePage.website"],
            " "
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-dark font-weight-bold mt-2", children: dataSingle.co_website ? dataSingle.co_website : "---" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "col-lg-6 col-md-6 col-sm-12", children: [
          /* @__PURE__ */ jsxs("h5", { className: "text-primary", children: [
            " ",
            _GL2["singlePage.phone"],
            " "
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-dark font-weight-bold mt-2", children: dataSingle.co_phone ? dataSingle.co_phone : "---" }),
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsxs("h5", { className: "text-primary", children: [
            " ",
            _GL2["singlePage.fax"],
            " "
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-dark font-weight-bold mt-2", children: dataSingle.co_fax ? dataSingle.co_fax : "---" })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsx("div", { className: "card shadow-lg p-3 mb-5 bg-body rounded", children: /* @__PURE__ */ jsx("div", { className: "card-body text-dark", children: /* @__PURE__ */ jsx("div", { className: "row", children: /* @__PURE__ */ jsxs("div", { className: "col-lg-12 col-md-12 col-sm-12", children: [
        /* @__PURE__ */ jsxs("h5", { className: "text-primary", children: [
          " ",
          _GL2["singlePage.reshte_faaliat"],
          " "
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-1 pt-1 text-dark text-justify", dangerouslySetInnerHTML: { __html: dataSingle.biz_activities[iccima.user.lang.toString()] ? dataSingle.biz_activities[iccima.user.lang.toString()] : "---" } }),
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsxs("h5", { className: "text-primary", children: [
          " ",
          _GL2["singlePage.noe_faaliat"],
          " "
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-1 pt-1 text-dark text-justify", dangerouslySetInnerHTML: { __html: dataSingle.biz_activitiy_goods__merged[iccima.user.lang.toString()] ? dataSingle.biz_activitiy_goods__merged[iccima.user.lang.toString()] : "---" } }),
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsxs("h5", { className: "text-primary", children: [
          "  ",
          _GL2["singlePage.govahi_mabda"],
          " "
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-1 pt-1 text-dark text-justify", dangerouslySetInnerHTML: { __html: dataSingle.coo_biz_activities__merged[iccima.user.lang.toString()] ? dataSingle.coo_biz_activities__merged[iccima.user.lang.toString()] : "---" } }),
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsxs("h5", { className: "text-primary", children: [
          " ",
          _GL2["singlePage.hs_codes"],
          " "
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-1 pt-1 text-dark text-justify", dangerouslySetInnerHTML: { __html: dataSingle.biz_act_goods_hs_codes__merged[iccima.user.lang.toString()] ? dataSingle.biz_act_goods_hs_codes__merged[iccima.user.lang.toString()] : "---" } }),
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsxs("h5", { className: "text-primary", children: [
          "  ",
          _GL2["singlePage.otash_moshtarak"]
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-1 pt-1 text-dark text-justify", dangerouslySetInnerHTML: { __html: dataSingle.shared_chambers__merged[iccima.user.lang.toString()] ? dataSingle.shared_chambers__merged[iccima.user.lang.toString()] : "---" } }),
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsxs("h5", { className: "text-primary", children: [
          " ",
          _GL2["singlePage.commis_takh"],
          " "
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-1 pt-1 text-dark text-justify", dangerouslySetInnerHTML: { __html: dataSingle.specialized_committees__merged[iccima.user.lang.toString()] ? dataSingle.specialized_committees__merged[iccima.user.lang.toString()] : "---" } }),
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsxs("h5", { className: "text-primary", children: [
          " ",
          _GL2["singlePage.tashakol"],
          " "
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-1 pt-1 text-dark text-justify", dangerouslySetInnerHTML: { __html: dataSingle.guild_types__merged[iccima.user.lang.toString()] ? dataSingle.guild_types__merged[iccima.user.lang.toString()] : "---" } })
      ] }) }) }) })
    ] }) }) : /* @__PURE__ */ jsx("div", { className: "placeholder-single-content", children: /* @__PURE__ */ jsx("img", { src: "/images/placeholder-loading-iccima-1.gif", alt: "در حال بازگذاری ..." }) }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
      Toaster,
      {
        position: "top-left",
        reverseOrder: true
      }
    ) })
  ] }) });
}
const __vite_glob_0_4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: SingleMerchant
}, Symbol.toStringTag, { value: "Module" }));
createServer(
  (page) => createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    resolve: (name) => {
      const pages = /* @__PURE__ */ Object.assign({ "./Pages/Admin/Dashboard.jsx": __vite_glob_0_0, "./Pages/Admin/Forms.jsx": __vite_glob_0_1, "./Pages/Index.jsx": __vite_glob_0_2, "./Pages/SingleMerchant.jsx": __vite_glob_0_3, "./Pages/SingleMerchant_old1.jsx": __vite_glob_0_4 });
      return pages[`./Pages/${name}.jsx`];
    },
    setup: ({ App, props }) => /* @__PURE__ */ jsx(App, { ...props }),
    progress: {
      color: "#dc3545"
    }
  })
);
