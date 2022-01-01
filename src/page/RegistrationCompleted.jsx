import React from "react";
import "../css/RegistrationCompleted.css";
import { Link } from "react-router-dom";

function RegistrationCompleted() {
    return(
        <div className="registration-completed">
            <div className="main">
                <div className="app-name-content">
                    <p className="app-name">Kちゃんねる</p>
                </div>

                <div className="message-content">
                    <p className="item">ユーザ登録が完了しました。</p>
                    
                    <p className="item login-link-content">
                        <Link to="/login">ログインする</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default RegistrationCompleted;
