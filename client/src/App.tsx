import './app.scss';
import '@mantine/core/styles.css';
import { Box, Button, MantineProvider, createTheme } from '@mantine/core';

// import DarkModeBtn from './components/Buttons/DarkModeBtn/DarkModeBtn';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Header from './components/Header/Header';
// import BackGroundWave from './components/BackgroundWave/BackGroundWave';
import Blogs from './pages/Blogs';
import Register from './pages/Register';

function App() {
    return (
        <MantineProvider>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/blogs" element={<Blogs />} />
                </Routes>

                {/* <BackGroundWave /> */}
            </BrowserRouter>
        </MantineProvider>
    );
}

export default App;
