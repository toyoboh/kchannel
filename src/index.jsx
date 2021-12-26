import React from "react";
import ReactDOM from "react-dom";
import "./css/destyle.css";
import "./css/index.css";
import { UserProvider } from "./context/User";
import LoggedInCheck from "./component/route/LoggedInCheck";

ReactDOM.render(
    <React.StrictMode>
        <UserProvider>
            <LoggedInCheck />
        </UserProvider>
    </React.StrictMode>,
document.getElementById("root")
);
