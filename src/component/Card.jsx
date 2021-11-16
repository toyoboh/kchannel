import React from "react";
import "../css/Card.css";

function Card({ title, count, createdAt, createdUserName }) {
    return(
        <div className="card">
            {createdAt && createdUserName &&
                <div className="card-header">
                    <div className="header-created-at">
                        登録日：{ createdAt }
                    </div>
                    <div className="header-created-user-name">
                        登録者：{ createdUserName }
                    </div>
                </div>
            }

            <div className="card-body">
                <div className="body-title">
                    { title }
                </div>
                <div className="body-count">
                    { count }件
                </div>
            </div>
        </div>
    )
}

export default Card;
