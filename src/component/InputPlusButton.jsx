import React from "react";
import "../css/InputPlusButton.css";

function InputPlusButton({ Icon }) {
    return(
        <div className="input-plus-button">
            <input className="input" type="text" />
            <button className="button"><Icon /></button>
        </div>
    )
}

export default InputPlusButton;
