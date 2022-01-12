import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../css/Profile.css";
import { useUserContext } from "../context/User";
import URL from "../info/Url";

function Profile() {
    const { userId }                            = useParams();

    const { user, setUser }                     = useUserContext();

    const [userInformation, setUserInformation] = useState([]);
    const [message, setMessage]                 = useState("");


    useEffect(() => {
        axios[URL.userProfile.method](URL.userProfile.url, {
            params: {
                user_id: userId
            }
        })
        .then((res) => {
            if(res.data.success) {
                setUserInformation(res.data.data.user_information);
                setMessage("");
            } else {
                setUserInformation([]);
                setMessage(res.data.message);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }, [userId])

    // Logout Process
    const logout = () => {
        axios[URL.logout.method](URL.logout.url)
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
            <div className="wrapper">
                {/* Branch depending on whether the message is an empty string */}
                {message !== "" ?(
                    <>
                        <div className="message">{ message }</div>
                    </>
                ) : (
                    <>
                        {/* Display only when user id of the logged-in user and the user id on the profile page match */}
                        {user.user_id === userInformation.user_id &&
                        <div className="button-content">
                            <button
                                className="logout-button"
                                onClick={ logout }
                            >
                                ログアウト
                            </button>

                            <button className="update-button">
                                <Link to="/setting/profile">編集する</Link>
                            </button>
                        </div>
                        }

                        <div className="user-icon-content">
                            <div className="user-icon"></div>
                        </div>

                        <div className="user-main-content">
                            <div className="user-name">
                                { userInformation.user_name }
                            </div>
                            <div className="user-id">
                                @{ userInformation.user_id }
                            </div>
                            <div className="introduction">
                                { userInformation.introduction }
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Profile;
