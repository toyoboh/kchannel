import "../css/CreateBoard.css";
import AddCircleOutlineOutlinedIcon    from "@material-ui/icons/AddCircleOutlineOutlined";
import axios                           from "axios";
import BackLink                        from "../component/BackLink";
import CreatePageParentName            from "../component/CreatePageParentName";
import CreateRule                      from "../component/CreateRule";
import ErrorMessage                    from "../component/ErrorMessage";
import PageTitle                       from "../component/PageTitle";
import React, { useEffect, useState }  from "react";
import ReceiptIcon                     from "@material-ui/icons/Receipt";
import UIButton                        from "../component/ui/UIButton";
import UIInput                         from "../component/ui/UIInput";
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
    const [csrfToken, setCsrfToken]                     = useState("");
    // Input item
    const [inputBoardName, setInputBoardName]           = useState("");
    // information
    const [categoryInformation, setCategoryInformation] = useState([]);
    // error message
    const [existsMessage, setExistsMessage]             = useState("");
    const [boardNameMessage, setBoardNameMessage]       = useState("");

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
                setExistsMessage("???????????????????????????????????????")
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
            category_id : categoryInformation.category_id,
            board_name  : inputBoardName,
            account_id  : user.account_id,
            csrf_token  : csrfToken
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

        // Return True if each Input element is True
        return boardNameCheckResult;
    }

    const boardNameValidation = () => {
        if(!Validation.checkNotEmpty(inputBoardName, setBoardNameMessage)) return false;
        if(!Validation.checkSpecifiedNumberOfCharacters(inputBoardName, 1, 100, setBoardNameMessage)) return false;

        // Return True if all validation check results are True
        return true;
    }

    return(
        <div className="create-board">
            <div className="wrapper">
                <div className="title-content">
                    <PageTitle Icon={ ReceiptIcon } title="???????????????" />
                </div>

                {existsMessage !== "" ? (
                    <>
                        {/* Content on Error */}
                        <div>
                            <p>{ existsMessage }</p>
                            <p><Link to="/categoryList">??????????????????????????????</Link></p>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="back-link-content">
                            <BackLink
                                path={ `/boardList/${categoryInformation.category_id}` }
                                title="??????"
                            />
                        </div>

                        <div className="rule-content">
                            <CreateRule
                                title="??????"
                                body="??????????????????????????????????????????????????????????????????????????????????????????????????????"
                            />
                        </div>

                        <div className="parent-name-content">
                            <CreatePageParentName
                                title="??????????????????"
                                name={ categoryInformation.category_name }
                            />
                        </div>

                        <div className="form-content">

                            <div className="name-content">
                                <div className="form-item-title">????????????</div>

                                <div className="input-content">
                                    <UIInput
                                        defaultValue={ inputBoardName }
                                        onChange={ (e) => setInputBoardName(e.target.value) }
                                        placeholder="????????????"
                                    />
                                </div>

                                {boardNameMessage !== "" &&
                                    <div className="error-content">
                                        <ErrorMessage text={ boardNameMessage } />
                                    </div>
                                }
                            </div>

                            <div className="button-content">
                                <UIButton
                                    colorkind="green"
                                    onClick={ createBoard }
                                ><AddCircleOutlineOutlinedIcon />??????
                                </UIButton>
                            </div>

                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default CreateBoard;
