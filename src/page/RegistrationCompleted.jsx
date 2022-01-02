import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "../css/RegistrationCompleted.css";

function RegistrationCompleted() {
    // Parameter
    const { token } = useParams();

    // State
    const [csrfToken, setCsrfToken] = useState("");
    const [isExpire, setIsExpire] = useState(true);
    const [message, setMessage]     = useState("");

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

    useEffect(() => {
        const url = "http://localhost:3000/GitHub/self/kchannel/backend/Api/accountRegistration.php";

        axios.post(
            url,
            {
                token: token,
                csrf_token: csrfToken,
                withCredentials: true
            }
        )
        .then((res) => {
            if(res.data.success) {
                setIsExpire(false);
            } else {
                setIsExpire(true);
                setMessage(res.data.message);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }, [csrfToken, token]);

    return(
        <div className="registration-completed">
            <div className="main">
                <div className="app-name-content">
                    <p className="app-name">Kちゃんねる</p>
                </div>

                {isExpire ? (
                <div className="message-content">
                    <p className="item">{ message }</p>

                    <p className="item">再度ユーザ登録をしてください。</p>

                    <p className="item login-link-content">
                        <Link to="/registerAccount">登録する</Link>
                    </p>
                </div>
                ) : (
                <div className="message-content">
                    <p className="item">ユーザ登録が完了しました。</p>

                    <p className="item login-link-content">
                        <Link to="/login">続けてログイン</Link>
                    </p>
                </div>
                )
                }
            </div>
        </div>
    )
}

export default RegistrationCompleted;
