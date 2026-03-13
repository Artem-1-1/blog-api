import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PostsContextProvider } from "./context/postContext.jsx"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PostsContextProvider>
      <App />
    </PostsContextProvider>
  </StrictMode>,
)
