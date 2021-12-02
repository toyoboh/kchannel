import React from "react";
import "../css/CreatePageParentName.css";

function CreatePageParentName({ title, name }) {
    return(
        <div className="create-page-parent-name">
            <div className="title">
                { title }
            </div>
            <div className="name">
                { name }
            </div>
        </div>
    )
}

export default CreatePageParentName;
