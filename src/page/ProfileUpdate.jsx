import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import "../css/ProfileUpdate.css";

function ProfileUpdate() {
    const { userId } = useParams();

    useEffect(() => {
        
    }, [userId])
    
    return(
        <div className="profile-update">
            <div className="save-button-content">
                <button className="save-button">保存する</button>
            </div>

            <div className="user-icon-content">
                <div className="user-icon"></div>
            </div>

            <div className="user-main-content">
                <div className="user-name-content">
                    <div className="item-title">
                        名前
                    </div>
                    <div className="item-content">
                        <input className="user-name-input" type="text" placeholder="名前を追加する" />
                    </div>
                </div>

                <div className="introduction-content">
                    <div className="item-title">
                        自己紹介
                    </div>
                    <div className="item-content">
                        <textarea className="introduction-textarea" placeholder="自己紹介を追加する"></textarea>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileUpdate;
