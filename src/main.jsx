import 'bootstrap/dist/css/bootstrap.min.css';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import PrivateRoute from './components/PrivateRoute.jsx'; // import PrivateRoute
import { ThemeProvider } from './ThemeContext.jsx';

createRoot(document.getElementById('root')).render(
    <ThemeProvider>
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            <App />
                        </PrivateRoute>
                    }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </BrowserRouter>
    </ThemeProvider>
);
