import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./css/App.css";
// import { useUserContext } from "./context/User";
import Header from "./component/Header";
import CategoryList from "./page/CategoryList";
import BoardList from "./page/BoardList";
import ThreadList from "./page/ThreadList";

function App() {
    return (
        <div className="app">
            <Router>
                <Header />
                    <Route exact path="/categoryList">
                        <CategoryList />
                    </Route>
                    <Route exact path="/boardList/:categoryId">
                        <BoardList />
                    </Route>
                    <Route exact path="/threadList/:boardId">
                        <ThreadList />
                    </Route>
            </Router>
        </div>
    )
}

export default App;
