import { useState, useEffect } from "react";
import { info } from "../assets/info";
import Modal from "../components/Modal";
interface ComponentProps {
	setComponentToShow: Function;
}

const Home = ({ setComponentToShow }: ComponentProps) => {
	type User = {
		balance: number;
		name: string;
		username: string;
		id: number;
		datetime: Date;
		transactions: any;
		expenses: number;
		income: number;
	};
	type Transactions = any[] | any;
	const [user, setUser] = useState<User>();
	const [transactions, setTransactions] = useState<Transactions>([]);
	const [showModal, setShowModal] = useState(false);
	const makeApiCall = async () => {
		const token: any = sessionStorage.getItem("user");
		const res = await fetch(`${info.baseUrl}/users/`, {
			headers: {
				accept: "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		const response = await res.json();
		if (res.status === 200) {
			setUser(response);
			setTransactions(response.transactions);
		} else {
			//console.log(response);
		}
	};
	useEffect(() => {
		makeApiCall();
	}, [transactions]);
	return (
		<>
			{showModal ? (
				<Modal
					setTransactions={setTransactions}
					transactions={transactions}
					setShowModal={setShowModal}
				/>
			) : null}
			<div className="p-12">
				<div className="flex flex-col items-center w-80 drop-shadow-xl bg-yellow-100 rounded-lg pb-4">
					<h2 className="m-4 mb-2">Balance</h2>
					<h1>${user?.balance}</h1>
					<div className="px-3 mt-2 flex justify-between w-full">
						<div className="flex items-center">
							<span className="">
								<p className="rounded-full bg-white p-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth="2.5"
										stroke="currentColor"
										className="w-6 h-6 text-green-500">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
										/>
									</svg>
								</p>
							</span>
							<span className="pl-2 text-sm">
								<p className=" text-gray-500">Income</p>
								<p>${user?.income}</p>
							</span>
						</div>
						<div className="flex items-center">
							<span className="">
								<p className="rounded-full bg-white p-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth="2.5"
										stroke="currentColor"
										className="w-6 h-6 text-red-500">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75"
										/>
									</svg>
								</p>
							</span>
							<span className="pl-2 text-sm">
								<p className=" text-gray-500">Expense</p>
								<p>${user?.expenses}</p>
							</span>
						</div>
					</div>
				</div>
				<div className="mt-12 flex flex-col items-center overflow-y-auto h-60 scroll pr-3">
					{transactions.map((transaction: any) => (
						<div
							key={transaction.id}
							className="text-start w-full px-4 py-3 my-1.5 flex items-center rounded-lg bg-white drop-shadow-md ">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								className="text-white mr-3 w-8 h-6.5 bg-gray-400 rounded-full ">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
							<div className="flex justify-between w-full text-sm">
								<p>{transaction.description}</p>
								{transaction.is_income ? (
									<p className="text-green-500">
										+${transaction.transaction_value}
									</p>
								) : (
									<p className="text-red-500">
										-${transaction.transaction_value}
									</p>
								)}
							</div>
						</div>
					))}
				</div>
				{/* <div className="fixed bottom-6 place-self-center m-auto"> */}
				<button
					className="fixed left-1/2 rounded-full p-2 bottom-6 m-auto bg-gray-400 animate-bounce"
					onClick={() => setShowModal(true)}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="currentColor"
						className="w-6 h-6">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M12 4.5v15m7.5-7.5h-15"
						/>
					</svg>
				</button>
				{/* </div> */}
			</div>
		</>
	);
};

export default Home;
