import "../css/Login.css";
import axios                          from "axios";
import ErrorMessage                   from "../component/ErrorMessage";
import React, { useState, useEffect } from "react";
import UILink                         from "../component/ui/UILink";
import URL                            from "../info/Url";
import { useHistory }                 from "react-router-dom";
import { useUserContext }             from "../context/User";
import VisibilityIcon                 from "@material-ui/icons/Visibility";
import VisibilityOffIcon              from "@material-ui/icons/VisibilityOff";

function Login() {
    // history
    const history                                   = useHistory();

    // context
    const { setUser }                               = useUserContext();

    // useState
    // csrf token
    const [csrfToken, setCsrfToken]                 = useState("");
    // Input item
    const [inputUserInfo, setInputUserInfo]         = useState("test_user_id"); //test_user_id
    const [inputPassword, setInputPassword]         = useState("test_user_password"); //password
    const [switchInputType, setSwitchInputType]     = useState("password");
    const [passwordCheckbox, setPasswordCheckbox]   = useState(false);
    const [isAutoLogin, setIsAutoLogin]             = useState(false);
    // Error message
    const [loginErrorMessage, setLoginErrorMessage] = useState("");

    // Set csrf token
    useEffect(() => {
        axios[URL.csrfToken.method](URL.csrfToken.url, {
            withCredentials: true
        })
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
        axios[URL.login.method](URL.login.url, {
            csrf_token:    csrfToken,
            user_info:     inputUserInfo,
            password:      inputPassword,
            is_auto_login: isAutoLogin
        })
        .then((res) => {
            if(res.data.success) {
                setUser({
                    account_id: res.data.data.account_id,
                    user_id   : res.data.data.user_id,
                    user_name : res.data.data.user_name,
                    authority : res.data.data.authority,
                    is_auth   : true
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
            
            <div className="container">

                <h1 className="app-name">
                    Kちゃんねる
                </h1>
            
                <div className="form">

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
                        <div className="input-password-content">
                            <input
                                type={ switchInputType }
                                className="input input-password"
                                defaultValue={ inputPassword }
                                onChange={ (e) => setInputPassword(e.target.value) }
                            />
                            {passwordCheckbox
                            ?<VisibilityIcon    onClick={ () => setPasswordCheckbox(prev => !prev)} />
                            :<VisibilityOffIcon onClick={ () => setPasswordCheckbox(prev => !prev)} />
                            }
                        </div>
                    </div>

                    <div className="auto-login-content">
                        <input
                            type="checkbox"
                            id="autoLoginCheckbox"
                            className="checkbox"
                            defaultValue={ isAutoLogin }
                            onChange={ () => setIsAutoLogin(prev => !prev) }
                        />

                        <label
                            className="label"
                            htmlFor="autoLoginCheckbox"
                        >次回から自動ログイン</label>
                    </div>

                    <div className="login-button-content">
                        {inputUserInfo === "" || inputPassword === "" ?
                        <button className="button disable">ログイン</button>
                        :
                        <button className="button enable" onClick={ login }>ログイン</button>
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
                        <UILink
                            to="/registerAccount"
                            underline="true"
                            sizekind="small"
                        >アカウントを作成する</UILink>
                    </p>
                </div>

            </div>

        </div>
    )
}

export default Login;
