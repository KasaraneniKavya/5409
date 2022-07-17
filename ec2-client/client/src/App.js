import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthHub from "./components/authHub";
import GetUsers from "./components/getUsers";
import FileUpload from "./components/fileUpload";

import "./App.css";
import AppRoutes from "./Routes";

function App() {
    return (

        <div className="App">
            <AppRoutes />
        </div>
    );
}

export default App;