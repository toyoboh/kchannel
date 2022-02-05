import React from "react";
import "../css/ErrorMessage.css";

function ErrorMessage({ text }) {
    return(
        <div className="error-message">
            { text }
        </div>
    )
}

export default ErrorMessage;
