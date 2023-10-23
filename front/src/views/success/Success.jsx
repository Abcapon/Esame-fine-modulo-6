import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../components/context/AuthContext";
import "./style.css";
import Spinner from "react-bootstrap/Spinner";

const Success = () => {
	const { token } = useParams();
	const navigate = useNavigate();
	const { setIsAuthenticated } = useAuth();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (token) {
			localStorage.setItem("loggedInUser", JSON.stringify(token));
			setIsAuthenticated(true);

			setTimeout(() => {
				setIsLoading(false);
				navigate(`/home`);
			}, 3000);
		}
	}, [token, setIsAuthenticated, navigate]);

	return (
		<div className="myDiv text-center display-4">
			{isLoading ? (
				<div>
					<Spinner animation="border" variant="primary" />
					<p>
						Successfully logged in <br />
						Redirecting to the chosen page.
					</p>
				</div>
			) : null}
		</div>
	);
};

export default Success;
