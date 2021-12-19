import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import "../css/CreateBoard.css";
import axios from "axios";
import ReceiptIcon from "@material-ui/icons/Receipt";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import PageTitle from "../component/PageTitle";
import InputPlusButton from "../component/InputPlusButton";
import ExplanationForm from "../component/ExplanationForm";
import ErrorMessage from "../component/ErrorMessage";
import CreateRule from "../component/CreateRule";
import BackLink from "../component/BackLink";
import CreatePageParentName from "../component/CreatePageParentName";
import { useUserContext } from "../context/User";
import Validation from "../tool/Validation";
// import { TrendingUpRounded } from "@material-ui/icons";

function CreateBoard() {
    // History
    const history        = useHistory();

    // Parameter
    const { categoryId } = useParams();

    // context
    const { user } = useUserContext();

    // Input item
    const [inputBoardName, setInputBoardName]     = useState("");
    const [inputBoardExplanation, setInputBoardExplanation] = useState("");

    const [categoryInfo, setCategoryInfo]    = useState([]);

    // Display message
    // Error message if the board not exists
    const [existsMessage, setExistsMessage]  = useState("");
    // Error message when board creation fails
    const [boardNameMessage, setBoardNameMessage] = useState("");
    const [boardExplanationMessage, setBoardExplanationMessage] = useState("");

    //Csrf token
    const [csrfToken, setCsrfToken]          = useState("");

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

    // Set category information
    useEffect(() => {
        const url = `http://localhost:3000/GitHub/self/kchannel/backend/Api//checkCategoryExists.php?category_id=${ categoryId }`;
        axios.get(url)
        .then((res) => {
            if(res.data.data.category_exists) {
                setCategoryInfo(res.data.data.category_info);
            } else {
                setExistsMessage(res.data.message)
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }, [categoryId, existsMessage])

    // Create the new Board
    const createBoard = () => {
        // validation check
        if(!validationCheck()) return;
        console.log("test");

        const createUrl = "http://localhost:3000/GitHub/self/kchannel/backend/Api/createBoard.php";
        axios.post(
            createUrl,
            {
                category_id      : categoryInfo.category_id,
                board_name       : inputBoardName,
                board_explanation: inputBoardExplanation,
                user_id          : user.user_id,
                csrf_token       : csrfToken,
                withCredentials  : true
            }
        )
        .then((res) => {
            if(res.data.success) {
                history.push(`/boardList/${categoryInfo.category_id}`);
            } else {
                setBoardNameMessage(res.data.message)
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const validationCheck = () => {
        const boardNameCheckResult        = boardNameValidationCheck();
        const boardExplanationCheckResult = boardExplanationValidationCheck();

        return boardNameCheckResult && boardExplanationCheckResult;
    }

    const boardNameValidationCheck = () => {
        if(!Validation.checkNotEmpty(inputBoardName, setBoardNameMessage)) return false;
        return true;
    }

    const boardExplanationValidationCheck = () => {
        if(!Validation.checkNotEmpty(inputBoardExplanation, setBoardExplanationMessage)) return false;
        return true;
    }

    return(
        <div className="create-board">

            <div className="title-content">
                <PageTitle Icon={ ReceiptIcon } title="Create Board" />
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
                            path={ `/boardList/${categoryInfo.category_id}` }
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
                            name={ categoryInfo.category_name }
                        />
                    </div>

                    <div className="form-content">

                        <div className="name-content">
                            <div className="form-item-title">New Board Name</div>
                            <InputPlusButton
                                value={ inputBoardName }
                                changeFunction={ setInputBoardName }
                                buttonFunction={ createBoard }
                                Icon={ BorderColorIcon }
                            />
                        </div>

                        {boardNameMessage !== "" &&
                            <div className="error-content">
                                <ErrorMessage text={ boardNameMessage } />
                            </div>
                        }

                        
                        <div className="explanation-content">
                            <div className="form-item-title">Board Explanation</div>
                            <ExplanationForm
                                value={ inputBoardExplanation }
                                changeFunction={ setInputBoardExplanation }
                                />
                        </div>

                        {boardExplanationMessage !== "" &&
                            <div className="error-content">
                                <ErrorMessage text={ boardExplanationMessage } />
                            </div>
                        }
                    </div>
                </>
            )}

        </div>
    )
}

export default CreateBoard;
