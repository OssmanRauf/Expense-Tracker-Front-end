import Login from "./screens/Login";
import Register from "./screens/Register";
import Home from "./screens/Home";
import { useState, useEffect } from "react";
const Main = () => {
	const [componentToShow, setComponentToShow] = useState("login");
	const [isLogedIn, setIsLogedIn] = useState(true);

	useEffect(() => {
		const token = sessionStorage.getItem("user");

		if (!token) {
			setComponentToShow("login");
			setIsLogedIn(false);
		} else {
			setComponentToShow("home");
		}
	}, []);

	if (!isLogedIn) {
		if (componentToShow === "login") {
			return (
				<Login
					setIsLogedIn={setIsLogedIn}
					showBackBtn={false}
					setComponentToShow={setComponentToShow}
				/>
			);
		} else if (componentToShow === "register")
			return <Register setComponentToShow={setComponentToShow} />;
	} else {
		return <Home setComponentToShow={setComponentToShow} />;
	}
};

const MainScreen = () => {
	return (
		<div className="bg-yellow-50 lg:min-w-full lg:max-w-lg m-auto sm:min-w-full min-h-screen">
			{Main()}
		</div>
	);
};

export default MainScreen;
