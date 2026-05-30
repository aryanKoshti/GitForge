import React, {createContext, useState, useEffect, useContext, Children} from "react";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({Children}) => {
    const [currentUser, setCurentUser] = useState(null);
    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if(userId) {
            setCurentUser(userId);
        }
    }, []);

    const value = {
        currentUser, setCurentUser
    }

    return <AuthContext.Provider value={value}>{Children}</AuthContext.Provider>
} 
