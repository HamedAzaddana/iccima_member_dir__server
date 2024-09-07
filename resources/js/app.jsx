import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import { browser_session_get } from './Utils/IccObjArr';
const appNameFa = import.meta.env.VITE_APP_NAME || 'Laravel';
const appNameEn = import.meta.env.VITE_APP_NAME_EN || 'Laravel';

function get_query_param_url(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
let locale_title_app = appNameFa;
let lang_app_setter = (
    get_query_param_url("lang") && typeof get_query_param_url("lang") != undefined
)
    ? get_query_param_url("lang") : "";
if (lang_app_setter && (lang_app_setter == "Persian" || lang_app_setter == "English")) {
    localStorage.setItem('_current_local_lang', lang_app_setter);
}
let last_lang_get = localStorage.getItem('_current_local_lang');
if (last_lang_get) {
    locale_title_app = (last_lang_get == "Persian") ? appNameFa : appNameEn;
}
createInertiaApp({
    title: title => (title ? `${title} - ${locale_title_app}` : locale_title_app),
    resolve: name => {
        const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
        return pages[`./Pages/${name}.jsx`]
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />)
    },
    progress: {
        color: '#dc3545',
    },
})
