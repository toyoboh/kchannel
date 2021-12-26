import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUserContext } from "../../context/User";
import App from "../../App";

function LoggedInCheck() {
    // context
    const { setUser } = useUserContext();

    // state
    const [isLoading, setIsLoading] = useState(true);

    // check if you are logged in
    useEffect(() => {
        const url = "http://localhost:3000/GitHub/self/kchannel/backend/Api/loggedInCheck.php";
        axios.post(
            url,
            {
                withCredentials: true
            }
        )
        .then((res) => {
            if(res.data.success) {
                setUser({
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
