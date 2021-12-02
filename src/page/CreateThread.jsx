import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../css/CreateBoard.css";
import axios from "axios";
import DescriptionIcon from "@material-ui/icons/Description";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import PageTitle from "../component/PageTitle";
import InputPlusButton from "../component/InputPlusButton";
import ErrorMessage from "../component/ErrorMessage";
import CreateRule from "../component/CreateRule";
import BackLink from "../component/BackLink";
import CreatePageParentName from "../component/CreatePageParentName";

function CreateThread() {
    const { boardId } = useParams();

    const [boardInfo, setBoardInfo] = useState([]);
    const [message, setMessage] = useState("すでに同一名のthreadが存在しています。");
    const [existsMessage, setExistsMessage] = useState("");

    useEffect(() => {
        const url = `http://localhost:3000/GitHub/self/kchannel/backend/Api//checkBoardExists.php?board_id=${ boardId }`;
        axios.get(url)
        .then((res) => {
            const resData = res.data;
            if(resData.data.board_exists) {
                setBoardInfo(resData.data.board_info);
            } else {
                setExistsMessage(resData.message)
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }, [boardId])

    return(
        <div className="create-board">
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
                    <div className="title-content">
                        <PageTitle Icon={ DescriptionIcon } title="Create Thread" />
                    </div>

                    <div className="back-link-content">
                        <BackLink
                            path={ `/threadList/${boardInfo.board_id}` }
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
                            name={ boardInfo.board_name }
                        />
                    </div>

                    <div className="form-content">
                        <div className="title">New Thread Name</div>

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

export default CreateThread;
