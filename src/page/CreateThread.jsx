import "../css/CreateBoard.css";
import axios                           from "axios";
import BackLink                        from "../component/BackLink";
import BorderColorIcon                 from "@material-ui/icons/BorderColor";
import CreatePageParentName            from "../component/CreatePageParentName";
import CreateRule                      from "../component/CreateRule";
import DescriptionIcon                 from "@material-ui/icons/Description";
import ErrorMessage                    from "../component/ErrorMessage";
import ExplanationForm                 from "../component/ExplanationForm";
import InputPlusButton                 from "../component/InputPlusButton";
import PageTitle                       from "../component/PageTitle";
import React, { useEffect, useState }  from "react";
import URL                             from "../info/Url";
import { useParams, Link, useHistory } from "react-router-dom";
import { useUserContext }              from "../context/User";
import Validation                      from "../tool/Validation";

function CreateThread() {
    // History
    const history     = useHistory();

    // Parameter
    const { boardId } = useParams();

    // context
    const { user }    = useUserContext();
    
    // State
    // csrf token
    const [csrfToken, setCsrfToken]                               = useState("");
    // Board Information
    const [boardInformation, setBoardInformation]                 = useState([]);
    // Input item
    const [inputThreadName, setInputThreadName]                   = useState("");
    const [inputThreadExplanation, setInputThreadExplanation]     = useState("");
    // Error Message
    const [existsMessage, setExistsMessage]                       = useState("");
    const [threadNameMessage, setThreadNameMessage]               = useState("");
    const [threadExplanationMessage, setThreadExplanationMessage] = useState("");

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

    /**
     * check if the board exists
     */
    useEffect(() => {
        axios[URL.fetchBoardInformation.method](URL.fetchBoardInformation.url, {
            params: {
                board_id: boardId
            }
        })
        .then((res) => {
            if(res.data.success) {
                // setBoardExists(true);
                setBoardInformation(res.data.data.board_information);
            } else {
                setExistsMessage("存在しない掲示板です。");
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }, [boardId]);

    // Create the new Thread
    const createThread = () => {
        if(!validationCheck()) return;

        axios[URL.createThread.method](URL.createThread.url, {
            board_id          : boardId,
            thread_name       : inputThreadName,
            thread_explanation: inputThreadExplanation,
            account_id        : user.account_id,
            csrf_token        : csrfToken
        })
        .then((res) => {
            if(res.data.success) {
                history.push(`/threadList/${boardInformation.board_id}`);
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
        if(!Validation.checkSpecifiedNumberOfCharacters(inputThreadName, 1, 100, setThreadNameMessage)) return false;

        return true;
    }

    const threadExplanationValidation = () => {
        if(!Validation.checkNotEmpty(inputThreadExplanation, setThreadExplanationMessage)) return false;

        return true;
    }

    return(
        <div className="create-board">
            <div className="wrapper">
                <div className="title-content">
                    <PageTitle Icon={ DescriptionIcon } title="スレッド作成" />
                </div>

                {existsMessage !== "" ? (<>
                {/* Content on Error */}
                <div>
                    <p>{ existsMessage }</p>
                    <p><Link to="/categoryList">カテゴリー一覧に戻る</Link></p>
                </div>

                </>) : (<>

                <div className="back-link-content">
                    <BackLink
                        path={ `/threadList/${boardInformation.board_id}` }
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
                        title="掲示板名"
                        name={ boardInformation.board_name }
                    />
                </div>

                <div className="form-content">
                    <div className="name-content">
                        <div className="form-item-title">スレッド名</div>

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
                        <div className="form-item-title">説明</div>
                        
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
                </>)}
                
            </div>
        </div>
    )
}

export default CreateThread;
