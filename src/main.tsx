import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Scenery from './Scenery.tsx'
import Route from './router/Route.tsx'
import { RouterProvider } from './router/RouterProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider base={"http://localhost:5173/ReactThreeViewer"}>
      <Route path={""} element={<App />} />
      <Route path={"/"} element={<App />} />
      <Route path={"/scene"} element={<Scenery />} />
    </RouterProvider>
  </StrictMode>,
)
