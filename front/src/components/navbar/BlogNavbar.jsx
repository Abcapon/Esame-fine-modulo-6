import React from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./styles.css";
import { useAuth } from "../context/AuthContext";

const NavBar = (props) => {
	const { isAuthenticated, setIsAuthenticated } = useAuth();

	const logout = async () => {
		localStorage.clear();
		setIsAuthenticated(false);

		try {
			await fetch("/logout", {
				credentials: "include",
			});

			window.location.href = "http://localhost:3000";
		} catch (error) {
			console.error("Errore durante il logout:", error);
		}
	};

	return (
		<Navbar expand="lg" className="blog-navbar" fixed="top">
			<Container className="justify-content-between">
				<Navbar.Brand as={Link} to="/">
					<img className="blog-navbar-brand" alt="logo" src={logo} />
				</Navbar.Brand>
				<div className="d-flex">
					<Button
						as={Link}
						to="/new"
						className="blog-navbar-add-button bg-dark"
						size="lg"
					>
						<>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								className="bi bi-plus-lg"
								viewBox="0 0 16 16"
							>
								<path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
							</svg>
							Nuovo Articolo
						</>
					</Button>
					{isAuthenticated && <Button onClick={logout}>Log Out</Button>}
				</div>
			</Container>
		</Navbar>
	);
};

export default NavBar;
