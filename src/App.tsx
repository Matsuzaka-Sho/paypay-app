import React from 'react';
import { Reserve } from "./components/checkout/Reserve";
import { Complete } from "./components/checkout/Complete"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

export const App = () => {
    return (
    <Router>
        <Routes>
            <Route path="/" element={<Reserve />} />
            <Route path="/complete" element={<Complete />} />
        </Routes>
    </Router>
  );
}
