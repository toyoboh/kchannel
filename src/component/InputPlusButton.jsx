import React from "react";
import "../css/InputPlusButton.css";

function InputPlusButton({ value, changeFunction, buttonFunction, Icon }) {
    return(
        <div className="input-plus-button">
            <input
                className="input"
                type="text"
                defaultValue={ value }
                onChange={ (e) => changeFunction(e.target.value) }
            />

            <button
                className="button"
                onClick={ buttonFunction }
            >
                <Icon />
            </button>
        </div>
    )
}

export default InputPlusButton;
