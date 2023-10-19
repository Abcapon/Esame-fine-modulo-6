const express = require("express");
const login = express.Router();
const bcrypt = require("bcrypt");
const AuthorModel = require(`../models/authors`);
const jwt = require(`jsonwebtoken`);
require(`dotenv`).config();

login.post(`/login`, async (req, res) => {
	const author = await AuthorModel.findOne({ email: req.body.email });

	if (!author) {
		return res.status(404).send({
			message: `Nome utente errato o inesistente`,
			statusCode: 404,
		});
	}

	const validPassword = await bcrypt.compare(
		req.body.password,
		author.password
	);
	if (!validPassword) {
		return res.status(400).send({
			statusCode: 400,
			message: "Email o password errati",
		});
	}
	const token = jwt.sign(
		{
			id: author._id,
			nome: author.nome,
			cognome: author.cognome,
			email: author.email,
			bornDate: author.bornDate,
			avatar: author.avatar,
		},
		process.env.JWT_SECRET,
		{ expiresIn: "24h" }
	);

	res.header("Authorization", token).status(200).send({
		message: "Login effettuato con successo",
		statusCode: 200,
		token,
	});
});

module.exports = login;
