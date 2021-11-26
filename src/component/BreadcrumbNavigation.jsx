import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
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
        // Get the page name from the URL
        const urlName     = urlSplitArr[1];

        // Define URL parameter empty string
        let urlParameter = "";
        // if ther is a second property of the array, assign it to the urlParameter
        if(urlSplitArr[2]) {
            urlParameter = urlSplitArr[2];
        }

        // Page array for IF syntax
        const pageArr = ["boardList", "threadList", "commentList"];

        // Create and set breadcrumb content 
        if(urlName === "categoryList") {
            setBreadcrumb([]);
        } else if(pageArr.indexOf(urlName) !== -1) {
            createBreadcrumb(urlName, urlParameter);
        }
    }, [location])

    // let breadcrumbContent;
    // if(!breadcrumb.length) {
    //     breadcrumbContent = <li key="1">category</li>;
    // } else {
    //     breadcrumbContent = breadcrumb.map(function(b) {
    //         return <li key={b.name}>{b.name}</li>
    //     })
    // }

    return(
        <ul className="breadcrumb-navigation">
            
        </ul>
    )
}

export default BreadcrumbNavigation;
