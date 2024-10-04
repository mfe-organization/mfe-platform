import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './App.css'; // Подключаем стили

const FrontendA = React.lazy(() => import('frontendA/App'));
const FrontendB = React.lazy(() => import('frontendB/App'));

function App() {
    return (
        <Router>
            <div className="container">
                <div className="section section-investors">
                    <h2>Investors Section</h2>
                    <Link to="/frontendA">
                        <button className="big-button">Load Frontend A (Investors)</button>
                    </Link>
                </div>
                <div className="section section-auditors">
                    <h2>Auditors Section</h2>
                    <Link to="/frontendB">
                        <button className="big-button">Load Frontend B (Auditors)</button>
                    </Link>
                </div>

                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        <Route path="/frontendA" element={<FrontendA />} />
                        <Route path="/frontendB" element={<FrontendB />} />
                    </Routes>
                </Suspense>
            </div>
        </Router>
    );
}

export default App;
