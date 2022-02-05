import React from "react";
import "../css/CommentListTitle.css";

function CommentListTitle({ title }) {
    return(
        <h2 className="comment-list-title">
            { title }
        </h2>
    )
}

export default CommentListTitle;
