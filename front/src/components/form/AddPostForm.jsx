import React, { useState } from "react";

const AddPostForm = () => {
	const [formData, setFormData] = useState({});
	const [file, setFile] = useState(null);

	const handleFileChange = (e) => {
		setFile(e.target.files[0]);
	};

	const handleUploadFile = async (cover) => {
		const fileData = new FormData();
		fileData.append("cover", cover);

		try {
			// lato backend abbiamo la possibilità di "caricare" il nostro file sia nel localstorage che in cloudinary
			// per utilizzare il local storage, nella chiamata seguente dobbiamo utilizzare l'URL: http://localhost:5050/posts/upload,
			// mentre per utilizzare cloudinary dobbiamo utilizzare la stringa : http://localhost:5050/posts/cloudinary
			const response = await fetch(
				`${process.env.REACT_APP_SERVER_BASE_URL}/posts/cloudinary`,
				{
					method: "POST",
					body: fileData,
				}
			);
			return await response.json();
		} catch (error) {
			console.log("Errore in handleUploadFile:", error);
		}
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const onSubmit = async (e) => {
		e.preventDefault();

		if (file) {
			try {
				const uploadCover = await handleUploadFile(file);
				const finalBody = {
					...formData,
					cover: uploadCover.cover,
				};
				const response = await fetch("http://localhost:5050/posts", {
					headers: {
						"Content-Type": "application/json",
					},
					method: "POST",
					body: JSON.stringify(finalBody),
				});
				return response.json();
			} catch (error) {
				console.error("Errore in onSubmit:", error);
			}
		} else {
			console.error("Per favore seleziona almeno un file!");
		}
	};

	return (
		<form encType="multipart/form-data" onSubmit={onSubmit}>
			<input
				onChange={handleInputChange}
				type="text"
				name="category"
				placeholder="category"
			/>
			<input
				onChange={handleInputChange}
				type="text"
				name="title"
				placeholder="title"
			/>
			<input
				onChange={handleFileChange}
				type="file"
				name="cover"
				placeholder="cover"
			/>
			<input
				onChange={handleInputChange}
				type="text"
				name="author"
				placeholder="author"
			/>
			<input
				onChange={handleInputChange}
				type="text"
				name="content"
				placeholder="content"
			/>
			<button type="submit">Invia</button>
		</form>
	);
};

export default AddPostForm;
