import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import "../css/BreadcrumbNavigation.css";
import axios from "axios";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

function BreadcrumbNavigation() {
    const location = useLocation();

    const [breadcrumb, setBreadcrumb] = useState([]);

    const createBreadcrumb = async (pagename, id = false) => {
        let url = `http://localhost:3000/GitHub/self/kchannel/backend/Api/breadcrumbInformation.php?pagename=${pagename}`;
        // Add parameter only when there is an id of the argument
        if(id) url += `&id=${id}`;

        axios.get(url)
        .then((res) => {
            const data = res.data.data;
            setBreadcrumb(data);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        // Split URL
        const urlSplitArr = location.pathname.split("/");
        // Get the page name and id of the parameter from the URL
        const urlName     = urlSplitArr[1];
        const urlId       = urlSplitArr[2];

        createBreadcrumb(urlName, urlId);
    }, [location])

    const linkList = ["/boardList/", "/threadList/", "/commentList/"];
    const breadcrumbCount = breadcrumb.length;
    let breadcrumbContent;
    if(breadcrumb.length) {
        breadcrumbContent = breadcrumb.map((value, index) => {
            return(
                <React.Fragment key={ index }>
                    {/* Only when at the first of the loop */}
                    {!index &&
                        <li className="list-item list-item-text">
                            <Link to="/categoryList">category</Link>
                        </li>
                    }

                    <li className="list-item list-item-icon">
                        <ArrowRightIcon />
                    </li>

                    {/* Use Link tags except at the end of the loop */}
                    {breadcrumbCount - 1 === index ? (
                        <li className="list-item list-item-text">
                            { value.name }
                        </li>
                    ) : (
                        <li className="list-item list-item-text">
                            <Link to={ linkList[index] + value.id }>
                                { value.name }
                            </Link>
                        </li>
                    )}
                </React.Fragment>
            )
        })
    }

    return(
        <ul className="breadcrumb-navigation">
            { breadcrumbContent }
        </ul>
    )
}

export default BreadcrumbNavigation;
