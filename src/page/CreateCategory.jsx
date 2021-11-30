import React, { useState } from "react";
import "../css/CreateCategory.css";
import CategoryIcon from "@material-ui/icons/Category";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import PageTitle from "../component/PageTitle";
import InputPlusButton from "../component/InputPlusButton";
import ErrorMessage from "../component/ErrorMessage";
import CreateRule from "../component/CreateRule";
import BackLink from "../component/BackLink";

function CreateCategory() {
    const [message, setMessage] = useState("すでに同一名のcategoryが存在しています。");

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
                    <InputPlusButton Icon={ BorderColorIcon } />
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
