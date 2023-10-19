import React from "react";
import NavBar from "./components/navbar/BlogNavbar";
import Footer from "./components/footer/Footer";
import Home from "./views/home/Home";
import Blog from "./views/blog/Blog";
import LogIn from "./views/logIn/LogIn";
import NewBlogPost from "./views/new/New";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./components/middlewares/ProtectedRoute";

function App() {
	return (
		<Router>
			<NavBar />
			<Routes>
				<Route exact path="/" element={<LogIn />} />
				<Route element={<ProtectedRoutes />}>
					<Route path="/home" element={<Home />} />
					<Route path="/blog/:id" element={<Blog />} />
					<Route path="/new" element={<NewBlogPost />} />
				</Route>
			</Routes>
			<Footer />
		</Router>
	);
}

export default App;
