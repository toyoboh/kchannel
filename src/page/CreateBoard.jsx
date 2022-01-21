import "../css/CreateBoard.css";
import axios                           from "axios";
import BackLink                        from "../component/BackLink";
import BorderColorIcon                 from "@material-ui/icons/BorderColor";
import CreatePageParentName            from "../component/CreatePageParentName";
import CreateRule                      from "../component/CreateRule";
import ErrorMessage                    from "../component/ErrorMessage";
import ExplanationForm                 from "../component/ExplanationForm";
import InputPlusButton                 from "../component/InputPlusButton";
import PageTitle                       from "../component/PageTitle";
import React, { useEffect, useState }  from "react";
import ReceiptIcon                     from "@material-ui/icons/Receipt";
import URL                             from "../info/Url";
import { useParams, Link, useHistory } from "react-router-dom";
import { useUserContext }              from "../context/User";
import Validation                      from "../tool/Validation";

function CreateBoard() {
    // History
    const history        = useHistory();

    // Parameter
    const { categoryId } = useParams();

    // context
    const { user }       = useUserContext();

    // state
    // Csrf token
    const [csrfToken, setCsrfToken]                             = useState("");
    // Input item
    const [inputBoardName, setInputBoardName]                   = useState("");
    const [inputBoardExplanation, setInputBoardExplanation]     = useState("");
    // information
    const [categoryInformation, setCategoryInformation]         = useState([]);
    // error message
    const [existsMessage, setExistsMessage]                     = useState("");
    const [boardNameMessage, setBoardNameMessage]               = useState("");
    const [boardExplanationMessage, setBoardExplanationMessage] = useState("");

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

    // Set category information
    useEffect(() => {
        axios[URL.fetchCategoryInformation.method](URL.fetchCategoryInformation.url, {
            params: {
                category_id: categoryId
            }
        })
        .then((res) => {
            if(res.data.success) {
                setCategoryInformation(res.data.data.category_information);
            } else {
                setExistsMessage("存在しないカテゴリーです。")
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }, [categoryId, existsMessage])

    // Create the new Board
    const createBoard = () => {
        // Exit if validation check result is False
        if(!validationCheck()) return;

        axios[URL.createBoard.method](URL.createBoard.url, {
            category_id      : categoryInformation.category_id,
            board_name       : inputBoardName,
            board_explanation: inputBoardExplanation,
            account_id       : user.account_id,
            csrf_token       : csrfToken
        })
        .then((res) => {
            if(res.data.success) {
                history.push(`/boardList/${categoryInformation.category_id}`);
            } else {
                setBoardNameMessage(res.data.message)
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const validationCheck = () => {
        const boardNameCheckResult        = boardNameValidation();
        const boardExplanationCheckResult = boardExplanationValidation();

        // Return True if each Input element is True
        return boardNameCheckResult && boardExplanationCheckResult;
    }

    const boardNameValidation = () => {
        if(!Validation.checkNotEmpty(inputBoardName, setBoardNameMessage)) return false;
        if(!Validation.checkSpecifiedNumberOfCharacters(inputBoardName, 1, 100, setBoardNameMessage)) return false;

        // Return True if all validation check results are True
        return true;
    }

    const boardExplanationValidation = () => {
        if(!Validation.checkNotEmpty(inputBoardExplanation, setBoardExplanationMessage)) return false;

        // Return True if all validation check results are True
        return true;
    }

    return(
        <div className="create-board">
            <div className="wrapper">
                <div className="title-content">
                    <PageTitle Icon={ ReceiptIcon } title="掲示板作成" />
                </div>

                {existsMessage !== "" ? (
                    <>
                        {/* Content on Error */}
                        <div>
                            <p>{ existsMessage }</p>
                            <p><Link to="/categoryList">カテゴリー一覧に戻る</Link></p>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="back-link-content">
                            <BackLink
                                path={ `/boardList/${categoryInformation.category_id}` }
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
                                title="カテゴリー名"
                                name={ categoryInformation.category_name }
                            />
                        </div>

                        <div className="form-content">

                            <div className="name-content">
                                <div className="form-item-title">掲示板名</div>

                                <InputPlusButton
                                    value={ inputBoardName }
                                    changeFunction={ setInputBoardName }
                                    buttonFunction={ createBoard }
                                    Icon={ BorderColorIcon }
                                />

                                {boardNameMessage !== "" &&
                                    <div className="error-content">
                                        <ErrorMessage text={ boardNameMessage } />
                                    </div>
                                }
                            </div>

                            <div className="explanation-content">
                                <div className="form-item-title">説明</div>
                                <ExplanationForm
                                    value={ inputBoardExplanation }
                                    changeFunction={ setInputBoardExplanation }
                                />

                                {boardExplanationMessage !== "" &&
                                    <div className="error-content">
                                        <ErrorMessage text={ boardExplanationMessage } />
                                    </div>
                                }
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default CreateBoard;
