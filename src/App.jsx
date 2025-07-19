import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Features from './pages/Features';
import Help from './pages/Help';
import Home from './pages/Home';
import Layout from './Layout';
import NotFoundPage from './pages/NotFoundPage';
import { useScrollNavigation } from './components/hooks/useScrollNavigation';
import { AnimatePresence } from 'framer-motion';
import Language from './components/languages/Language';

function App() {
    const location = useLocation();
    const { containerRef, pageStep } = useScrollNavigation();

    return (
        <main ref={containerRef} className="main">
            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home pageStep={pageStep} />} />
                        <Route
                            path="help"
                            element={<Help pageStep={pageStep} />}
                        />
                        <Route
                            path="features"
                            element={<Features pageStep={pageStep} />}
                        />
                        <Route
                            path="podcasts/:language"
                            element={<Language />}
                        />
                        <Route
                            path="podcasts"
                            element={
                                <Navigate to="/podcasts/english" replace />
                            }
                        />
                        <Route path="*" element={<Home />} />
                    </Route>
                </Routes>
            </AnimatePresence>
        </main>
    );
}

export default App;
