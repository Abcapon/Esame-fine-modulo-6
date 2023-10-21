import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../components/context/AuthContext"; // Importa il contesto di autenticazione
import "./style.css";

const Success = () => {
	const { token } = useParams();
	const navigate = useNavigate();
	const { setIsAuthenticated } = useAuth(); // Ottieni setIsAuthenticated dal contesto

	useEffect(() => {
		if (token) {
			localStorage.setItem("loggedInUser", JSON.stringify(token));

			// Imposta il valore di isAuthenticated nel contesto
			setIsAuthenticated(true);

			setTimeout(() => {
				navigate(`/home`);
			}, 3000);
		}
	}, [token]);

	return (
		<div className="myDiv">
			<p>Successfully logged in</p>
		</div>
	);
};

export default Success;
