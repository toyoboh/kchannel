import React from "react";
import "../css/Comment.css";

function Comment({ createdAt, comment, createdUserName }) {
    return(
        <div className="comment">
            <div className="comment-header">
                { createdAt }
            </div>

            <div className="comment-body">
                { comment }
            </div>

            <div className="comment-footer">
                { createdUserName }
            </div>
        </div>
    )
}

export default Comment;
