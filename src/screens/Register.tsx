import { useState } from "react";
import Loading from "../components/Loading";
import BackBtn from "../components/BackBtn";
import { info } from "../assets/info";

interface ComponentProps {
	setComponentToShow: Function;
}

const Register = ({ setComponentToShow }: ComponentProps) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [balance, setBalance] = useState("");
	const [showError, setShowError] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");
	const [showLoading, setShowLoading] = useState(false);

	const handleRegistration = async () => {
		setShowLoading(true);
		const res = await fetch(`${info.baseUrl}/users/create`, {
			method: "POST",
			headers: {
				accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: name,
				username: username,
				password: password,
				balance: balance,
			}),
		});
		const response = await res.json();

		if (res.status === 200) {
			sessionStorage.setItem("user", JSON.stringify(response.access_token));
			setComponentToShow("login");
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
					<h1 className="font-bold text-lg">Register</h1>
				</div>
			</div>
			{showError ? (
				<p className="text-center text-red-500 font-semibold text-sm mb-5">
					{errorMsg}
				</p>
			) : null}
			<div className="m-auto flex flex-col justify-between">
				<label htmlFor="name">Name:</label>

				<input
					className="border-solid border-black border-b-2  bg-yellow-50 focus:outline-none focus:bg-yellow-100 rounded-tr-md rounded-tl-md "
					type="text"
					name="name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
			</div>

			<label htmlFor="username">Username:</label>
			<input
				className="border-solid border-black border-b-2  bg-yellow-50 focus:outline-none focus:bg-yellow-100 rounded-tr-md rounded-tl-md"
				type="text"
				name="username"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
			/>
			<label htmlFor="username">Password:</label>

			<input
				className="border-solid border-black border-b-2  bg-yellow-50 focus:outline-none focus:bg-yellow-100 rounded-tr-md rounded-tl-md "
				type="password"
				name="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<label htmlFor="balance">Current Balance:</label>

			<input
				className="border-solid border-black border-b-2  bg-yellow-50 focus:outline-none focus:bg-yellow-100 rounded-tr-md rounded-tl-md "
				type="number"
				name="balance"
				value={balance}
				onChange={(e) => setBalance(e.target.value)}
			/>
			<button
				onClick={handleRegistration}
				className="bg-blue-300 text-md font-semibold rounded-md mt-6"
				disabled={showLoading}>
				Register
			</button>
			<button
				onClick={() => {
					setComponentToShow("login");
				}}
				className="text-blue-900 underline rounded-md mt-6"
				disabled={showLoading}>
				Click to Login
			</button>
		</div>
	);
};

export default Register;
