import React from "react";
import "../css/NoContent.css";
import UILink from "../component/ui/UILink";

function NoContent({ text }) {
    return(
        <div className="no-content">
            <p className="message">{ text }</p>
            <p className="message">
                <UILink
                    to="/categoryList"
                    sizekind="small"
                    colorkind="blue"
                    underline="true"
                >カテゴリー一覧</UILink>へ戻る
            </p>
        </div>
    )
}

export default NoContent;
