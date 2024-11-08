
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
])

createRoot( document.getElementById( 'application-container-wrapper' ) as HTMLElement ).render(
    <RouterProvider router={ router } />
)
