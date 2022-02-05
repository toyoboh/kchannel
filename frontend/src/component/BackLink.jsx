import React from "react";
import { Link } from "react-router-dom";
import "../css/BackLink.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

function BackLink({ path, title }) {
    return(
        <div className="back-link">
            <Link
                className="link"
                to={ path }
            >
                <ArrowBackIcon />
                { title }
            </Link>
        </div>
    )
}

export default BackLink;
