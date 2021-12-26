import React from "react";
import { Link } from "react-router-dom";
import "../css/Header.css";
import SearchIcon from "@material-ui/icons/Search";
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
                            <SearchIcon />
                        </li>
                    </Link>
                    <Link className="header-item" to="">
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
