import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import "../css/CreateBoard.css";
import axios from "axios";
import DescriptionIcon from "@material-ui/icons/Description";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import PageTitle from "../component/PageTitle";
import InputPlusButton from "../component/InputPlusButton";
import ErrorMessage from "../component/ErrorMessage";
import CreateRule from "../component/CreateRule";
import BackLink from "../component/BackLink";
import CreatePageParentName from "../component/CreatePageParentName";
import { useUserContext } from "../context/User";

function CreateThread() {
    // History
    const history     = useHistory();

    // Parameter
    const { boardId } = useParams();

    // csrf token
    const [csrfToken, setCsrfToken] = useState("");

    // context
    const { user }                  = useUserContext();

    // Board Information
    const [boardInfo, setBoardInfo] = useState([]);

    // Input item
    const [inputThreadName, setInputThreadName]   = useState("");
    const [inputThreadExplanation, setInputThreadExplanation] = useState("");

    // Display message
    // Error message if the board not exists
    const [existsMessage, setExistsMessage]  = useState("");
    // Error message when board creation fails
    const [message, setMessage]              = useState("");

    // Set csrf token
    useEffect(() => {
        const csrfTokenUrl = "http://localhost:3000/GitHub/self/kchannel/backend/Api/csrfToken.php";
        axios.put(
            csrfTokenUrl,
            {
                withCredentials: true
            }
        )
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

    // Set Board information
    useEffect(() => {
        const url = `http://localhost:3000/GitHub/self/kchannel/backend/Api//checkBoardExists.php?board_id=${ boardId }`;
        axios.get(url)
        .then((res) => {
            const resData = res.data;
            if(resData.data.board_exists) {
                setBoardInfo(resData.data.board_info);
            } else {
                setExistsMessage(resData.message)
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }, [boardId])

    // Create the new Thread
    const createThread = () => {
        const createUrl = "http://localhost:3000/GitHub/self/kchannel/backend/Api/createThread.php";
        axios.post(
            createUrl,
            {
                board_id          : boardInfo.board_id,
                thread_name       : inputThreadName,
                thread_explanation: inputThreadExplanation,
                user_id           : user.user_id,
                csrf_token        : csrfToken,
                withCredentials   : true
            }
        )
        .then((res) => {
            if(res.data.success) {
                history.push(`/threadList/${boardInfo.board_id}`);
            } else {
                setMessage(res.data.message);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return(
        <div className="create-board">
            
            <div className="title-content">
                <PageTitle Icon={ DescriptionIcon } title="Create Thread" />
            </div>

            {existsMessage !== "" ? (
                <>
                    {/* Content on Error */}
                    <div>
                        <p>{ existsMessage }</p>
                        <p><Link to="/categoryList">Category一覧に戻る</Link></p>
                    </div>
                </>
            ) : (
                <>

                    <div className="back-link-content">
                        <BackLink
                            path={ `/threadList/${boardInfo.board_id}` }
                            title="戻る"
                        />
                    </div>

                    <div className="rule-content">
                        <CreateRule
                            title="注意"
                            body="登録する際は、一覧画面にて類似したものがないことを確認してください。"
                        />
                    </div>

                    <div className="parent-name-content">
                        <CreatePageParentName
                            title="category name"
                            name={ boardInfo.board_name }
                        />
                    </div>

                    <div className="form-content">
                        <div className="title">New Thread Name</div>

                        <div className="content">
                            <InputPlusButton
                                value={ inputThreadName }
                                changeFunction={ setInputThreadName }
                                buttonFunction={ createThread }
                                Icon={ BorderColorIcon }
                            />
                        </div>

                        {/* Show only if the message is not an empty string. */}
                        {message !== "" &&
                            <div className="error-content">
                                <ErrorMessage text={ message } />
                            </div>
                        }
                    </div>
                </>
            )}

        </div>
    )
}

export default CreateThread;
