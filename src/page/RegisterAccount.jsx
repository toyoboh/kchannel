import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "../css/RegisterAccount.css";
import ErrorMessage from "../component/ErrorMessage";
import Validation from "../tool/Validation";

function RegisterAccount() {
    // history
    const history                                     = useHistory();
    // state
    // CSRF token
    const [csrfToken, setCsrfToken]                   = useState("");
    // InputItem
    const [inputMailAddress, setInputMailAddress]     = useState("");
    const [inputUserId, setInputUserId]               = useState("");
    const [inputUserName, setInputUserName]           = useState("");
    const [inputPassword, setInputPassword]           = useState("");
    const [switchInputType, setSwitchInputType]       = useState("password");
    const [passwordCheckbox, setPasswordCheckbox]     = useState(false);
    // Error message
    const [mailAddressMessage, setMailAddressMessage] = useState("");
    const [userIdMessage, setUserIdMessage]           = useState("");
    const [userNameMessage, setUserNameMessage]       = useState("");
    const [passwordMessage, setPasswordMessage]       = useState("");

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

    const register = () => {
        // validation check
        if(!validationCheck()) return;

        const url = "http://localhost:3000/GitHub/self/kchannel/backend/Api/temporaryRegistration.php";
        axios.post(
            url,
            {
                csrf_token: csrfToken,
                mail_address: inputMailAddress,
                user_id: inputUserId,
                user_name: inputUserName,
                password: inputPassword,
                withCredentails: true
            }
        )
        .then((res) => {
            console.log(res.data);
            if(res.data.success) {
                history.push("/temporaryRegisterDone");
            } else {
                setUserIdMessage(res.data.message.user_id);
                setMailAddressMessage(res.data.message.mail_address);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const validationCheck = () => {
        const mailAddressCheckResult = mailAddressValidation();
        const userIdCheckResult      = userIdValidation();
        const userNameCheckResult    = userNameValidation();
        const passwordCheckResult    = passwordValidation();

        return mailAddressCheckResult && userIdCheckResult && userNameCheckResult && passwordCheckResult;
    }

    const mailAddressValidation = () => {
        if(!Validation.checkSpecifiedNumberOfCharacters(inputMailAddress, 1, 50, setMailAddressMessage)) return false;
        
        return true;
    }
    
    const userIdValidation = () => {
        if(!Validation.checkSpecifiedNumberOfCharacters(inputUserId, 1, 20, setUserIdMessage)) return false;
        
        return true;
    }
    
    const userNameValidation = () => {
        if(!Validation.checkSpecifiedNumberOfCharacters(inputUserName, 1, 50, setUserNameMessage)) return false;
        
        return true;
    }
    
    const passwordValidation = () => {
        if(!Validation.checkSpecifiedNumberOfCharacters(inputPassword, 8, 50, setPasswordMessage)) return false;
        return true;
    }

    return(
        <div className="register-account">
            <div className="form">
                <p className="app-name">
                    Kちゃんねる
                </p>

                <div className="input-item-content mail-address-content">
                    <p className="title">メールアドレス</p>
                    <input
                        type="text"
                        className="input input-mail-address"
                        defaultValue={ inputMailAddress }
                        onChange={ (e) => setInputMailAddress(e.target.value) }
                    />
                    {mailAddressMessage !== "" &&
                    <div className="error">
                        <ErrorMessage text={ mailAddressMessage } />
                    </div>
                    }
                </div>

                <div className="input-item-content user-id-content">
                    <p className="title">ユーザID</p>
                    <input
                        type="text"
                        className="input input-user-id"
                        defaultValue={ inputUserId }
                        onChange={ (e) => setInputUserId(e.target.value) }
                    />
                    {userIdMessage !== "" &&
                    <div className="error">
                        <ErrorMessage text={ userIdMessage } />
                    </div>
                    }
                </div>

                <div className="input-item-content user-name-content">
                    <p className="title">ユーザ名</p>
                    <input
                        type="text"
                        className="input input-user-name"
                        defaultValue={ inputUserName }
                        onChange={ (e) => setInputUserName(e.target.value) }
                    />
                    {userNameMessage !== "" &&
                    <div className="error">
                        <ErrorMessage text={ userNameMessage } />
                    </div>
                    }
                </div>

                <div className="input-item-content password-content">
                    <p className="title">パスワード</p>
                    <input
                        type={ switchInputType }
                        className="input input-password"
                        defaultValue={ inputPassword }
                        onChange={ (e) => setInputPassword(e.target.value) }
                    />
                    {passwordMessage !== "" &&
                    <div className="error">
                        <ErrorMessage text={ passwordMessage } />
                    </div>
                    }
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

                <div className="register-button-content">
                    {inputMailAddress !== "" && inputUserId !== "" && inputUserName !== "" && inputPassword !== "" ?
                    <button className="button enable" onClick={ register }>登録する</button>
                    :
                    <button className="button disable">登録する</button>
                    }
                </div>

                <p className="or-content">
                    または
                </p>

                <p className="login-link-content">
                    <Link to="/login">アカウントをお持ちの方はこちらへ</Link>
                </p>
            </div>
        </div>
    )
}

export default RegisterAccount;
