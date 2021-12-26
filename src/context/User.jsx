import React, { useState, createContext, useContext } from "react";

const userContext = createContext();

export const useUserContext = () => {
    return useContext(userContext);
}

export const UserProvider = ({ children }) => {
    const initialUserData = {
        user_id  : "",
        user_name: "",
        is_auth  : false
    }

    const [user, setUser] = useState(initialUserData);

    const value = {
        user,
        setUser
    }

    return(
        <userContext.Provider value={ value }>
            { children }
        </userContext.Provider>
    )
}
