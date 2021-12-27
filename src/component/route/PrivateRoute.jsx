import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useUserContext } from "../../context/User";

function PrivateRoute({ ...props }) {
    const { user } = useUserContext();

    return(
        <>
            {user.is_auth ? (
                <Route { ...props } />
            ) : (
                <Redirect to="/login" />
            )}
        </>
    )
}

export default PrivateRoute;
