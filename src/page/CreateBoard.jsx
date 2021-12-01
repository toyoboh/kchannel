import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/CreateBoard.css";
import axios from "axios";
import ReceiptIcon from "@material-ui/icons/Receipt";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import PageTitle from "../component/PageTitle";
import InputPlusButton from "../component/InputPlusButton";
import ErrorMessage from "../component/ErrorMessage";
import CreateRule from "../component/CreateRule";

function CreateBoard() {
    const { categoryId } = useParams();

    const [categoryInfo, setCategoryInfo] = useState([]);
    const [message, setMessage] = useState("すでに同一名のboardが存在しています。");
    const [existsMessage, setExistsMessage] = useState("");

    useEffect(() => {
        const url = `http://localhost:3000/GitHub/self/kchannel/backend/Api//checkCategoryExists.php?category_id=${ categoryId }`;
        axios.get(url)
        .then((res) => {
            const resData = res.data;
            if(resData.data.category_exists) {
                setCategoryInfo(resData.data.category_info);
            } else {
                setExistsMessage(resData.message)
            }
            console.log(existsMessage);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [categoryId, existsMessage])

    return(
        <div className="create-board">
            {existsMessage !== "" ? (
                <>
                    <div>{ existsMessage }</div>
                </>
            ) : (
                <>
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
                        <div className="title">Board Name</div>

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
                </>
            )}

        </div>
    )
}

export default CreateBoard;
