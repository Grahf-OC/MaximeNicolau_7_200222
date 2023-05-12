/* eslint-disable no-alert */
/* eslint-disable no-console */
import React from 'react';
import axios from 'axios';
import { useConfirm } from 'material-ui-confirm';
import EditPost from './EditPost';
import PostContent from './PostContent';
import useAuth from '../hooks/useAuth';

export default function Post({ message, setRefresh }) {
	const [isToggled, setIsToggled] = React.useState(false);
	const [oldMessage, setOldMessage] = React.useState(message);
	const [liked, setLiked] = React.useState(false);
	const { auth } = useAuth();
	const authToken = auth.token || {};
	const confirm = useConfirm();
	const [isUser, setIsUser] = React.useState(false);
	const [errorText, setErrorText] = React.useState('');

	// const user permet de vérifier si l'utilisateur a les droits pour effectuer une action. On stocke le résultat dans isUser.

	React.useEffect(() => {
		const user = () => {
			if (message.UserId === auth.user.id || auth.user.isAdmin === true) {
				setIsUser(true);
			}
		};
		user();
	}, []);

	// Suppression d'un post avec une dialog box de confirmation.

	const handleDelete = async () => {
		const config = {
			headers: {
				Authorization: `Bearer ${authToken}`,
			},
		};
		try {
			await confirm({ title: 'Supprimer ce message?' });
			axios.delete(`http://localhost:3000/api/message/${message.id}`, config);
			setRefresh((prev) => !prev);
		} catch (error) {
			console.log(error);
		}
	};

	// Vérifie si l'utilisateur a déjà liké ce post.

	React.useEffect(() => {
		const toggleLiked = () => {
			const likeArray = message.Likes;
			const likedId = likeArray.filter((like) => like.UserId === auth.user.id);
			if (likedId.length > 0) {
				return setLiked(true);
			}
			return setLiked(false);
		};
		toggleLiked();
	}, []);

	const handleLike = async () => {
		const config = {
			headers: {
				Authorization: `Bearer ${authToken}`,
			},
		};
		try {
			const result = await axios.post(
				`http://localhost:3000/api/message/${message.id}/like`,
				{},
				config
			);
			setLiked((prev) => !prev);
			console.log(result);
		} catch (error) {
			console.log(error);
		} finally {
			setRefresh((prev) => !prev);
		}
	};

	const handleChange = (e) => {
		const { name, value, type, files } = e.target;
		setOldMessage((prev) => ({
			...prev,
			[name]: type === 'file' ? files[0] : value,
		}));
		console.log(oldMessage);
	};

	// toggle pour vérifier si le post est en train d'être édité, afin de changer l'affichage.

	const handleClick = () => setIsToggled(!isToggled);

	// Fonction pour envoyer le message édité.

	const handleEditSubmit = async () => {
		try {
			if (oldMessage.body !== '' && oldMessage.body.length <= 255) {
				const formData = new FormData();
				formData.append('body', JSON.stringify(oldMessage.body));
				formData.append('image', oldMessage.picture);

				const config = {
					headers: {
						'content-type': 'multipart/form-data',
						Authorization: `Bearer ${authToken}`,
					},
				};
				const result = await axios.put(
					`http://localhost:3000/api/message/${message.id}`,
					formData,
					config
				);

				console.log(result.data);
				setRefresh((prev) => !prev);
				setIsToggled(!isToggled);
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

	const date = message.createdAt;
	const showDate = date
		.substring(0, date.length - 5)
		.replace('T', ' ')
		.replace('-', '/')
		.replace('-', '/');

	return (
		<div>
			{isToggled ? (
				<EditPost
					handleChange={handleChange}
					handleEditSubmit={handleEditSubmit}
					body={oldMessage.body}
					errorText={errorText}
				/>
			) : (
				<PostContent
					key={oldMessage.id}
					id={message.UserId}
					body={oldMessage.body}
					user={message.User.firstName}
					isUser={isUser}
					date={showDate}
					profile={message.User.picture}
					picture={message.picture}
					alt={message.alt}
					likes={message.Likes.length}
					liked={liked}
					handleDelete={handleDelete}
					handleClick={() => handleClick()}
					handleLike={() => handleLike(oldMessage.id)}
				/>
			)}
		</div>
	);
}
