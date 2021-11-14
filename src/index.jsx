import React from "react";
import ReactDOM from "react-dom";
import "./css/destyle.css";
import "./css/index.css";
import App from "./App";
import { UserProvider } from "./context/User";

ReactDOM.render(
    <React.StrictMode>
        <UserProvider>
            <App />
        </UserProvider>
    </React.StrictMode>,
document.getElementById("root")
);
