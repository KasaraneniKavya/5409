import React from "react";
import AppRoutes from "./Routes";
import AuthHub from "./components/authHub";
import GetUsers from "./components/getUsers";
import "./App.css";

function App() {
    return (
        <div className="App">
            <AppRoutes />
            {/* <AuthHub />
            <GetUsers /> */}
        </div>
    );
}

export default App;