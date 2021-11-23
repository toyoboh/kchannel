import React from "react";
import "../css/CommentListTitle.css";

function CommentListTitle({ title }) {
    return(
        <h2 className="thread-space-title">
            { title }
        </h2>
    )
}

export default CommentListTitle;
