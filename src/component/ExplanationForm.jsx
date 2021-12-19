import React from "react";
import "../css/ExplanationForm.css";

function ExplanationForm({ value, changeFunction }) {
    return(
        <textarea
            className="explanation-form"
            defaultValue={ value }
            onChange={ (e) => changeFunction(e.target.value) }
        >
        </textarea>
    )
}

export default ExplanationForm;
