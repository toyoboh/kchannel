import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "../css/SettingProfile.css";
import { useUserContext } from "../context/User";

function SettingProfile() {
    const history  = useHistory();

    const { user } = useUserContext();

    // useState
    const [userDetail, setUserDetail]               = useState([]);
    const [message, setMessage]                     = useState("");
    const [inputUserName, setInputUserName]         = useState("");
    const [inputIntroduction, setInputIntroduction] = useState("");

    useEffect(() => {
        const url = `http://localhost:3000/GitHub/self/kchannel/backend/Api/userProfile.php?user_id=${ user.user_id }`;

        axios.get(url)
        .then((res) => {
            const resData = res.data;

            if(!Object.keys(resData.data).length) {
                setMessage(resData.message);
            } else {
                setUserDetail(resData.data);
                setInputUserName(resData.data.user_name);
                setInputIntroduction(resData.data.introduction);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }, [user])

    /**
     * update user data
     */
    const updateUserProfile = () => {
        const url = "http://localhost:3000/GitHub/self/kchannel/backend/Api/updateUserProfile.php";
        
        // Data to send in JSON format
        const postData = {
            user_id:      userDetail.user_id,
            user_name:    inputUserName,
            introduction: inputIntroduction
        };

        axios.post(url, postData)
        .then((res) => {
            if(res.data.update_result) {
                history.push("/profile/" + userDetail.user_id);
            } else {
                console.log(res.data);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }
    
    return(
        <div className="setting-profile">

            {/* Branch depending on whether the message is an empty string */}
            {message !== "" ?(
                <>
                    <div>{ message }</div>
                </>
            ) : (
                <>
                    <div className="button-content">
                        <button className="cancel-button">
                            <Link to={ "/profile/" + userDetail.user_id }>
                                キャンセル
                            </Link>
                        </button>
                        <button className="save-button" onClick={ updateUserProfile }>保存する</button>
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
                                <input 
                                    className="user-name-input"
                                    value={ inputUserName }
                                    onChange={ (e) => setInputUserName(e.target.value) }
                                    type="text"
                                    placeholder="名前を追加する"
                                />
                            </div>
                        </div>

                        <div className="introduction-content">
                            <div className="item-title">
                                自己紹介
                            </div>
                            <div className="item-content">
                                <textarea
                                    className="introduction-textarea"
                                    value={ inputIntroduction }
                                    onChange={ (e) => setInputIntroduction(e.target.value) }
                                    placeholder="自己紹介を追加する"
                                ></textarea>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default SettingProfile;
