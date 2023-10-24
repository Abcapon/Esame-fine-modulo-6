import Blog from "./views/blog/Blog";
import React from "react";
import NavBar from "./components/navbar/BlogNavbar";
import Footer from "./components/footer/Footer";
import Home from "./views/home/Home";
import LogIn from "./views/logIn/LogIn";
import NewBlogPost from "./views/new/New";
import NewAuthor from "./views/newAuthor/NewAuthor";
import Utente from "./views/utente/Utente";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./components/middlewares/ProtectedRoute";
import Success from "./views/success/Success";
import { AuthProvider } from "./components/context/AuthContext";

function App() {
	return (
		<Router>
			<AuthProvider>
				<NavBar />
				<Routes>
					<Route exact path="/" element={<LogIn />} />
					<Route path="/success/:token" element={<Success />} />
					<Route path="/newAuthor" element={<NewAuthor />} />
					<Route element={<ProtectedRoutes />}>
						<Route path="/home" element={<Home />} />
						<Route path="/blog/:id" element={<Blog />} />
						<Route path="/new" element={<NewBlogPost />} />
						<Route path="/utente" element={<Utente />} />
					</Route>
				</Routes>
				<Footer />
			</AuthProvider>
		</Router>
	);
}

export default App;
