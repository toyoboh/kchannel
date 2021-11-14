import React from "react";
import "./css/App.css";
import { useUserContext } from "./context/User";

function App() {

    const { user, setUser } = useUserContext();

    const update = () => {
        setUser((prev) => {
            console.log(prev);
            //スプレッド構文練習 連想配列ver 重複したkeyの場合は上書きされるよう
            return { ...prev, ...{ isAuth: !prev.isAuth } };
            // const test = prev;
            // console.log("prev", prev);
            // test.isAuth = !test.isAuth;
            // console.log("test", test);
            // return test;
        })
    }

    return (
        <div className="app">
            <button onClick={ update }>button</button>
        </div>
    )
}

export default App
