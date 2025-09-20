import React, { createContext, useState, useEffect } from "react";
import userRepository from "../repository/userRepository.js";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    // Load user/token from localStorage on refresh
    useEffect(() => {
        console.log("AuthProvider useEffect running...");

        const savedToken = localStorage.getItem("token");
        console.log("Saved token from localStorage:", savedToken);

        if (savedToken) {
            try {
                const decoded = jwtDecode(savedToken);
                console.log("Decoded token payload:", decoded);

                if (decoded.exp * 1000 > Date.now()) {
                    console.log("✅ Token is valid, setting user");
                    setToken(savedToken);
                    setUser({ username: decoded.sub, roles: decoded.roles });
                } else {
                    console.warn("⚠️ Token expired, removing from storage");
                    localStorage.removeItem("token");
                }
            } catch (err) {
                console.error("❌ Invalid token", err);
                localStorage.removeItem("token");
            }
        } else {
            console.log("No token found in localStorage");
        }
    }, []);

    const login = async (username, password) => {
        try {
            const response = await userRepository.login({ username, password });
            console.log("Full backend response:", response.data);

            const jwt = response.data.token;
            console.log("Raw JWT:", jwt);

            const decoded = jwtDecode(jwt);
            console.log("Decoded token payload:", decoded);

            setToken(jwt);
            setUser({ username: decoded.sub, roles: decoded.roles });

            localStorage.setItem("token", jwt);
            return true;
        } catch (err) {
            console.error("Login failed", err);
            return false;
        }
    };



    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
    };

    const register = async (data) => {
        try {
            const response = await userRepository.register(data);
            return response.data;
        } catch (err) {
            console.error("Registration failed", err);
            throw err;
        }
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};
