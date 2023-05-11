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
import { useTheme } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import useMediaQuery from '@mui/material/useMediaQuery';
import { TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import Avatar from '@mui/material/Avatar';
import Header from '../components/Header';
import PostCard from '../components/PostCard';
import ScrollToTopButton from '../components/ScrollToTopButton';
import useAuth from '../hooks/useAuth';
import UploadMessageImageButton from '../components/UploadMessageImageButton';

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
			setErrorText(
				'Le message ne doit pas être vide et doit contenir moins de 255 characters.'
			);
			return console.log(errorText);
		} catch (error) {
			return console.log(error);
		}
	};

	// .map qui affiche tous les messages sur la page.

	const posts = allPosts.map((message) => (
		<div className="post" key={message.id}>
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
							sm: '90%',
							md: '80%',
							lg: '60%',
							xl: '50%',
						},
						marginTop: { xs: 7, sm: 7, md: 7, lg: 'auto', xl: 'auto' },
						marginRight: 'auto',
						marginBottom: 'auto',
						marginLeft: 'auto',
						padding: 2,
					}}
				>
					<Box component="form">
						<FormControl fullWidth>
							<Container
								sx={{ display: 'flex', alignItems: 'center', mt: 2, mb: 2 }}
							>
								<Avatar
									sx={{ width: 55, height: 55, marginRight: 2 }}
									alt="Photo de profil"
									src={auth.user.picture}
								/>
								<InputLabel htmlFor="post-message" />
								<TextField
									fullWidth
									multiline
									placeholder={`Quoi de neuf ${auth.user.firstName}?`}
									id="post-message"
									name="body"
									onChange={(e) => handleChange(e)}
									value={post.body}
									error={errorText !== ''}
									helperText={errorText}
								/>
							</Container>
							<Stack direction="row" justifyContent="center">
								<UploadMessageImageButton handleChange={handleChange} />
								<InputLabel htmlFor="send-message" />
								<Button
									sx={{ width: '15%', ml: 1 }}
									id="send-message"
									variant="contained"
									type="submit"
									onClick={handleSubmit}
								>
									Publier
								</Button>
							</Stack>
						</FormControl>
					</Box>

					<Container>{posts}</Container>
				</Stack>
				<ScrollToTopButton />
			</Stack>
		</Box>
	);
}
