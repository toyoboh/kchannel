import React from "react";
import "../css/CreateCategory.css";
import CategoryIcon from "@material-ui/icons/Category";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import PageTitle from "../component/PageTitle";
import InputPlusButton from "../component/InputPlusButton";

function CreateCategory() {
    return(
        <div className="create-category">
            <div className="title-content">
                <PageTitle Icon={ CategoryIcon } title="Create Category" />
            </div>

            <div className="rule-content">
                <div className="rule-title">注意</div>

                <div className="rule-body">
                    登録する際は、一覧画面にて類似したものがないことを確認してください。
                </div>
            </div>

            <div className="form-content">
                <div className="title">Category Name</div>

                <div className="content">
                    <InputPlusButton Icon={ BorderColorIcon } />
                </div>
            </div>
        </div>
    )
}

export default CreateCategory;
