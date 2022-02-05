import "../css/BreadcrumbNavigation.css";
import ArrowRightIcon                 from "@material-ui/icons/ArrowRight";
import axios                          from "axios";
import React, { useEffect, useState } from "react";
import UILink                         from "./ui/UILink";
import URL                            from "../info/Url";
import { useLocation }                from "react-router-dom";

function BreadcrumbNavigation() {
    const location = useLocation();

    const [breadcrumb, setBreadcrumb] = useState([]);

    const createBreadcrumb = async (pagename, id = false) => {
        axios[URL.breadcrumbInformation.method](URL.breadcrumbInformation.url, {
            params: {
                pagename: pagename,
                id      : id
            }
        })
        .then((res) => {
            setBreadcrumb(res.data.data);
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
                        <UILink
                            underline="true"
                            to="/categoryList"
                            sizekind="small"
                        >category</UILink>
                    </li>
                    }

                    <li className="list-item list-item-icon">
                        <ArrowRightIcon />
                    </li>

                    {/* Use Link tags except at the end of the loop */}
                    {breadcrumbCount - 1 === index ? (
                    <li className="list-item list-item-text last-text">
                        { value.name }
                    </li>
                    ) : (
                    <li className="list-item list-item-text">
                        <UILink
                            underline="true"
                            sizekind="small"
                            to={ linkList[index] + value.id }
                        >{ value.name }
                        </UILink>
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
