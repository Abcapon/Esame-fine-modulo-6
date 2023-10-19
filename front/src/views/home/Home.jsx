import React from "react";
import { Container } from "react-bootstrap";
import BlogList from "../../components/blog/blog-list/BlogList";
import "./styles.css";
import AddPostForm from "../../components/form/AddPostForm";
import AvatarModifier from "../../components/avatarModifier/avatarModifier";
import CoverModifier from "../../components/coverModifier/CoverModifier";

const Home = (props) => {
	return (
		<Container fluid="sm">
			<h1 className="blog-main-title mb-3">Benvenuto sullo Strive Blog!</h1>
			<BlogList />
			<AddPostForm />
			<AvatarModifier />
			<CoverModifier />
		</Container>
	);
};

export default Home;
