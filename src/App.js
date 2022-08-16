import { useState, useEffect } from 'react';
import './App.css';

import { Success } from './components/Success';
import { Users } from './components/Users';

function App() {
	const [users, setUsers] = useState([]);
	const [isLoading, setLoading] = useState(true);
	const [searchValue, setSearchValue] = useState('');
	const [invites, setInvites] = useState([]);
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		fetch('https://reqres.in/api/users')
			.then((res) => res.json())
			.then((json) => setUsers(json.data))
			.catch((err) => console.warn(err))
			.finally(() => setLoading(false));
	}, []);

	const onChangeSearchValue = (event) => {
		setSearchValue(event.target.value);
	};

	const onClickInvite = (id) => {
		if (invites.includes(id)) {
			setInvites((prev) => prev.filter((_id) => _id !== id));
		} else {
			setInvites((prev) => [...prev, id]);
		}
	};

    const onClickSentInvetes = () => {
        setSuccess(true)
    }

	return (
		<div className='App'>
			{success ? (
				<Success count={invites.length}/>
			) : (
				<Users
					onChangeSearchValue={onChangeSearchValue}
					searchValue={searchValue}
					items={users}
					isLoading={isLoading}
					invites={invites}
					onClickInvite={onClickInvite}
					onClickSentInvetes={onClickSentInvetes}
				/>
			)}
		</div>
	);
}

export default App;
