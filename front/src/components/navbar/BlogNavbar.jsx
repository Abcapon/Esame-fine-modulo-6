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
				<div className="d-flex align-items-end">
					<Navbar.Brand as={Link} to="/">
						<img className="blog-navbar-brand" alt="logo" src={logo} />
					</Navbar.Brand>
					{isAuthenticated && (
						<div className="d-flex">
							<a href="/home" className="navbarLink">
								<p>Home</p>
							</a>
							<a href="/utente" className="navbarLink">
								<p>Utente</p>
							</a>
						</div>
					)}
				</div>
				{isAuthenticated && (
					<div className="d-flex align-items-center gap-3">
						<Button
							as={Link}
							to="/new"
							className="blog-navbar-add-button bg-primary"
						>
							Nuovo Articolo
						</Button>

						<Button
							onClick={logout}
							className="blog-navbar-add-button bg-success"
						>
							Log Out
						</Button>
					</div>
				)}
				{!isAuthenticated && (
					<Button
						as={Link}
						to="/newAuthor"
						className="blog-navbar-add-button bg-primary"
					>
						Registrati
					</Button>
				)}
			</Container>
		</Navbar>
	);
};

export default NavBar;
