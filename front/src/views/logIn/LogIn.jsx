import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const LogIn = () => {
	const [logInData, setLogInData] = useState({});
	const [login, setLogin] = useState(null);

	const navigate = useNavigate();

	console.log(login);

	const handleInputChange = (e) => {
		const { name, value } = e.target;

		setLogInData({
			...logInData,
			[name]: value,
		});
	};

	const onSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch(
				`${process.env.REACT_APP_SERVER_BASE_URL}/login`,
				{
					headers: {
						"content-type": "application/json",
					},
					method: `POST`,
					body: JSON.stringify(logInData),
				}
			);
			const data = await response.json();
			if (data.token) {
				localStorage.setItem("loggedInUser", JSON.stringify(data.token));
				navigate("/home");
			}

			setLogin(data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="p-3 d-flex justify-center align-items-center vh-100">
			<form
				onSubmit={onSubmit}
				className="d-flex flex-column gap-2 p-3 bg-dark text-white rounded"
			>
				<h1>Login</h1>
				<input
					className="p-2 text-black rounded"
					type="text"
					name="email"
					placeholder="email"
					onChange={handleInputChange}
					required
				/>
				<input
					className="p-2  text-black rounded"
					type="password"
					name="password"
					placeholder="password"
					onChange={handleInputChange}
					required
				/>
				<button type="submit" className="bg-success p-2 rounded mt-5">
					Login
				</button>
			</form>
		</div>
	);
};

export default LogIn;
