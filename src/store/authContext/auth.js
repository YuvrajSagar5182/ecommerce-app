import React, { createContext, useContext, useState, useEffect } from 'react';
import { checkTokenValidity } from '../../utils/FetchData';

const AuthContext = createContext(

);

export const AuthProvider = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        try {
            const tokenValidate = async () => {
                const token = localStorage.getItem('token');
                if (!token) {
                    setIsLoggedIn(false);
                    return;

                }
                const resp = await checkTokenValidity(token)
                if (resp.msg) {
                    // If token exists, consider the user logged in
                    setIsLoggedIn(true);
                    return;
                }

                setIsLoggedIn(false);
            }

            tokenValidate()

        } catch (error) {
            console.log(error.message);

        }

    }, [isLoggedIn]);

    const login = (token, email, id) => {
        localStorage.setItem('token', token);
        localStorage.setItem('email', email);
        localStorage.setItem('id', id)
        setIsLoggedIn(true);
    };
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('id');
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};




