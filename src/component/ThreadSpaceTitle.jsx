import React from "react";
import "../css/ThreadSpaceTitle.css";

function ThreadSpaceTitle({ title }) {
    return(
        <h2 className="thread-space-title">
            { title }
        </h2>
    )
}

export default ThreadSpaceTitle;
