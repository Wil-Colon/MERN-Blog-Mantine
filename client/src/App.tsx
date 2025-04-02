import './app.scss';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { loadUser } from './redux/actions/auth';
import { useDispatch } from 'react-redux';
import { Notifications } from '@mantine/notifications';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Header from './components/Header/Header';
import Register from './pages/Register';
import Login from './pages/Login';
import AdminDashboard from './pages/Admin/AdminDashboard/AdminDashboard';
import UserProfile from './pages/UserProfile/UserProfile';
import PrivateRoute from './utils/PrivateRoute';
import PageNotFound from './pages/PageNotFound';
import UserDashBoard from './pages/UserDashboard/UserDashboard';
import BlogsList from './pages/BlogList/BlogsList';
import BlogLayout from './components/BlogLayout/BlogLayout';
import '@mantine/carousel/styles.css';
import CreateBlog from './pages/Admin/CreateBlog/CreateBlog';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        if (localStorage.token) {
            dispatch(loadUser());
        }
    }, [dispatch]);

    return (
        <MantineProvider>
            <Notifications />
            <BrowserRouter>
                <Header />

                <Routes>
                    <Route path="*" element={<PageNotFound />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/blogs" element={<BlogsList />} />
                    <Route path="/blogs/:id" element={<BlogLayout />} />

                    {/* private */}
                    <Route path="/userProfile" element={<PrivateRoute />}>
                        <Route
                            path="/userProfile/:id"
                            element={<UserProfile />}
                        />
                    </Route>

                    <Route path="/dashboard" element={<PrivateRoute />}>
                        <Route path="/dashboard" element={<UserDashBoard />} />
                    </Route>

                    <Route path="/admin" element={<PrivateRoute />}>
                        <Route path="/admin" element={<AdminDashboard />} />
                        <Route
                            path="/admin/stats"
                            element={<AdminDashboard />}
                        />
                        <Route
                            path="/admin/community"
                            element={<AdminDashboard />}
                        />
                        <Route
                            path="/admin/thought"
                            element={<AdminDashboard />}
                        />
                        <Route
                            path="/admin/blog"
                            element={<AdminDashboard />}
                        />
                        <Route
                            path="/admin/blog/edit/:id"
                            element={<AdminDashboard />}
                        />
                        <Route
                            path="/admin/createblog"
                            element={<CreateBlog />}
                        />
                    </Route>
                    {/* private */}
                </Routes>
            </BrowserRouter>
        </MantineProvider>
    );
}

export default App;
