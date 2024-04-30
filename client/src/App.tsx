import './app.scss';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Header from './components/Header/Header';
import Blogs from './pages/Blogs';
import Register from './pages/Register';
import Login from './pages/Login';
import { useEffect } from 'react';
import { loadUser } from './redux/actions/auth';

import store, { RootState } from './redux/store';
import { useDispatch, useSelector } from 'react-redux';
import AdminDashboard from './pages/AdminDashboard';
import UserProfile from './pages/UserProfile';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        if (localStorage.token) {
            dispatch(loadUser());
        }
    }, [dispatch]);

    return (
        <MantineProvider>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/userProfile/:id" element={<UserProfile />} />
                    <Route
                        path="/admindashboard"
                        element={<AdminDashboard />}
                    />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/blogs" element={<Blogs />} />
                </Routes>
            </BrowserRouter>
        </MantineProvider>
    );
}

export default App;
