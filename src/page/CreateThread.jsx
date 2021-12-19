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
import ExplanationForm from "../component/ExplanationForm";
import Validation from "../tool/Validation";

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
    const [threadNameMessage, setThreadNameMessage] = useState("");
    const [threadExplanationMessage, setThreadExplanationMessage] = useState("");

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
        if(!validationCheck()) return;
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
                setThreadNameMessage(res.data.message);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const validationCheck = () => {
        const threadNameCheckResult = threadNameValidation();
        const threadExplanationCheckResult = threadExplanationValidation();

        return threadNameCheckResult && threadExplanationCheckResult;
    }

    const threadNameValidation = () => {
        if(!Validation.checkNotEmpty(inputThreadName, setThreadNameMessage)) return false;

        return true;
    }

    const threadExplanationValidation = () => {
        if(!Validation.checkNotEmpty(inputThreadExplanation, setThreadExplanationMessage)) return false;

        return true;
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
                        <div className="name-content">
                            <div className="form-item-title">New Thread Name</div>

                            <InputPlusButton
                                value={ inputThreadName }
                                changeFunction={ setInputThreadName }
                                buttonFunction={ createThread }
                                Icon={ BorderColorIcon }
                            />

                            {/* Show only if the message is not an empty string. */}
                            {threadNameMessage !== "" &&
                                <div className="error-content">
                                    <ErrorMessage text={ threadNameMessage } />
                                </div>
                            }
                        </div>

                        <div className="explanation-content">
                            <div className="form-item-title">Board Explanation</div>
                            
                            <ExplanationForm
                                value={ inputThreadExplanation }
                                changeFunction={ setInputThreadExplanation }
                            />

                            {threadExplanationMessage !== "" &&
                                <div className="error-content">
                                    <ErrorMessage text={ threadExplanationMessage } />
                                </div>
                            }
                        </div>

                    </div>
                </>
            )}

        </div>
    )
}

export default CreateThread;
