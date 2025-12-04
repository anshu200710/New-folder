import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom";
import { AuthProvider } from './context/AuthContext.jsx';
import { AppProvider } from './context/AppContext.jsx';

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <AppProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    </AppProvider>
  </AuthProvider>
)
