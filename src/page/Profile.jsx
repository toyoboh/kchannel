import React from "react";
import { useParams } from "react-router-dom";
import "../css/Profile.css";

function Profile() {
    return(
        <div className="profile">
            <div className="update-button-content">
                <button className="update-button">編集する</button>
            </div>

            <div className="user-icon-content">
                <div className="user-icon"></div>
            </div>

            <div className="user-main-content">
                <div className="user-name">しょう</div>
                <div className="user-id">@toyokurasho</div>
                <div className="introduction">こんにちは<br />はろー<br />さようなら</div>
            </div>
        </div>
    )
}

export default Profile;
