import "../css/CreateBoard.css";
import AddCircleOutlineOutlinedIcon    from "@material-ui/icons/AddCircleOutlineOutlined";
import axios                           from "axios";
import BackLink                        from "../component/BackLink";
import CreatePageParentName            from "../component/CreatePageParentName";
import CreateRule                      from "../component/CreateRule";
import DescriptionIcon                 from "@material-ui/icons/Description";
import ErrorMessage                    from "../component/ErrorMessage";
import PageTitle                       from "../component/PageTitle";
import React, { useEffect, useState }  from "react";
import UIButton                        from "../component/ui/UIButton";
import UIInput                         from "../component/ui/UIInput";
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
    const [csrfToken, setCsrfToken]                 = useState("");
    // Board Information
    const [boardInformation, setBoardInformation]   = useState([]);
    // Input item
    const [inputThreadName, setInputThreadName]     = useState("");
    // Error Message
    const [existsMessage, setExistsMessage]         = useState("");
    const [threadNameMessage, setThreadNameMessage] = useState("");

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
            board_id   : boardId,
            thread_name: inputThreadName,
            account_id : user.account_id,
            csrf_token : csrfToken
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

        return threadNameCheckResult;
    }

    const threadNameValidation = () => {
        if(!Validation.checkNotEmpty(inputThreadName, setThreadNameMessage)) return false;
        if(!Validation.checkSpecifiedNumberOfCharacters(inputThreadName, 1, 100, setThreadNameMessage)) return false;

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

                        <div className="input-content">
                            <UIInput
                                defaultValue={ inputThreadName }
                                onChange={ (e) => setInputThreadName(e.target.value) }
                                placeholder="スレッド名"
                            />
                        </div>

                        {/* Show only if the message is not an empty string. */}
                        {threadNameMessage !== "" &&
                            <div className="error-content">
                                <ErrorMessage text={ threadNameMessage } />
                            </div>
                        }
                    </div>

                    <div className="button-content">
                        <UIButton
                            colorkind="green"
                            onClick={ createThread }
                        ><AddCircleOutlineOutlinedIcon />追加
                        </UIButton>
                    </div>

                </div>
                </>)}
                
            </div>
        </div>
    )
}

export default CreateThread;
