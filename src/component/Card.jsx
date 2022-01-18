import React from "react";
import "../css/Card.css";
import { Link } from "react-router-dom";
import DescriptionIcon from "@material-ui/icons/Description";

/**
 * @param {string} title           カードのタイトル
 * @param {num}    count           カードに紐づいている件数
 * @param {string} createdAt       カードの登録日
 * @param {string} createdUserName カードを登録したユーザ名
 */
function Card({ title, count, createdAt, createdUserName, path }) {
    return(
        <div className="card">
            <Link to={ path }>
                <div className="card-header">
                    <div className="header-created-at">
                        { createdAt }
                    </div>
                </div>

                <div className="card-body">
                    <div className="body-title">
                        { title }
                    </div>
                    <div className="body-count">
                        <DescriptionIcon />
                        { String(count) }
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default Card;
