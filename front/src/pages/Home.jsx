/* eslint-disable react/button-has-type */
/* eslint-disable no-console */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import '../styles/index.css';
import axios from 'axios';
import Header from '../components/Header/Header';
import Post from '../components/Post/Post';

export default function Home() {
	const urlMessage = 'http://localhost:3000/api/message';
	const authToken = localStorage.getItem('token') || {};

	const [allPosts, setAllPosts] = React.useState([]);
	const [post, setPost] = React.useState({
		body: '',
	});
	const [refresh, setRefresh] = React.useState(false);

	React.useEffect(() => {
		const fetchData = async () => {
			const result = await axios(urlMessage, {
				headers: { Authorization: `Bearer ${authToken}` },
			});
			console.log(result.data);
			setAllPosts(result.data);
		};
		fetchData();
	}, [refresh]);

	function handleChange(e) {
		const { name, value } = e.currentTarget;
		setPost((prevPost) => ({
			...prevPost,
			[name]: value,
		}));
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		const config = {
			headers: {
				Authorization: `Bearer ${authToken}`,
			},
		};
		try {
			const result = await axios.post(urlMessage, post, config);

			console.log(result);
		} catch (error) {
			console.log(error);
		} finally {
			setPost({ body: '' });
			setRefresh((prev) => !prev);
		}

		console.log('Message created');
	};

	const posts = allPosts.map((message) => (
		<div className="post">
			<Post
				key={message.id}
				message={message}
				setRefresh={setRefresh}
				post={post}
				setPost={setPost}
			/>
		</div>
	));

	return (
		<Stack direction="row" justifyContent="space-evenly">
			<Header />
			<Container>
				<input
					type="text"
					placeholder="Quoi de neuf?"
					className="form--input"
					name="body"
					onChange={handleChange}
					value={post.body}
				/>
				<Button variant="contained" type="submit" onClick={handleSubmit}>
					Envoyer
				</Button>
				<div>{posts}</div>
			</Container>
		</Stack>
	);
}

/* 	const handleEditSubmit = async (event, id) => {
		event.preventDefault();
		try {
			const formData = new FormData();
			formData.append('message', JSON.stringify(post));
			formData.append('image', post.picture);

			const config = {
				headers: {
					'content-type': 'multipart/form-data',
					Authorization: `Bearer ${authToken}`,
				},
			};
			const result = await axios.put(
				`http://localhost:3000/api/message/${id}`,
				formData,
				config
			);
			console.log(result.data);
		} catch (error) {
			console.log(error);
		}
	}; */
