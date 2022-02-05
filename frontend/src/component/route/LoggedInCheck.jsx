import App                            from "../../App";
import axios                          from "axios";
import React, { useEffect, useState } from "react";
import URL                            from "../../info/Url";
import { useUserContext }             from "../../context/User";

function LoggedInCheck() {
    // context
    const { setUser } = useUserContext();

    // state
    const [isLoading, setIsLoading] = useState(true);

    // check if you are logged in
    useEffect(() => {
        axios[URL.loggedInCheck.method](URL.loggedInCheck.url)
        .then((res) => {
            if(res.data.success) {
                setUser({
                    account_id: res.data.data.account_id,
                    user_id   : res.data.data.user_id,
                    user_name : res.data.data.user_name, 
                    authority : res.data.data.authority,
                    is_auth   : true
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
