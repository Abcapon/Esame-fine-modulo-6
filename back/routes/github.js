const express = require("express");
const gh = express.Router();
const GithubStrategy = require("passport-github2").Strategy;
const passport = require("passport");
const jtw = require("jsonwebtoken");
const session = require("express-session");
require("dotenv").config();

gb.use(
	session({
		secret: process.env.GITHUB_CLIENT_ID,
		resave: false,
		saveUninitialized: false,
	})
);

module.exports = gh;
