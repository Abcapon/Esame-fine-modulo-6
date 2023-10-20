import { Outlet } from "react-router-dom";
import LogIn from "../../views/logIn/LogIn";

export const isAuth = () => {
	return JSON.parse(localStorage.getItem(`loggedInUser`));
};

const ProtectedRoutes = () => {
	const auth = isAuth();

	return auth ? <Outlet /> : <LogIn />;
};

export default ProtectedRoutes;
