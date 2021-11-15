import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./css/App.css";
// import { useUserContext } from "./context/User";
import Header from "./component/Header";
import Category from "./page/Category";

function App() {
    return (
        <div className="app">
            <Router>
                <Header />
                    <Route exact path="/category">
                        <Category />
                    </Route>
            </Router>
        </div>
    )
}

export default App;
