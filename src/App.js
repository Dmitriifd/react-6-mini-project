import { Block } from './Block';
import './index.scss';
import { useState, useEffect, useRef } from 'react';

function App() {
	const [fromCurrency, setFromCurrency] = useState('RUB');
	const [toCurrency, setToCurrency] = useState('USD');
	const [fromPrice, setFromPrice] = useState(0);
	const [toPrice, setToPrice] = useState(1);

	const ratesRef = useRef({});

	useEffect(() => {
		fetch('https://cdn.cur.su/api/nbu.json')
			.then((res) => res.json())
			.then((json) => {
				ratesRef.current = json.rates;
				onChangeToPrice(1);
			})
			.catch((err) => console.warn(err));
	}, []);

	const onChangeFromPrice = (value) => {
		const price = value / ratesRef.current[fromCurrency];
		const result = price * ratesRef.current[toCurrency];
		setFromPrice(value);
		setToPrice(result.toFixed(2));
	};
	const onChangeToPrice = (value) => {
		const result =
			(ratesRef.current[fromCurrency] / ratesRef.current[toCurrency]) * value;
		setFromPrice(result.toFixed(2));
		setToPrice(value);
	};

	useEffect(() => {
		onChangeFromPrice(fromPrice);
	}, [fromCurrency]);

	useEffect(() => {
		onChangeToPrice(toPrice);
	}, [toCurrency]);

	return (
		<div className='App'>
			<Block
				value={fromPrice}
				currency={fromCurrency}
				onChangeCurrency={setFromCurrency}
				onChangeValue={onChangeFromPrice}
			/>
			<Block
				value={toPrice}
				currency={toCurrency}
				onChangeCurrency={setToCurrency}
				onChangeValue={onChangeToPrice}
			/>
		</div>
	);
}

export default App;
