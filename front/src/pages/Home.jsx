/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
/* eslint-disable no-console */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import '../styles/index.css';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../components/Header';
import useAuth from '../hooks/useAuth';
import PostCard from '../components/PostCard';
import ScrollToTopButton from '../components/Buttons/ScrollToTopButton';
import UploadMessageImageButton from '../components/Buttons/UploadMessageImageButton';
import SendMessageButton from '../components/Buttons/SendMessageButton';
import InputSendMessage from '../components/InputSendMessage';

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
	const [errorText, setErrorText] = React.useState('');
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.up('lg'));

	// Récupération de tous les messages depuis la BDD puis le résultat est stocké dans allPosts.

	React.useEffect(() => {
		const fetchData = async () => {
			const result = await axios(urlMessage, {
				headers: { Authorization: `Bearer ${authToken}` },
			});

			setAllPosts(result.data);
			console.log(post);
			return console.log(result.data);
		};
		fetchData();
	}, [refresh]);

	const handleChange = (e) => {
		const { name, value, type, files } = e.target;
		setPost((prev) => ({
			...prev,
			[name]: type === 'file' ? files[0] : value,
		}));
	};

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
			if (post.body !== '' && post.body.length <= 255) {
				const formData = new FormData();
				formData.append('body', JSON.stringify(post.body));
				formData.append('image', post.picture);
				const result = await axios.post(urlMessage, formData, config);
				setPost({ body: '', picture: '' });
				setRefresh((prev) => !prev);
				setErrorText('');

				return console.log(result);
			}
			setErrorText('Ne doit pas être vide et moins de 255 signes.');
			return console.log(errorText);
		} catch (error) {
			return console.log(error);
		}
	};

	// .map qui affiche tous les messages sur la page.

	const posts = allPosts.map((message) => (
		<div key={message.id}>
			<PostCard message={message} setRefresh={setRefresh} />
		</div>
	));

	return (
		<Box>
			<Stack direction={matches ? 'row' : 'column'}>
				<Header />

				<Stack
					sx={{
						width: {
							xs: '100%',
							sm: '100%',
							md: '100%',
							lg: '60%',
							xl: '50%',
						},
						marginTop: { xs: 9, sm: 10, md: 8, lg: 5, xl: 5 },
						marginRight: 'auto',
						marginBottom: 'auto',
						marginLeft: 'auto',
						padding: { md: 2, lg: 2, xl: 2 },
					}}
				>
					<Container
						component="form"
						sx={{
							width: {
								xs: '100%',
								sm: '100%',
								md: '90%',
								lg: '100%',
								xl: '100%',
							},
						}}
					>
						<FormControl fullWidth>
							<InputSendMessage
								handleChange={handleChange}
								post={post}
								errorText={errorText}
								setErrorText={setErrorText}
							/>

							<Stack direction="row" justifyContent="center" sx={{ mb: 2 }}>
								<UploadMessageImageButton handleChange={handleChange} />
								<SendMessageButton handleSubmit={handleSubmit} />
							</Stack>
						</FormControl>
					</Container>
					{posts}
				</Stack>

				<ScrollToTopButton />
			</Stack>
		</Box>
	);
}
