import React from "react";
import "../css/TemporaryRegisterDone.css";

function TemporaryRegisterDone() {
    return(
        <div className="temporary-register-done">
            <div className="main">
                <p className="app-name">Kちゃんねる</p>

                <div className="done-message-content">
                    <p className="item">ユーザ登録ありがとうございます。ユーザ登録用のURLをメールにて送信しました。</p>
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

export default TemporaryRegisterDone;
