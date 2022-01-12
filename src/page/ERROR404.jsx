import React from "react";
import "../css/ERROR404.css";

function ERROR404() {
    return(
        <div className="error404">
            <div className="error-content">
                <div className="error-number">404</div>
                <p className="error-title">お探しのページが見つかりませんでした。</p>
            </div>
        </div>
    )
}

export default ERROR404;
