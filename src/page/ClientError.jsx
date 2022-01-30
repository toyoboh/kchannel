import React from "react";
import "../css/ClientError.css";

function ClientError({ errorCode }) {
    const messages = {
        code401: "権限不足のため表示することができません。",
        code404: "お探しのページは存在しませんでした。"
    }

    return(
        <div className="client-error">
            <div className="error-content">
                <div className="error-number">{ errorCode }</div>
                <p className="error-title">{ messages[`code${errorCode}`] }</p>
            </div>
        </div>
    )
}

export default ClientError;
