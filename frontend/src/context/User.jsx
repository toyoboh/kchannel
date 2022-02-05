import React, { useState, createContext, useContext } from "react";

const userContext = createContext();

export const useUserContext = () => {
    return useContext(userContext);
}

export const UserProvider = ({ children }) => {
    const initialUserData = {
        account_id: 0,     // Because we don't use 0 in the account id
        user_id   : "",
        user_name : "",
        authority : 0,
        is_auth   : false
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
