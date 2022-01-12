import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "../css/SettingProfile.css";
import { useUserContext } from "../context/User";
import ErrorMessage from "../component/ErrorMessage";
import Validation from "../tool/Validation";
import URL from "../info/Url";

function SettingProfile() {
    const history                                       = useHistory();

    const { user }                                      = useUserContext();

    // useState
    // Csrf token
    const [csrfToken, setCsrfToken]                     = useState("");
    // User information
    const [userInformation, setUserInformation]                   = useState([]);
    // Error message
    const [existMessage, setExistMessage]               = useState("");
    const [userNameMessage, setUserNameMessage]         = useState("");
    const [introductionMessage, setIntroductionMessage] = useState("");
    // Input item
    const [inputUserName, setInputUserName]             = useState("");
    const [inputIntroduction, setInputIntroduction]     = useState("");

    // Set csrf token
    useEffect(() => {
        axios[URL.csrfToken.method](URL.csrfToken.url, {
            withCredentials: true
        })
        .then((res) => {
            if(res.data.success) {
                setCsrfToken(res.data.csrf_token);
            } else {
                // nothing
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])

    useEffect(() => {
        axios[URL.userProfile.method](URL.userProfile.url, {
            params: {
                user_id: user.user_id
            }
        })
        .then((res) => {
            if(res.data.success) {
                setUserInformation(  res.data.data.user_information);
                setInputUserName(    res.data.data.user_information.user_name);
                setInputIntroduction(res.data.data.user_information.introduction);
            } else {
                setUserInformation([]);
                setExistMessage(res.data.message);
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
        // Exit if validation check result is False
        if(!validationCheck()) return;

        axios[URL.updateUserProfile.method](URL.updateUserProfile.url, {
            user_id        : userInformation.user_id,
            user_name      : inputUserName,
            introduction   : inputIntroduction,
            csrf_token     : csrfToken,
            withCredentials: true
        })
        .then((res) => {
            if(res.data.success) {
                history.push("/profile/" + userInformation.user_id);
            } else {
                // TODO: Needs details notification to user
                alert(res.data.message);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const validationCheck = () => {
        const userNameCheckResult = userNameValidation();
        const introductionCheckResult = introductionValidation();

        return userNameCheckResult && introductionCheckResult;
    }

    const userNameValidation = () => {
        if(!Validation.checkNotEmpty(inputUserName, setUserNameMessage)) return false;
        if(!Validation.checkSpecifiedNumberOfCharacters(inputIntroduction, 1, 50, setIntroductionMessage)) return false;

        return true;
    }

    const introductionValidation = () => {
        // TODO: add validation
        return true;
    }
    
    return(
        <div className="setting-profile">
            <div className="wrapper">
                {/* Branch depending on whether the existMessage is an empty string */}
                {existMessage !== "" ?(
                    <>
                        <div>{ existMessage }</div>
                    </>
                ) : (
                    <>
                        <div className="button-content">
                            <button className="cancel-button">
                                <Link to={ "/profile/" + userInformation.user_id }>
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
                                    {userNameMessage !== "" &&
                                        <div className="error-content">
                                            <ErrorMessage text={ userNameMessage } />
                                        </div>
                                    }
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
                                    {introductionMessage !== "" &&
                                        <div className="error-content">
                                            <ErrorMessage text={ introductionMessage } />
                                        </div>
                                    }
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
        </div>
    )
}

export default SettingProfile;
