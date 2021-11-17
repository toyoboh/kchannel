import React from "react";
import "../css/Explanation.css";

function Explanation({ content, createdAt, createdUserName }) {
    return(
        <div className="explanation">
            <div className="explanation-header">
                <div className="header-title">
                    スレッド説明
                </div>
                <div className="header-created-at">
                    { createdAt }
                </div>
            </div>

            <div className="explanation-body">
                { content }
            </div>

            <div className="explanation-footer">
                作成者: { createdUserName }
            </div>
        </div>
    )
}

export default Explanation;
