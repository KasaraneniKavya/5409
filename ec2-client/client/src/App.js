import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthHub from "./components/authHub";
import GetUsers from "./components/getUsers";
import FileUpload from "./components/fileUpload";

import "./App.css";

function App() {
    return (
        <div className="App">  
            <BrowserRouter>
                <Routes>
                    <Route path="/uploadtest" element={<FileUpload />}/>
                    <Route path="/" element={<div><AuthHub /><GetUsers /></div>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;