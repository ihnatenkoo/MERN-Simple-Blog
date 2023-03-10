import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { onCheckAuth } from './store/auth/auth.slice';
import { Routes, Route } from 'react-router-dom';
import Container from '@mui/material/Container';
import { Header } from './components';
import { Home, FullPost, Registration, AddPost, Login } from './pages';

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(onCheckAuth());
	}, []);

	return (
		<>
			<Header />
			<Container maxWidth="lg" sx={{ padding: '8px' }}>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/posts/:id" element={<FullPost />} />
					<Route path="/posts/:id/edit" element={<AddPost />} />
					<Route path="/post/create" element={<AddPost />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Registration />} />
				</Routes>
			</Container>
		</>
	);
};

export default App;
