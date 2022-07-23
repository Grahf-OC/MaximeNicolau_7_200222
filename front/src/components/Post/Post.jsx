/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React from 'react';
import axios from 'axios';
import { useConfirm } from 'material-ui-confirm';
import EditMessage from '../EditMessage/EditMessage';
import DisplayPosts from '../DisplayPosts/DisplayPosts';
import useAuth from '../../hooks/useAuth';

export default function Post({ message, setRefresh }) {
	const [isToggled, setIsToggled] = React.useState(false);
	const [oldMessage, setOldMessage] = React.useState(message);
	const [liked, setLiked] = React.useState(false);
	const { auth } = useAuth();
	const authToken = auth.token || {};
	const confirm = useConfirm();
	const [isUser, setIsUser] = React.useState(false);

	React.useEffect(() => {
		const user = () => {
			if (message.UserId === auth.user.id || auth.user.isAdmin === true) {
				setIsUser(true);
			}
		};
		user();
	}, []);

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

	function handleChange(e) {
		const { name, value, type, files } = e.target;
		setOldMessage((prev) => ({
			...prev,
			[name]: type === 'file' ? files[0] : value,
		}));
	}

	const handleClick = () => setIsToggled(!isToggled);

	const handleEditSubmit = async () => {
		try {
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
		} catch (error) {
			console.log(error);
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
				<EditMessage
					handleClick={() => handleClick()}
					onChange={(e) => handleChange(e)}
					handleEditSubmit={() => handleEditSubmit()}
					body={oldMessage.body}
				/>
			) : (
				<DisplayPosts
					key={oldMessage.id}
					id={oldMessage.id}
					body={oldMessage.body}
					user={message.User.firstName}
					isUser={isUser}
					date={showDate}
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
