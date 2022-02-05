import React from "react";
import "../css/PageTitle.css";

function PageTitle({ Icon, title }) {
    return(
        <h2 className="page-title">
            <Icon />
            { title }
        </h2>
    )
}

export default PageTitle;
