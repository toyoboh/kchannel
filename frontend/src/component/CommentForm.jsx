import React from "react";
import "../css/CommentForm.css";
import UIButton from "./ui/UIButton";

function CommentForm({ refItem, value, changeFunction, clickFunction }) {
    return(
        <div className="comment-form">
            <textarea
                ref={ refItem }
                className="comment-textarea"
                defaultValue={ value }
                onChange={ (e) => changeFunction(e.target.value) }
            ></textarea>

            <UIButton
                className="button"
                colorkind="blue"
                onClick={ clickFunction }
            >投稿</UIButton>
        </div>
    )
}

export default CommentForm;
