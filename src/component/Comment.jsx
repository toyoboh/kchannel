import React from "react";
import "../css/Comment.css";

function Comment() {
    return(
        <div className="comment">
            <div className="comment-header">
                2021/11/17 21:31:00
            </div>

            <div className="comment-body">
                こんにちは
                さようなら
            </div>

            <div className="comment-footer">
                sho
            </div>
        </div>
    )
}

export default Comment;
