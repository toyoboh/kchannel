import React, { useEffect, useState } from "react";
import "../css/CreateCategory.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import CategoryIcon from "@material-ui/icons/Category";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import PageTitle from "../component/PageTitle";
import InputPlusButton from "../component/InputPlusButton";
import ErrorMessage from "../component/ErrorMessage";
import CreateRule from "../component/CreateRule";
import BackLink from "../component/BackLink";
import { useUserContext } from "../context/User";

function CreateCategory() {
    // History
    const history = useHistory();

    // context
    const { user } = useUserContext();

    // Message
    // Error message when category creation fails
    const [message, setMessage]     = useState("");

    // Csrf token
    const [csrfToken, setCsrfToken] = useState("");

    // Input item
    const [inputCategoryName, setInputCategoryName] = useState("");

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

    // Create the new category
    const createCategory = () => {
        const createUrl = "http://localhost:3000/GitHub/self/kchannel/backend/Api/createCategory.php";
        axios.post(
            createUrl,
            {
                category_name  : inputCategoryName,
                user_id        : user.user_id,
                csrf_token     : csrfToken,
                withCredentials: true
            }
        )
        .then((res) => {
            if(res.data.success) {
                history.push("/categoryList");
            } else {
                setMessage(res.data.message);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return(
        <div className="create-category">
            <div className="title-content">
                <PageTitle Icon={ CategoryIcon } title="Create Category" />
            </div>

            <div className="back-link-content">
                <BackLink
                    path="/categoryList"
                    title="戻る"
                />
            </div>

            <div className="rule-content">
                <CreateRule
                    title="注意"
                    body="登録する際は、一覧画面にて類似したものがないことを確認してください。"
                />
            </div>

            <div className="form-content">
                <div className="title">Category Name</div>

                <div className="content">
                    <InputPlusButton
                        value={ inputCategoryName }
                        changeFunction={ setInputCategoryName }
                        buttonFunction={ createCategory }
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

        </div>
    )
}

export default CreateCategory;
