import React from "react";
import AvatarModifier from "../../components/avatarModifier/avatarModifier";
import { Container } from "react-bootstrap";

const Utente = () => {
	return (
		<Container fluid="sm">
			<h1>Modifica il tuo avatar</h1>
			<AvatarModifier />
		</Container>
	);
};

export default Utente;
