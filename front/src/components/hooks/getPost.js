import { useEffect, useState } from "react";

const useGetPosts = (currentPage) => {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
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

		fetchData();
	}, [currentPage]);

	return posts;
};

export default useGetPosts;
