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
            <div className="wrapper">
                <ul className="items">
                    <li className="item">
                        <Link className="link" to="/categoryList">
                            <span><DvrIcon /></span>
                        </Link>
                    </li>
                    <li className="item">
                        <Link className="link" to="/home">
                            Kちゃんねる
                        </Link>
                    </li>
                    <li className="item">
                        <Link className="link" to={ "/profile/" + user.user_id }>
                            <PersonOutlineIcon />
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Header;
