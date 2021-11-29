import React, { useState } from "react";
import "../css/CreateBoard.css";
import ReceiptIcon from "@material-ui/icons/Receipt";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import PageTitle from "../component/PageTitle";
import InputPlusButton from "../component/InputPlusButton";
import ErrorMessage from "../component/ErrorMessage";
import CreateRule from "../component/CreateRule";

function CreateBoard() {
    const [message, setMessage] = useState("すでに同一名のboardが存在しています。");

    return(
        <div className="create-board">
            <div className="title-content">
                <PageTitle Icon={ ReceiptIcon } title="Create Board" />
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

export default CreateBoard;
