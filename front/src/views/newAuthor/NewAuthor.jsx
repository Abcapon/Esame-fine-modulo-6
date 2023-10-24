import React, { useEffect, useState, useCallback } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const NewAuthor = () => {
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		nome: "",
		cognome: "",
		email: "",
		bornDate: "",
		password: "",
	});

	const [avatar, setAvatar] = useState(null);

	const handleFileChange = (e) => {
		setAvatar(e.target.files[0]);
	};

	const handleUpload = async (e) => {
		e.preventDefault();
		const fileData = new FormData();
		fileData.append("avatar", avatar);
		fileData.append("nome", formData.nome);
		fileData.append("cognome", formData.cognome);
		fileData.append("email", formData.email);
		fileData.append("bornDate", formData.bornDate);
		fileData.append("password", formData.password);

		try {
			const response = await fetch(
				`${process.env.REACT_APP_SERVER_BASE_URL}/authors`,
				{
					method: "POST",
					body: fileData,
				}
			);

			if (response.ok) {
				const newAuthor = await response.json();
				navigate(`/home`);
				console.log("Autore creato con successo:", newAuthor);
			} else {
				console.error("Errore durante il caricamento dell'autore");
			}
		} catch (error) {
			console.log("Errore durante il caricamento del file:", error);
		}
	};

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	return (
		<Container className="new-blog-container">
			<Form onSubmit={handleUpload} className="mt-5">
				<Form.Group controlId="blog-form" className="mt-3">
					<Form.Label>Nome</Form.Label>
					<Form.Control
						type="text"
						name="nome"
						value={formData.nome}
						onChange={handleInputChange}
						size="lg"
						placeholder="Nome"
					/>
				</Form.Group>
				<Form.Group controlId="blog-form" className="mt-3">
					<Form.Label>Cognome</Form.Label>
					<Form.Control
						type="text"
						name="cognome"
						value={formData.cognome}
						onChange={handleInputChange}
						size="lg"
						placeholder="Cognome"
					/>
				</Form.Group>
				<Form.Group controlId="blog-form" className="mt-3">
					<Form.Label>Cognome</Form.Label>
					<Form.Control
						type="date"
						name="bornDate"
						value={formData.bornDate}
						onChange={handleInputChange}
						size="lg"
						placeholder="Data di nascita"
					/>
				</Form.Group>
				<Form.Group controlId="blog-form" className="mt-3">
					<Form.Label>Email</Form.Label>
					<Form.Control
						type="text"
						name="email"
						value={formData.email}
						onChange={handleInputChange}
						size="lg"
						placeholder="Email"
					/>
				</Form.Group>
				<Form.Group controlId="blog-form" className="mt-3">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="text"
						name="password"
						value={formData.password}
						onChange={handleInputChange}
						size="lg"
						placeholder="Password"
					/>
				</Form.Group>
				<Form.Group className="position-relative mb-3">
					<Form.Label>File</Form.Label>
					<Form.Control
						type="file"
						required
						name="file"
						onChange={handleFileChange}
					/>
				</Form.Group>
				<Form.Group className="d-flex mt-3 gap-3 justify-content-end">
					<Button type="reset" size="lg" variant="outline-danger">
						Reset
					</Button>
					<Button type="submit" size="lg" variant="success">
						Invia
					</Button>
					<Link to="/home">
						<Button size="lg">Chiudi</Button>
					</Link>
				</Form.Group>
			</Form>
		</Container>
	);
};

export default NewAuthor;
