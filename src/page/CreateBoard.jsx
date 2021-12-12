import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import "../css/CreateBoard.css";
import axios from "axios";
import ReceiptIcon from "@material-ui/icons/Receipt";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import PageTitle from "../component/PageTitle";
import InputPlusButton from "../component/InputPlusButton";
import ErrorMessage from "../component/ErrorMessage";
import CreateRule from "../component/CreateRule";
import BackLink from "../component/BackLink";
import CreatePageParentName from "../component/CreatePageParentName";
import { useUserContext } from "../context/User";
// import { TrendingUpRounded } from "@material-ui/icons";

function CreateBoard() {
    // History
    const history        = useHistory();

    // Parameter
    const { categoryId } = useParams();

    // context
    const { user } = useUserContext();

    // Input item
    const [inputBoardName, setInputBoardName] = useState("");

    const [categoryInfo, setCategoryInfo]    = useState([]);

    // Display message
    // Error message if the board not exists
    const [existsMessage, setExistsMessage]  = useState("");
    // Error message when board creation fails
    const [message, setMessage]              = useState("");

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
        const createUrl = "http://localhost:3000/GitHub/self/kchannel/backend/Api/createBoard.php";
        axios.post(
            createUrl,
            {
                category_id    : categoryInfo.category_id,
                board_name     : inputBoardName,
                user_id        : user.user_id,
                csrf_token     : csrfToken,
                withCredentials: true
            }
        )
        .then((res) => {
            if(res.data.success) {
                history.push(`/boardList/${categoryInfo.category_id}`);
            } else {
                setMessage(res.data.message)
            }
        })
        .catch((err) => {
            console.log(err);
        })
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
                        <div className="title">New Board Name</div>

                        <div className="content">
                            <InputPlusButton
                                value={ inputBoardName }
                                changeFunction={ setInputBoardName }
                                buttonFunction={ createBoard }
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

export default CreateBoard;
