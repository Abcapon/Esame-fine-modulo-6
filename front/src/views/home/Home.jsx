import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import BlogList from "../../components/blog/blog-list/BlogList";
import AvatarModifier from "../../components/avatarModifier/avatarModifier";
import CoverModifier from "../../components/coverModifier/CoverModifier";
import useGetPosts from "../../components/hooks/getPost";
import Pagination from "react-responsive-pagination";
import "./styles.css";

const Home = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const postsData = useGetPosts(currentPage);

	const totalPages = postsData.totalPages;

	const allPosts = postsData.posts;
	const [inputValue, setInputValue] = useState("");
	const [filteredPosts, setFilteredPosts] = useState([]);

	useEffect(() => {
		if (allPosts) {
			setFilteredPosts(allPosts);
		}
	}, [allPosts]);

	const handleInputChange = (e) => {
		const inputValue = e.target.value.toLowerCase();
		setInputValue(e.target.value);

		const filtered = allPosts.filter((post) =>
			post.title.toLowerCase().includes(inputValue)
		);
		setFilteredPosts(filtered);
	};

	const handlePageChange = (newPage) => {
		setCurrentPage(newPage);
	};

	return (
		<Container fluid="sm">
			<h1 className="blog-main-title mb-3">Benvenuto sullo Strive Blog!</h1>
			<input
				type="text"
				className="mb-3"
				placeholder="cerca"
				value={inputValue}
				onChange={handleInputChange}
			/>
			<BlogList posts={filteredPosts} />
			<Pagination
				current={currentPage}
				total={totalPages}
				onPageChange={handlePageChange}
			/>
			<CoverModifier />
		</Container>
	);
};

export default Home;
