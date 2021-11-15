import React from "react";
import "../css/Header.css";
import { useUserContext } from "../context/User";
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import SearchIcon from "@material-ui/icons/Search";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";

const Header = () => {
    const { setUser } = useUserContext();

    const currentMenuChange = (itemNum) => {
        setUser((prev) => {
            return { ...prev, ...{ current_header_item: itemNum } };
        })
    }
    
    return(
        <div className="header">
            <div className="header-wrapper">
                <ul className="header-item-wrapper">
                    <li className="header-item" onClick={ () => currentMenuChange(0) }>
                        <DesktopWindowsIcon />
                    </li>
                    <li className="header-item" onClick={ () => currentMenuChange(1) }>
                        <SearchIcon />
                    </li>
                    <li className="header-item" onClick={ () => currentMenuChange(2) }>
                        <PersonOutlineIcon />
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Header;
