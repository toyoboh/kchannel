import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useUserContext } from "../../context/User";

function PublicRoute({ ...props }) {
    // context
    const { user } = useUserContext();

    return(
        <>
            {user.is_auth ? (
                <Redirect to="/" />
            ) : (
                <Route { ...props } />
            )}
        </>
    )
}

export default PublicRoute;
