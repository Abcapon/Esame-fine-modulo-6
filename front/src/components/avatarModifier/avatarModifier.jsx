import React, { useState } from "react";

const AvatarModifier = () => {
	const [formData, setFormData] = useState({
		authorId: "",
	});
	console.log(formData);
	const [avatar, setAvatar] = useState(null);
	console.log(avatar);

	const handleFileChange = (e) => {
		setAvatar(e.target.files[0]);
	};

	const handleUploadFile = async (e) => {
		e.preventDefault();
		const authorId = formData.authorId;

		if (!authorId) {
			console.log("Inserisci l'ID dell'autore.");
			return;
		}

		if (!avatar) {
			console.log("Seleziona un file.");
			return;
		}

		const fileData = new FormData();
		fileData.append("avatar", avatar);
		console.log("fileData:", fileData);

		try {
			const response = await fetch(
				`http://localhost:5050/authors/${authorId}/avatar`,
				{
					method: "PATCH",
					body: fileData,
				}
			);
			const uploadResult = await response.json();
			console.log("Upload Result:", uploadResult);
		} catch (error) {
			console.error("Errore durante il caricamento del file:", error);
		}
	};

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	return (
		<form encType="multipart/form-data" onSubmit={handleUploadFile}>
			<input
				type="text"
				name="authorId"
				placeholder="ID dell'autore"
				value={formData.authorId}
				onChange={handleInputChange}
			/>
			<input
				type="file"
				onChange={handleFileChange}
				name="avatar"
				placeholder="avatar"
			/>
			<button type="submit">Upload Avatar</button>
		</form>
	);
};

export default AvatarModifier;
