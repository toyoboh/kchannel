import React from "react";
import "../css/TemporaryRegistrationCompleted.css";

function TemporaryRegistrationCompleted() {
    return(
        <div className="temporary-registration-completed">
            <div className="container">
                <h1 className="app-name">
                    Kちゃんねる
                </h1>

                <div className="box">
                    <p className="message">この度はユーザ登録（仮）頂きありがとうございます。</p>

                    <p className="message">ユーザ登録用のリンクをメールにて送信致しました。</p>
                    
                    <p className="message caution">※現時点ではユーザ登録は完了していません。</p>

                    <p className="message">メールをご確認の上、本文中のリンクにアクセス頂くことで本登録が完了となります。</p>
                        
                    <p className="message">また、リンクの有効期限はユーザ登録（仮）完了から24時間となります。</p>
                </div>
            </div>
        </div>
    )
}

export default TemporaryRegistrationCompleted;
