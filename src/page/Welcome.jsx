import React from "react";
import "../css/Welcome.css";
import UILink from "../component/ui/UILink";

function Welcome() {
    return(
        <div className="welcome">
            <p>Kちゃんねる welcome page</p>
            <p><UILink to="/login" underline="true">login</UILink></p>
        </div>
    )
}

export default Welcome;
