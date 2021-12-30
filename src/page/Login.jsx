import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import "../css/Login.css";
import axios from "axios";
import { useUserContext } from "../context/User";
import ErrorMessage from "../component/ErrorMessage";

function Login() {
    // history
    const history                                   = useHistory();

    // context
    const { setUser }                               = useUserContext();

    // useState
    // csrf token
    const [csrfToken, setCsrfToken]                 = useState("");
    // Input item
    const [inputUserInfo, setInputUserInfo]                   = useState("test_user_id");
    const [inputPassword, setInputPassword]                   = useState("password");
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
                user_info: inputUserInfo,
                password: inputPassword,
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
                history.push("/categoryList");
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
                    Kちゃんねる
                </p>

                <div className="input-item-content user-content">
                    <p className="title">メールアドレス、ユーザID</p>
                    <input
                        type="text"
                        className="input input-user-info"
                        defaultValue={ inputUserInfo }
                        onChange={ (e) => setInputUserInfo(e.target.value) }
                    />
                </div>

                <div className="input-item-content password-content">
                    <p className="title">パスワード</p>
                    <input
                        type={ switchInputType }
                        className="input input-password"
                        defaultValue={ inputPassword }
                        onChange={ (e) => setInputPassword(e.target.value) }
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
                    {inputUserInfo !== "" && inputPassword ?
                    <button className="button enable" onClick={ login }>ログイン</button>
                    :
                    <button className="button disable">ログイン</button>
                    }
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
                    <Link to="/registerAccount">アカウントを作成する</Link>
                </p>
            </div>
        </div>
    )
}

export default Login;
