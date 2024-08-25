import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'

const appNameFa = import.meta.env.VITE_APP_NAME || 'Laravel';
const appNameEn = import.meta.env.VITE_APP_NAME_EN || 'Laravel';

createInertiaApp({
    title: title => `${title} - ${appNameFa}`,
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
