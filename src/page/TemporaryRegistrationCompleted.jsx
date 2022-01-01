import React from "react";
import "../css/TemporaryRegistrationCompleted.css";

function TemporaryRegistrationCompleted() {
    return(
        <div className="temporary-registration-completed">
            <div className="main">
                <div className="app-name-content">
                    <p className="app-name">Kちゃんねる</p>
                </div>

                <div className="message-content">
                    <p className="item">ユーザ登録(仮)ありがとうございます。ユーザ登録用のURLをメールにて送信しました。</p>

                    <p className="item not-done">現時点ではユーザ登録は完了していません。</p>

                    <p className="item">
                        メールをご確認の上、メール本文中のURLをクリックし、本登録を完了してください。<br />
                        ※リンクの有効期限は24時間です。
                    </p>
                </div>
            </div>
        </div>
    )
}

export default TemporaryRegistrationCompleted;
