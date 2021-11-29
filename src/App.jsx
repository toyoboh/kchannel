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

function App() {
    return (
        <div className="app">
            <Router>
                <Header />
                    <Route exact path="/">test</Route>
                    <Route path="/setting/profile">
                        <SettingProfile />
                    </Route>
                    <Route exact path="/profile/:userId">
                        <Profile />
                    </Route>
                    <Route path="/createCategory">
                        <CreateCategory />
                    </Route>
                    <Route path="/createBoard">
                        <CreateBoard />
                    </Route>
                    <Route path="/categoryList">
                        <CategoryList />
                    </Route>
                    <Route path="/boardList/:categoryId">
                        <BoardList />
                    </Route>
                    <Route path="/threadList/:boardId">
                        <ThreadList />
                    </Route>
                    <Route path="/CommentList/:threadId">
                        <CommentList />
                    </Route>
            </Router>
        </div>
    )
}

export default App;
