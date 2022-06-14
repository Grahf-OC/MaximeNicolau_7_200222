/* eslint-disable react/button-has-type */
/* eslint-disable no-console */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Link } from 'react-router-dom';

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
	const user = JSON.parse(localStorage.getItem('myUser'));

	const [allPosts, setAllPosts] = React.useState([]);
	const [post, setPost] = React.useState({
		body: '',
	});
	const [newPost, setNewPost] = React.useState(false);

	React.useEffect(() => {
		const fetchData = async () => {
			const result = await axios(urlMessage, {
				headers: { Authorization: `Bearer ${authToken}` },
			});
			console.log(result.data);
			setAllPosts(result.data);
		};
		fetchData();
	}, [newPost]);

	function handleChange(e) {
		const { name, value } = e.target;
		setPost((prevPost) => ({
			...prevPost,
			[name]: value,
		}));
		console.log(user.id);
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
			setNewPost((prevNewPost) => !prevNewPost);

			console.log(result);
		} catch (error) {
			console.log(error);
		} finally {
			setPost({ body: '' });
		}

		console.log('Message created');
	};

	const handleDelete = async () => {
		try {
			const result = await axios.delete(
				`http://localhost:3000/api/message/${post.id}`
			);
			console.log(result);
		} catch (error) {
			console.log(error);
		}
	};

	const posts = allPosts.map((message) => (
		<div className="post">
			<Link to={`/message/${message.id}`}>
				<Post
					key={message.id}
					body={message.body}
					user={message.User.firstName}
					delete={handleDelete}
				/>
			</Link>
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
