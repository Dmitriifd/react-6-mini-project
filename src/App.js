import React, { useEffect, useState } from 'react';
import Collection from './Collection';
import './index.scss';

const cats = [
	{ name: 'Все' },
	{ name: 'Море' },
	{ name: 'Горы' },
	{ name: 'Архитектура' },
	{ name: 'Города' },
];

function App() {
	const [page, setPage] = useState(1);
	const [collections, setCollections] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [searchValue, setSearchValue] = useState('');
	const [categoryId, setCategoryId] = useState(0);

	useEffect(() => {
		setIsLoading(true);

		const category = categoryId ? `category=${categoryId}` : '';

		fetch(
			`https://628a7538e5e5a9ad3224ddfd.mockapi.io/photos?page=${page}&limit=6&${category}`
		)
			.then((res) => res.json())
			.then((json) => setCollections(json))
			.catch((err) => console.log(err))
			.finally(() => setIsLoading(false));
	}, [categoryId, page]);

	return (
		<div className='App'>
			<h1>Моя коллекция фотографий</h1>
			<div className='top'>
				<ul className='tags'>
					{cats.map((cat, i) => (
						<li
							onClick={() => setCategoryId(i)}
							className={categoryId === i ? 'active' : ''}
							key={cat.name}
						>
							{cat.name}
						</li>
					))}
				</ul>
				<input
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
					className='search-input'
					placeholder='Поиск по названию'
				/>
			</div>

			<div className='content'>
				{isLoading ? (
					<h2>Идет Загрузка...</h2>
				) : (
					collections
						.filter((obj) =>
							obj.name.toLowerCase().includes(searchValue.toLowerCase())
						)
						.map((obj, i) => (
							<Collection key={i} name={obj.name} images={obj.photos} />
						))
				)}
			</div>
			<ul className='pagination'>
				{[...Array(5)].map((_, i) => (
					<li
						key={i}
						onClick={() => setPage(i + 1)}
						className={page === i + 1 ? 'active' : ''}
					>
						{i + 1}
					</li>
				))}
			</ul>
		</div>
	);
}

export default App;
