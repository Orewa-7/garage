import { createRoot } from 'react-dom/client'
import { AuthContexProvider } from "./context/AuthContex.jsx";
import App from './App.jsx'
import './style.css'

const root = createRoot(document.querySelector('#root'))

root.render(
    <AuthContexProvider >
        <App />
    </AuthContexProvider>
)