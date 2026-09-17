import React from 'react'
import ReactDOM from 'react-dom/client'
// Base styles first, then the app's — same order as the cascade assumes.
// Importing App first meant index.css was injected last and silently won
// every equal-specificity tie against App.css.
import './index.css'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
