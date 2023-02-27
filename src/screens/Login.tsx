import { useState } from "react";
import BackBtn from "../components/BackBtn";
import Loading from "../components/Loading";
import { info } from "../assets/info";
interface ComponentProps {
	setComponentToShow: Function;
	showBackBtn: Boolean;
	setIsLogedIn: Function;
}

const Login = ({
	setComponentToShow,
	showBackBtn,
	setIsLogedIn,
}: ComponentProps) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [showError, setShowError] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");
	const [showLoading, setShowLoading] = useState(false);

	const handleLogin = async () => {
		setShowLoading(true);

		setShowLoading(true);
		if (password.length === 0 && username.length === 0) {
			setErrorMsg("Invalid input");
			setShowError(true);
			setShowLoading(false);
			setTimeout(() => {
				setShowError(false);
			}, 2000);

			return;
		}

		const res = await fetch(`${info.baseUrl}/login`, {
			method: "POST",
			headers: {
				accept: "application/json",
			},
			body: new URLSearchParams({
				username: username,
				password: password,
			}),
		});
		const response = await res.json();

		if (res.status === 200) {
			sessionStorage.setItem("user", response.access_token);
			setComponentToShow("home");
			setIsLogedIn(true);
		} else {
			setErrorMsg(response.detail);
			setShowError(true);
			setTimeout(() => {
				setShowError(false);
			}, 2000);
		}
		setShowLoading(false);
	};

	return (
		<div className="flex flex-col justify-center m-20">
			{showLoading ? <Loading /> : null}
			<div className="flex justify-between pb-6">
				<div className="m-auto">
					<h1 className="font-bold text-lg">Login</h1>
				</div>
			</div>
			{showError ? (
				<p className="text-center text-red-500 font-semibold text-sm mb-5">
					{errorMsg}
				</p>
			) : null}
			<div className="m-auto flex flex-col justify-between">
				<label htmlFor="username">Username:</label>
				<input
					className="border-solid border-black border-b-2  bg-yellow-50 focus:outline-none focus:bg-yellow-100 rounded-tr-md rounded-tl-md"
					type="text"
					name="username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<label htmlFor="username" className="pt-2">
					Password:
				</label>

				<input
					className="border-solid border-black border-b-2  bg-yellow-50 focus:outline-none focus:bg-yellow-100 rounded-tr-md rounded-tl-md "
					type="password"
					name="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button
					onClick={handleLogin}
					className="bg-blue-300 text-md font-semibold rounded-md mt-6"
					disabled={showLoading}>
					Login
				</button>
				<button
					onClick={() => {
						setComponentToShow("register");
					}}
					className="text-blue-900 underline rounded-md mt-6"
					disabled={showLoading}>
					Click to register
				</button>
			</div>
		</div>
	);
};

export default Login;
