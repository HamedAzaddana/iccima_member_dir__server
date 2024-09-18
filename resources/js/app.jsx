import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import { hydrateRoot } from 'react-dom/client'
import { get_query_param_url,browser_storage_get,browser_storage_set } from './Utils/IccObjArr';
const appNameFa = import.meta.env.VITE_APP_NAME || 'Laravel';
const appNameEn = import.meta.env.VITE_APP_NAME_EN || 'Laravel';

const appLangTitle = () => {
    let locale_title_app = appNameFa;
    let lang_app_setter = (
        get_query_param_url("lang") && typeof get_query_param_url("lang") != undefined
    )
        ? get_query_param_url("lang") : "";
    if (lang_app_setter && (lang_app_setter == "Persian" || lang_app_setter == "English")) {
        browser_storage_set('_current_local_lang', lang_app_setter,3600*1000);
    }
    let last_lang_get = browser_storage_get('_current_local_lang');
    if (last_lang_get) {
        locale_title_app = (last_lang_get == "Persian") ? appNameFa : appNameEn;
    }
    return locale_title_app;
}
createInertiaApp({
    title: title => (title ? `${title} - ${appLangTitle()}` : appLangTitle()),
    resolve: name => {
        const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
        return pages[`./Pages/${name}.jsx`]
    },
    setup({ el, App, props }) {
        hydrateRoot(document.getElementById('root-plus-parent'),<App {...props} />).render(<App {...props} />)
        // createRoot(el).render(<App {...props} />)
    },
    progress: {
        color: '#dc3545',
    },
})
