
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import './tailwind.css'
import './fonts/Montserrat.css'

import App from '@app/components/App'
import NotFound from '@app/components/NotFound'

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "*",
        element: <NotFound />
    }
], {
    future: {
        v7_skipActionErrorRevalidation:true,
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_relativeSplatPath: true
    }
})

createRoot( document.getElementById( 'application-container-wrapper' ) as HTMLElement ).render(
    <RouterProvider future={{ v7_startTransition:true }} router={ router } />
)
