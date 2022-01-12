import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./css/App.css";
import Header from "./component/Header";
import Home from "./page/Home";
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
import RegisterAccount from "./page/RegisterAccount";
import PrivateRoute from "./component/route/PrivateRoute";
import PublicRoute from "./component/route/PublicRoute";
import RegistrationCompleted from "./page/RegistrationCompleted";
import TemporaryRegistrationCompleted from "./page/TemporaryRegistrationCompleted";
import ERROR404 from "./page/ERROR404";
import Welcome from "./page/Welcome";

function App() {
    return (
        <div className="app">
            <Router>
                <Switch>
                    <Route exact path="/" component={ Welcome } />

                    <PublicRoute path="/login" component={ Login } />

                    <PublicRoute path="/registerAccount" component={ RegisterAccount } />

                    <PublicRoute path="/registrationCompleted/:token" component={ RegistrationCompleted } />

                    <PublicRoute path="/temporaryRegistrationCompleted" component={ TemporaryRegistrationCompleted } />

                    {/* HACK: It's not cool to put Header in each Route */}
                    <PrivateRoute exact path="/home">
                        <Header />
                        <Home />
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

                    <Route component={ ERROR404 } />
                </Switch>
            </Router>
        </div>
    )
}

export default App;
