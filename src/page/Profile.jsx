import React from "react";
import { useParams, Link } from "react-router-dom";
import "../css/Profile.css";

function Profile() {
    const { userId } = useParams();
    const userUpdateLink = "/profile/update/" + userId;

    return(
        <div className="profile">
            <div className="update-button-content">
                <button className="update-button">
                    <Link to={ userUpdateLink }>
                        編集する
                    </Link>
                </button>
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
