import { useState } from "react";
import MainScreen from "./MainScreen";
// import './App.css'

function App() {
	const [count, setCount] = useState(false);

	return (
		<div className="bg-yellow-50 flex min-h-screen my-auto justify-center">
			<div className="m-auto">
				<MainScreen />
			</div>
		</div>
	);
}

export default App;
