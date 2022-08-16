import { useState } from 'react';
import './App.css';

function App() {
	const [count, setCount] = useState(0);

	const increment = () => {
		setCount(count + 1);
	};
    
	const decrement = () => {
		if (count >= 1) 
			setCount(count - 1);
	};

	return (
		<div className='App'>
			<div>
				<h2>Счетчик:</h2>
				<h1>{count}</h1>
				<button onClick={decrement} className='minus'>
					- Минус
				</button>
				<button onClick={increment} className='plus'>
					Плюс +
				</button>
			</div>
		</div>
	);
}

export default App;
