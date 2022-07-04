/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
/* eslint-disable no-console */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import '../styles/index.css';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Header from '../components/Header/Header';
import Post from '../components/Post/Post';

const Input = styled('input')({
	display: 'none',
});

export default function Home() {
	const urlMessage = 'http://localhost:3000/api/message';
	const authToken = localStorage.getItem('token') || {};

	const [allPosts, setAllPosts] = React.useState([]);
	const [post, setPost] = React.useState({
		body: '',
		picture: '',
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
		const { name, value, type, files } = e.target;
		setPost((prev) => ({
			...prev,
			[name]: type === 'file' ? files[0] : value,
		}));
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		const config = {
			headers: {
				'content-type': 'multipart/form-data',
				Authorization: `Bearer ${authToken}`,
			},
		};
		try {
			const formData = new FormData();
			formData.append('body', JSON.stringify(post.body));
			formData.append('image', post.picture);
			const result = await axios.post(urlMessage, formData, config);

			console.log(result);
		} catch (error) {
			console.log(error);
		} finally {
			setRefresh((prev) => !prev);
		}

		console.log(post);
	};

	const posts = allPosts.map((message) => (
		<div className="post">
			<Post key={message.id} message={message} setRefresh={setRefresh} />
		</div>
	));

	return (
		<Stack direction="row">
			<Header />
			<Stack direction="column" sx={{ width: '50%' }}>
				<Container>
					<form>
						<input
							type="text"
							placeholder="Quoi de neuf?"
							className="message--input"
							name="body"
							onChange={handleChange}
							value={post.body}
						/>
						<label htmlFor="icon-button-file">
							<Input
								accept="image/*"
								id="icon-button-file"
								type="file"
								name="picture"
								onChange={(e) => handleChange(e)}
							/>
						</label>
						<label htmlFor="icon-button-file">
							<IconButton
								color="primary"
								aria-label="upload picture"
								component="span"
							>
								<PhotoCamera />
							</IconButton>
						</label>

						<Button variant="contained" type="submit" onClick={handleSubmit}>
							Envoyer
						</Button>
					</form>

					<div>{posts}</div>
				</Container>
			</Stack>
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
