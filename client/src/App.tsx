import './app.scss';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Header from './components/Header/Header';
import Blogs from './pages/Blogs';
import Register from './pages/Register';
import Login from './pages/Login';
import { useEffect } from 'react';
import { loadUser } from './redux/actions/auth';

import store, { RootState } from './redux/store';
import { useDispatch, useSelector } from 'react-redux';

function App() {
    const token = useSelector((state: RootState) => state.user.token);
    const dispatch = useDispatch();

    useEffect(() => {
        if (token) {
            dispatch(loadUser());
        }
    }, [dispatch, token]);
    return (
        <MantineProvider>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/blogs" element={<Blogs />} />
                </Routes>
            </BrowserRouter>
        </MantineProvider>
    );
}

export default App;
