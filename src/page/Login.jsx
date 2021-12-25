import React, { useState, useEffect } from "react";
import "../css/Login.css";
import axios from "axios";
import { useUserContext } from "../context/User";
import ErrorMessage from "../component/ErrorMessage";

function Login() {
    // context
    const { setUser }                               = useUserContext();

    // useState
    // csrf token
    const [csrfToken, setCsrfToken]                 = useState("");
    // Input item
    const [userInfo, setUserInfo]                   = useState("test_user_id");
    const [password, setPassword]                   = useState("password");
    const [switchInputType, setSwitchInputType]     = useState("password");
    const [passwordCheckbox, setPasswordCheckbox]   = useState(false);
    // Error message
    const [loginErrorMessage, setLoginErrorMessage] = useState("");

    // Set csrf token
    useEffect(() => {
        const csrfTokenUrl = "http://localhost:3000/GitHub/self/kchannel/backend/Api/csrfToken.php";
        axios.put(
            csrfTokenUrl,
            {
                withCredentials: true
            }
        )
        .then((res) => {
            if(res.data.success) {
                setCsrfToken(res.data.csrf_token);
            } else {
                // nothing
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])

    // Check the "password input" tyep of type depending on the value of "checkbox"
    useEffect(() => {
        if(passwordCheckbox) {
            setSwitchInputType("text");
        } else {
            setSwitchInputType("password");
        }
    }, [passwordCheckbox])

    // Login proccessing 
    const login = () => {
        const url = "http://localhost:3000/GitHub/self/kchannel/backend/Api/login.php";
        axios.post(
            url,
            {
                csrf_token: csrfToken,
                user_info: userInfo,
                password: password,
                withCredentials: true
            }
        )
        .then((res) => {
            if(res.data.success) {
                console.log(res.data);
                setUser({
                    user_id  : res.data.data.user_id,
                    user_name: res.data.data.user_name,
                    is_auth  : true
                });
            } else {
                setLoginErrorMessage(res.data.message);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return(
        <div className="login">
            
            <div className="form">
                <p className="app-name">
                    テスト
                </p>

                <div className="user-content">
                    <p className="title">メールアドレス、ユーザID</p>
                    <input
                        type="text"
                        className="input-user-info"
                        defaultValue={ userInfo }
                        onChange={ (e) => setUserInfo(e.target.value) }
                    />
                </div>

                <div className="password-content">
                    <p className="title">パスワード</p>
                    <input
                        type={ switchInputType }
                        className="input-password"
                        defaultValue={ password }
                        onChange={ (e) => setPassword(e.target.value) }
                    />
                </div>

                <div className="password-display-content">
                    <label
                        className="label"
                        htmlFor="passCheckbox"
                    >パスワードを表示する
                    </label>

                    <input
                        type="checkbox"
                        id="passCheckbox"
                        className="password-checkbox"
                        defaultChecked={ passwordCheckbox }
                        onChange={ () => { setPasswordCheckbox(!passwordCheckbox) } }
                    />
                </div>

                <div className="login-button-content">
                    <button
                        className="button"
                        onClick={ login }
                    >ログイン</button>
                </div>

                {loginErrorMessage !== "" &&
                <div className="error-content">
                    <ErrorMessage text={ loginErrorMessage } />
                </div>
                }

                <p className="or-content">
                    または
                </p>

                <p className="create-link-content">
                    アカウントを作成する
                </p>
            </div>
        </div>
    )
}

export default Login;
