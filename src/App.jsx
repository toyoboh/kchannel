import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./css/App.css";
// import { useUserContext } from "./context/User";
import Header from "./component/Header";
import CategoryList from "./page/CategoryList";
import BoardList from "./page/BoardList";
import ThreadList from "./page/ThreadList";
import CommentList from "./page/CommentList";
import Profile from "./page/Profile";
import SettingProfile from "./page/SettingProfile";
import CreateCategory from "./page/CreateCategory";
import CreateBoard from "./page/CreateBoard";
import CreateThread from "./page/CreateThread";

function App() {
    return (
        <div className="app">
            <Router>
                <Header />
                    <Route exact path="/">test</Route>
                    <Route path="/setting/profile" component={ SettingProfile } />

                    <Route exact path="/profile/:userId" component={ Profile } />

                    <Route path="/createCategory" component={ CreateCategory } />

                    <Route path="/createBoard/:categoryId" component={ CreateBoard } />

                    <Route path="/createThread/:boardId" component={ CreateThread } />

                    <Route path="/categoryList" component={ CategoryList } />

                    <Route path="/boardList/:categoryId" component={ BoardList } />

                    <Route path="/threadList/:boardId" component={ ThreadList } />

                    <Route path="/CommentList/:threadId" component={ CommentList } />
            </Router>
        </div>
    )
}

export default App;
