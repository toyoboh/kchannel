import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
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
import Login from "./page/Login";
import PrivateRoute from "./component/route/PrivateRoute";
import PublicRoute from "./component/route/PublicRoute";

function App() {
    return (
        <div className="app">
            <Router>
                <PublicRoute path="/login" component={ Login } />

                {/* HACK: It's not cool to put Header in each Route */}
                <PrivateRoute exact path="/">
                    <Header />
                    test
                </PrivateRoute>

                <PrivateRoute path="/setting/profile">
                    <Header />
                    <SettingProfile />
                </PrivateRoute>

                <PrivateRoute exact path="/profile/:userId">
                    <Header />
                    <Profile />
                </PrivateRoute>

                <PrivateRoute path="/createCategory">
                    <Header />
                    <CreateCategory />
                </PrivateRoute>

                <PrivateRoute path="/createBoard/:categoryId">
                    <Header />
                    <CreateBoard />
                </PrivateRoute>

                <PrivateRoute path="/createThread/:boardId">
                    <Header />
                    <CreateThread />
                </PrivateRoute>

                <PrivateRoute path="/categoryList">
                    <Header />
                    <CategoryList />
                </PrivateRoute>

                <PrivateRoute path="/boardList/:categoryId">
                    <Header />
                    <BoardList />
                </PrivateRoute>

                <PrivateRoute path="/threadList/:boardId">
                    <Header />
                    <ThreadList />
                </PrivateRoute>

                <PrivateRoute path="/CommentList/:threadId">
                    <Header />
                    <CommentList />
                </PrivateRoute>
            </Router>
        </div>
    )
}

export default App;
