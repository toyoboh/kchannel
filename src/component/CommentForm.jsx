import React from "react";
import "../css/CommentForm.css";

function CommentForm({ value, changeFunction, clickFunction }) {
    return(
        <div className="comment-form">
            <textarea
                className="comment-textarea"
                defaultValue={ value }
                onChange={ (e) => changeFunction(e.target.value) }
            ></textarea>

            <button
                className="button"
                onClick={ clickFunction }
            >投稿</button>
        </div>
    )
}

export default CommentForm;
