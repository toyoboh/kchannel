import React from "react";
import { Link } from "react-router-dom";
import "../css/Header.css";
import DvrIcon from "@material-ui/icons/Dvr";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import { useUserContext } from "../context/User";

const Header = () => {
    const { user } = useUserContext();

    return(
        <div className="header">
            <div className="header-wrapper">
                <ul className="header-item-wrapper">
                    <Link className="header-item" to="/categoryList">
                        <li>
                            <DvrIcon />
                        </li>
                    </Link>
                    <Link className="header-item" to="/home">
                        <li>
                            Kちゃんねる
                        </li>
                    </Link>
                    <Link className="header-item" to={ "/profile/" + user.user_id }>
                        <li>
                            <PersonOutlineIcon />
                        </li>
                    </Link>
                </ul>
            </div>
        </div>
    )
}

export default Header;
