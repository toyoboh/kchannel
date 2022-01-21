import "../css/CommentItem.css";
import { Link } from "react-router-dom";
import React from "react";

function CommentItem({ createdAt, comment, createdUserName, createdUserId }) {
    return(
        <div className="comment-item">
            <div className="comment-header">
                { createdAt }
            </div>

            <div className="comment-body">
                { comment }
            </div>

            <div className="comment-footer">
                <Link
                    to={ `/profile/${createdUserId}` }
                    className="link"
                >投稿者：{ createdUserName }</Link>
            </div>
        </div>
    )
}

export default CommentItem;
