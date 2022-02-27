import "./css/App.css";
import Authorization                              from "./tool/Authorization";
import BoardList                                  from "./page/BoardList";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CategoryList                               from "./page/CategoryList";
import ClientError                                from "./page/ClientError";
import CommentList                                from "./page/CommentList";
import CreateBoard                                from "./page/CreateBoard";
import CreateCategory                             from "./page/CreateCategory";
import CreateThread                               from "./page/CreateThread";
import Header                                     from "./component/Header";
import Home                                       from "./page/Home";
import Login                                      from "./page/Login";
import PrivateRoute                               from "./component/route/PrivateRoute";
import Profile                                    from "./page/Profile";
import PublicRoute                                from "./component/route/PublicRoute";
import React                                      from "react";
import RegistrationCompleted                      from "./page/RegistrationCompleted";
import RegisterAccount                            from "./page/RegisterAccount";
import SettingProfile                             from "./page/SettingProfile";
import TemporaryRegistrationCompleted             from "./page/TemporaryRegistrationCompleted";
import ThreadList                                 from "./page/ThreadList";
import { useUserContext }                         from "./context/User";
import Welcome                                    from "./page/Welcome";

function App() {
    const { user } = useUserContext();

    const authorization = new Authorization(user.authority);

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
                        {authorization.createCategory() ? (<>
                            <Header />
                            <CreateCategory />
                        </>) : (
                            <ClientError errorCode="401" />
                        )}
                    </PrivateRoute>

                    <PrivateRoute path="/createBoard/:categoryId">
                        {authorization.createBoard() ? (<>
                            <Header />
                            <CreateBoard />
                        </>) : (
                            <ClientError errorCode="401" />
                        )}
                    </PrivateRoute>

                    <PrivateRoute path="/createThread/:boardId">
                        {authorization.createThread() ? (<>
                            <Header />
                            <CreateThread />
                        </>) : (
                            <ClientError errorCode="401" />
                        )}
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

                    <Route>
                        <ClientError 
                            errorCode={ 404 }
                        />
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}

export default App;
