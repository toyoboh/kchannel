import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "../css/RegistrationCompleted.css";
import URL from "../info/Url";
import UIButton from "../component/ui/UIButton";
import { useHistory } from "react-router-dom";

function RegistrationCompleted() {
    const history                   = useHistory();

    // Parameter
    const { token }                 = useParams();

    // State
    const [csrfToken, setCsrfToken] = useState("");
    const [isEnable, setIsEnable]   = useState(false);
    const [message, setMessage]     = useState("");
    const [isLoading, setIsLoading] = useState(true);

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

    useEffect(() => {
        if(csrfToken === "" || token === "") return;
        
        axios[URL.accountRegistration.method](URL.accountRegistration.url, {
            token     : token,
            csrf_token: csrfToken
        })
        .then((res) => {
            if(res.data.success) {
                setIsEnable(true);
            } else {
                setIsEnable(false);
                setMessage(res.data.message);
            }
            setIsLoading(false);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [csrfToken, token]);

    const goToLogin = () => {
        history.push("/login");
    }

    return(
        <div className="registration-completed">
            <div className="container">
                <h1 className="app-name">
                    Kちゃんねる
                </h1>

                <div className="box">
                    {isLoading ? (

                    <p>確認中...</p>

                    ) : (<>
                        {isEnable ? (<>

                        <p className="message">この度はユーザ登録頂きありがとうございます。</p>

                        <p className="message">ぜひお楽しみください！</p>
                        
                        <div className="button-content">
                            <UIButton
                                colorkind="blue"
                                onClick={ goToLogin }
                            >Sign in</UIButton>
                        </div>

                        </>) : (<>

                        <p className="message caution">{ message }</p>

                        <p className="message">
                            <Link
                                className="link"
                                to="/registerAccount"
                            >こちら</Link>から再度ユーザ登録ください。
                        </p>

                        </>)}
                    </>)}
                </div>
            </div>
        </div>
    )
}

export default RegistrationCompleted;
