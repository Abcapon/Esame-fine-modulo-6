import React, { useEffect, useState, useCallback } from "react";
import { Button, Container, Form } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./styles.css";
import { Link } from "react-router-dom";
import useSession from "../../components/hooks/useSession";
import { useNavigate } from "react-router-dom";

const NewBlogPost = (props) => {
	const navigate = useNavigate();
	const decodedSession = useSession();
	const userId = decodedSession.id;

	const [formData, setFormData] = useState({
		title: "",
		category: "",
		content: "",
	});

	const [cover, setCover] = useState(null);

	const handleFileChange = (e) => {
		setCover(e.target.files[0]);
	};

	const handleUpload = async (e) => {
		e.preventDefault();
		const fileData = new FormData();
		fileData.append("cover", cover);
		fileData.append("title", formData.title);
		fileData.append("category", formData.category);
		fileData.append("content", formData.content);
		fileData.append("author", userId);
		console.log(fileData);

		try {
			const response = await fetch(
				`${process.env.REACT_APP_SERVER_BASE_URL}/posts`,
				{
					method: "POST",
					body: fileData,
				}
			);

			if (response.ok) {
				const newPost = await response.json();
				navigate(`/home`);
				console.log("Post creato con successo:", newPost);
			} else {
				console.error("Errore durante il caricamento del post");
			}
		} catch (error) {
			console.log("Errore durante il caricamento del file:", error);
		}
	};

	const handleChange = useCallback(
		(value) => {
			setFormData({ ...formData, content: value });
		},
		[formData]
	);

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	return (
		<Container className="new-blog-container">
			<Form onSubmit={handleUpload} className="mt-5">
				<Form.Group controlId="blog-form" className="mt-3">
					<Form.Label>Titolo</Form.Label>
					<Form.Control
						type="text"
						name="title"
						value={formData.title}
						onChange={handleInputChange}
						size="lg"
						placeholder="Title"
					/>
				</Form.Group>
				<Form.Group controlId="blog-category" className="mt-3">
					<Form.Label>Categoria</Form.Label>
					<Form.Control
						as="select"
						size="lg"
						name="category"
						value={formData.category}
						onChange={handleInputChange}
					>
						<option>Romanzo</option>
						<option>Thriller</option>
						<option>Horror</option>
						<option>Drammatico</option>
						<option>Musical</option>
					</Form.Control>
				</Form.Group>
				<Form.Group controlId="blog-content" className="mt-3">
					<Form.Label>Contenuto Blog</Form.Label>
					<ReactQuill
						value={formData.content}
						onChange={handleChange}
						className="new-blog-content"
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

export default NewBlogPost;
