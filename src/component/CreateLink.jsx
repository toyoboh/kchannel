import React from "react";
import { Link } from "react-router-dom";
import "../css/CreateLink.css";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

function CreateLink({ path, title }) {
    return(
        <div className="create-link">
            <Link
                className="link"
                to={ path }
            >
                { title }
                <ArrowForwardIcon />
            </Link>
        </div>
    )
}

export default CreateLink;
