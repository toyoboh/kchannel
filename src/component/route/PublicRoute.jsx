import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useUserContext } from "../../context/User";

function PublicRoute(props) {
    const { user } = useUserContext();

    if(user.is_auth) {
        return <Redirect to="/home" />
    } else {
        return <Route { ...props } />
    }
}

export default PublicRoute;
