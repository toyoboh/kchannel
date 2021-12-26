import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useUserContext } from "../../context/User";

function PrivateRoute({ ...props }) {
    const { user, setUser } = useUserContext();
    
    if(user.is_auth) {
        return(
            <Route { ...props } />
        )
    } else {
        return(
            <Redirect to="/login" />
        )
    }
}

export default PrivateRoute;
