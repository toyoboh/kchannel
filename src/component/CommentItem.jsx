import React from "react";
import "../css/CommentItem.css";

function CommentItem({ createdAt, comment, createdUserName }) {
    return(
        <div className="comment-item">
            <div className="comment-header">
                { createdAt }
            </div>

            <div className="comment-body">
                { comment }
            </div>

            <div className="comment-footer">
                投稿者：{ createdUserName }
            </div>
        </div>
    )
}

export default CommentItem;
