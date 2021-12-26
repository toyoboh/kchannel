import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../css/Profile.css";
import { useUserContext } from "../context/User";

function Profile() {
    const { userId } = useParams();

    const { user, setUser }   = useUserContext();

    const [userDetail, setUserDetail] = useState([]);
    const [message, setMessage]       = useState("");


    useEffect(() => {
        const url = `http://localhost:3000/GitHub/self/kchannel/backend/Api/userProfile.php?user_id=${userId}`;

        axios.get(url)
        .then((res) => {
            // Branch depending on whether the number of data in response data is 0
            if(!Object.keys(res.data.data).length) {
                setMessage(res.data.message);
            } else {
                setUserDetail(res.data.data);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }, [userId])

    // Logout Process
    const logout = () => {
        const url = `http://localhost:3000/GitHub/self/kchannel/backend/Api/logout.php`;
        axios.get(url)
        .then((res) => {
            if(res.data.success) {
                setUser({
                    user_id  : "",
                    user_name: "",
                    is_auth  : false
                })
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return(
        <div className="profile">

            {/* Branch depending on whether the message is an empty string */}
            {message !== "" ?(
                <>
                    <div className="message">{ message }</div>
                </>
            ) : (
                <>
                    <div className="button-content">
                        <button
                            className="logout-button"
                            onClick={ logout }
                        >
                            ログアウト
                        </button>

                        {/* Display only when user id of the logged-in user and the user id on the profile page match */}
                        {user.user_id === userDetail.user_id &&
                        <button className="update-button">
                            <Link to="/setting/profile">編集する</Link>
                        </button>
                        }
                    </div>

                    <div className="user-icon-content">
                        <div className="user-icon"></div>
                    </div>

                    <div className="user-main-content">
                        <div className="user-name">
                            { userDetail.user_name }
                        </div>
                        <div className="user-id">
                            @{ userDetail.user_id }
                        </div>
                        <div className="introduction">
                            { userDetail.introduction }
                        </div>
                    </div>
                </>
            )}

        </div>
    )
}

export default Profile;
