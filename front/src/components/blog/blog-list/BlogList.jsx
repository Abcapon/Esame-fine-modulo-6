import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import BlogItem from "../blog-item/BlogItem";

const BlogList = () => {
	const [posts, setPosts] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);

	const getPost = async () => {
		try {
			const response = await fetch(
				`${process.env.REACT_APP_SERVER_BASE_URL}/posts?page=${currentPage}`
			);
			const data = await response.json();
			setPosts(data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getPost();
	}, []);

	return (
		<Row>
			{posts &&
				posts.posts?.map((post, i) => (
					<Col
						key={`item-${i}`}
						md={4}
						style={{
							marginBottom: 50,
						}}
					>
						<BlogItem key={post.title} {...post} />
					</Col>
				))}
		</Row>
	);
};

export default BlogList;
