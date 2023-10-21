import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
	return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(
		!!localStorage.getItem("loggedInUser")
	);

	return (
		<AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
			{children}
		</AuthContext.Provider>
	);
};
