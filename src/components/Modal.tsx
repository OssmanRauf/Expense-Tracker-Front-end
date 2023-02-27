import { info } from "../assets/info";
import { useState } from "react";
interface ComponentProps {
	setTransactions: Function;
	transactions: any[];
	setShowModal: Function;
}

const Modal = ({
	setTransactions,
	transactions,
	setShowModal,
}: ComponentProps) => {
	const [showError, setShowError] = useState(false);

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		const form = new FormData(e.target);
		const json = {
			is_income: form.get("option"),
			description: form.get("description"),
			transaction_value: form.get("value"),
		};
		const token: any = sessionStorage.getItem("user");

		const result = await fetch(`${info.baseUrl}/transactions/`, {
			method: "POST",
			headers: {
				accept: "application/json",
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(json),
		});
		if (result.status === 201) {
			const response = await result.json();
			setTransactions([...transactions, response]);
			setShowModal(false);
			// if (form.get("option")) {
			// 	user.incom(user.income + form.get("value"));
			// }
		} else {
			setShowError(true);
			setTimeout(() => {
				setShowError(false);
			}, 2500);
		}
	};
	return (
		<div className="modal bg-gray-900 bg-opacity-60 fixed w-full h-full top-0 left-0 flex items-center justify-center z-10">
			<div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-40 overflow-y-auto">
				{/* <!-- Add margin if you want to see some of the overlay behind the modal--> */}
				<div className="m-4 modal-content py-4 text-left px-6 z-50">
					{showError ? (
						<p className="text-center text-red-500 pb-3">
							Please enter the information correctly
						</p>
					) : null}
					<div className="flex justify-between items-center pb-3 z-50">
						<p className="text-2xl font-bold">Add Transaction!</p>
						<button
							onClick={() => setShowModal(false)}
							className="modal-close cursor-pointer z-50">
							<svg
								className="fill-current text-black"
								xmlns="http://www.w3.org/2000/svg"
								width="18"
								height="18"
								viewBox="0 0 18 18">
								<path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
							</svg>
						</button>
					</div>
					<form onSubmit={handleSubmit}>
						<div className="flex w-full">
							<label
								htmlFor="value"
								className="w-1/2 text-start text-sm lg:text-base">
								Transaction value:
							</label>
							<span className="flex justify-end w-1/2">
								<input
									type="number"
									name="value"
									placeholder="Value"
									id=""
									step=".01"
									className="border-2 border-gray-700 rounded-sm px-1 ml-4 mb-3 w-full appearance-none outline-none text-sm lg:text-base"
								/>
							</span>
						</div>
						<div className="flex w-full">
							<label
								htmlFor="description"
								className="w-1/2 text-start text-sm lg:text-base">
								Transaction description:
							</label>
							<span className="flex justify-end w-1/2">
								<input
									type="text"
									name="description"
									placeholder="Description"
									id=""
									className="border-2 border-gray-700 rounded-sm px-1 ml-4 mb-3 w-full text-sm lg:text-base"
								/>
							</span>
						</div>

						<div className="flex w-full">
							<label
								htmlFor="option"
								className="w-1/2 text-start text-sm lg:text-base">
								Transaction type:
							</label>
							<span className="flex justify-end w-1/2">
								<select
									name="option"
									className="border-2 border-gray-700 rounded-sm px-1 ml-4 mb-3 w-full text-sm lg:text-base">
									<option className="text-sm lg:text-base" value="True">
										Income
									</option>
									<option className="text-sm lg:text-base" value="False">
										Expense
									</option>
								</select>
							</span>
						</div>
						<button
							type="submit"
							className="bg-blue-500 rounded-md p-0.5 px-6 mt-2">
							Add
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Modal;
