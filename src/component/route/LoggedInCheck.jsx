import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUserContext } from "../../context/User";
import App from "../../App";
import URL from "../../info/Url";

function LoggedInCheck() {
    // context
    const { setUser } = useUserContext();

    // state
    const [isLoading, setIsLoading] = useState(true);

    // check if you are logged in
    useEffect(() => {
        axios[URL.loggedInCheck.method](URL.loggedInCheck.url)
        .then((res) => {
            console.log(res)
            if(res.data.success) {
                setUser({
                    id       : res.data.data.id,
                    user_id  : res.data.data.user_id,
                    user_name: res.data.data.user_name, 
                    is_auth  : true
                });
            }
            setIsLoading(false);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [setUser])

    return (
        <>
            {isLoading ? (
                <div>Now Loading</div>
            ) : (
                <App />
            )}
        </>
    )
}

export default LoggedInCheck;
