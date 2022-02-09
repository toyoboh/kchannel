import React from "react";
import "../css/Card.css";
import { Link } from "react-router-dom";

/**
 * @param {string} title           カードのタイトル
 * @param {num}    count           カードに紐づいている件数
 * @param {string} createdAt       カードの登録日
 * @param {string} createdUserName カードを登録したユーザ名
 */
function Card({ title, count, createdAt, createdUserName, path, Icon }) {
    return(
        <div className="card">
            <Link className="link" to={ path }>
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
                        <Icon />
                        { String(count) }
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default Card;
