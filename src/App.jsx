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

                {/* HACK: It's not cool to put Header in each Route */}
                <Route exact path="/">
                    <Header />
                    test
                </Route>

                <Route path="/setting/profile">
                    <Header />
                    <SettingProfile />
                </Route>

                <Route exact path="/profile/:userId">
                    <Header />
                    <Profile />
                </Route>

                <Route path="/createCategory">
                    <Header />
                    <CreateCategory />
                </Route>

                <Route path="/createBoard/:categoryId">
                    <Header />
                    <CreateBoard />
                </Route>

                <Route path="/createThread/:boardId">
                    <Header />
                    <CreateThread />
                </Route>

                <Route path="/categoryList">
                    <Header />
                    <CategoryList />
                </Route>

                <Route path="/boardList/:categoryId">
                    <Header />
                    <BoardList />
                </Route>

                <Route path="/threadList/:boardId">
                    <Header />
                    <ThreadList />
                </Route>

                <Route path="/CommentList/:threadId">
                    <Header />
                    <CommentList />
                </Route>
            </Router>
        </div>
    )
}

export default App;
