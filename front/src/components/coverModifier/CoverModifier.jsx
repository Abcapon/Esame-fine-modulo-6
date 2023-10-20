import React, { useState } from "react";

const CoverModifier = () => {
	const [formData, setFormData] = useState({
		postId: "",
	});

	const [cover, setCover] = useState(null);

	const handleFileChange = (e) => {
		setCover(e.target.files[0]);
	};

	const handleUploadFile = async (e) => {
		e.preventDefault();
		const postId = formData.postId;

		if (!postId) {
			console.log("Inserisci l'ID del post.");
			return;
		}

		if (!cover) {
			console.log("Seleziona un file.");
			return;
		}

		const fileData = new FormData();
		fileData.append("cover", cover);
		console.log("fileData:", fileData);

		try {
			const response = await fetch(
				`${process.env.REACT_APP_SERVER_BASE_URL}/posts/${postId}/cover`,
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
				name="postId"
				placeholder="ID del post"
				value={formData.postId}
				onChange={handleInputChange}
			/>
			<input
				type="file"
				onChange={handleFileChange}
				name="cover"
				placeholder="cover"
			/>
			<button type="submit">Upload cover</button>
		</form>
	);
};

export default CoverModifier;
