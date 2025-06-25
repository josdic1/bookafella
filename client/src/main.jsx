import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import routes from './routes'
import CurrentUserProvider from './providers/CurrentUserProvider'
import './index.css'

const router = createBrowserRouter(routes)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <CurrentUserProvider>
<RouterProvider router={router} />
</CurrentUserProvider>
)
