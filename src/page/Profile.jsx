import "../css/Profile.css";
import axios                          from "axios";
import React, { useState, useEffect } from "react";
import UIButton                       from "../component/ui/UIButton";
import URL                            from "../info/Url";
import { useParams, useHistory }      from "react-router-dom";
import { useUserContext }             from "../context/User";

function Profile() {
    const history                               = useHistory();

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
                    id       : 0,
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

    const moveUpdatePage = () => {
        history.push("/setting/profile");
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
                            <UIButton
                                onClick={ logout }
                                type="light"
                            >ログアウト</UIButton>

                            <UIButton
                                className="update-button"
                                colorkind="blue"
                                onClick={ moveUpdatePage }
                            >編集する</UIButton>
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
                                { userInformation.user_id }
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
