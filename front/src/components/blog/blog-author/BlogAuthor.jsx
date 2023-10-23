import React from "react";
import { Col, Image, Row } from "react-bootstrap";
import "./styles.css";

const BlogAuthor = (props) => {
	const { nome, avatar } = props;
	return (
		<Row>
			<Col xs={"auto"} className="pe-0">
				<Image className="blog-author" src={avatar} roundedCircle />
			</Col>
			<Col>
				<div>di: {nome}</div>
			</Col>
		</Row>
	);
};

export default BlogAuthor;
