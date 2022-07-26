/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
/* eslint-disable no-console */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import '../styles/index.css';
import axios from 'axios';
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Header from '../components/Header/Header';
import Post from '../components/Post/Post';
import useAuth from '../hooks/useAuth';

const Input = styled('input')({
	display: 'none',
});

export default function Home() {
	const { auth } = useAuth();
	const urlMessage = 'http://localhost:3000/api/message';
	const authToken = auth.token || {};
	const [allPosts, setAllPosts] = React.useState([]);
	const [post, setPost] = React.useState({
		body: '',
		picture: '',
	});
	const [refresh, setRefresh] = React.useState(false);
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.up('md'));

	// Récupération de tous les messages depuis la BDD puis le résulstat est stocké dans allPosts.

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

	// Création d'un post avec ou sans image.

	const handleSubmit = async (e) => {
		e.preventDefault();
		const config = {
			headers: {
				'content-type': 'multipart/form-data',
				Authorization: `Bearer ${authToken}`,
			},
		};
		try {
			if (post.body !== '') {
				const formData = new FormData();
				formData.append('body', JSON.stringify(post.body));
				formData.append('image', post.picture);
				const result = await axios.post(urlMessage, formData, config);
				setPost({ body: '' });
				setRefresh((prev) => !prev);
				return console.log(result);
			}
			return alert('Le message est vide.');
		} catch (error) {
			return console.log(error);
		}
	};

	// .map qui affiche tous les messages sur la page.

	const posts = allPosts.map((message) => (
		<div className="post" key={message.id}>
			<Post message={message} setRefresh={setRefresh} />
		</div>
	));

	return (
		<Box>
			<Stack direction={matches ? 'row' : 'column'}>
				<Header />
				<Stack
					direction="column"
					sx={{
						width: {
							xs: '95%',
							sm: '80%',
							md: '70%',
							lg: '50%',
							xl: '50%',
						},
					}}
				>
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
		</Box>
	);
}
