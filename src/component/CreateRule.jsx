import React from "react";
import "../css/CreateRule.css";

function CreateRule({ title, body }) {
    return(
        <div className="create-rule">
            <div className="rule-title">
                { title }
            </div>

            <div className="rule-body">
                { body }
            </div>
        </div>
    )
}

export default CreateRule;
