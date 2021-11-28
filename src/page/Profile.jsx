import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../css/Profile.css";
import { useUserContext } from "../context/User";

function Profile() {
    const { userId } = useParams();

    const [userDetail, setUserDetail] = useState([]);
    const [message, setMessage] = useState("");

    const { user } = useUserContext();

    useEffect(() => {
        const url = `http://localhost:3000/GitHub/self/kchannel/backend/Api/userProfile.php?user_id=${userId}`;

        axios.get(url)
        .then((res) => {
            const resData = res.data;

            // Branch depending on whether the number of data in response data is 0
            if(!Object.keys(resData.data).length) {
                setMessage(resData.message);
            } else {
                setUserDetail(resData.data);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }, [userId])

    return(
        <div className="profile">

            {/* Branch depending on whether the message is an empty string */}
            {message !== "" ?(
                <>
                    <div className="message">{ message }</div>
                </>
            ) : (
                <>
                    {/* Display only when user id of the logged-in user and the user id on the profile page match */}
                    {user.user_id === userDetail.user_id &&
                        <div className="update-button-content">
                            <button className="update-button">
                                <Link to={ "/profile/update/" + userDetail.user_id }>編集する</Link>
                            </button>
                        </div>
                    }

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
