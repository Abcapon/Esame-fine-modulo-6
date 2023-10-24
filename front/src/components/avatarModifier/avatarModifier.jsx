import React, { useState } from "react";
import useSession from "../../components/hooks/useSession";
import { useNavigate } from "react-router-dom";

const AvatarModifier = () => {
	const decodedSession = useSession();
	const navigate = useNavigate();

	const userId = decodedSession.id;

	const [avatar, setAvatar] = useState(null);

	const handleFileChange = (e) => {
		setAvatar(e.target.files[0]);
	};

	const handleUploadFile = async (e) => {
		e.preventDefault();

		if (!userId) {
			console.log("Inserisci l'ID dell'autore.");
			return;
		}

		if (!avatar) {
			console.log("Seleziona un file.");
			return;
		}

		const fileData = new FormData();
		fileData.append("avatar", avatar);

		try {
			const response = await fetch(
				`http://localhost:5050/authors/${userId}/avatar`,
				{
					method: "PATCH",
					body: fileData,
				}
			);
			const uploadResult = await response.json();
			navigate(`/home`);
			console.log("Upload Result:", uploadResult);
		} catch (error) {
			console.error("Errore durante il caricamento del file:", error);
		}
	};

	return (
		<form encType="multipart/form-data" onSubmit={handleUploadFile}>
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
