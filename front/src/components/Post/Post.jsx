/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React from 'react';
import axios from 'axios';

import EditMessage from '../EditMessage/EditMessage';
import DisplayPosts from '../DisplayPosts/DisplayPosts';
import useAuth from '../../hooks/useAuth';

export default function Post({ message, setRefresh }) {
	const [isToggled, setIsToggled] = React.useState(false);
	const [oldMessage, setOldMessage] = React.useState(message);
	const [liked, setLiked] = React.useState(false);
	const [updateLikes, setUpdateLikes] = React.useState(oldMessage.Likes.length);
	const authToken = localStorage.getItem('token') || {};
	const { auth } = useAuth();

	const handleDelete = async () => {
		const config = {
			headers: {
				Authorization: `Bearer ${authToken}`,
			},
		};
		try {
			const result = await axios.delete(
				`http://localhost:3000/api/message/${message.id}`,
				config
			);
			setRefresh((prev) => !prev);
			console.log(result);
		} catch (error) {
			console.log(error);
		}
	};

	React.useEffect(() => {
		const isLiked = () => {
			const likeArray = oldMessage.Likes;
			const likedId = likeArray.filter((like) => like.UserId === auth.user.id);
			if (likedId.length > 0) {
				return setLiked(true);
			}

			return setLiked(false);
		};
		isLiked();
	}, []);

	/* React.useEffect(() => {
		setUpdateLikes((prev) => prev + (liked ? 1 : -1));
		console.log(oldMessage.Likes.length);
	}, [liked]); */

	const handleLike = async () => {
		const config = {
			headers: {
				Authorization: `Bearer ${authToken}`,
			},
		};
		try {
			const result = await axios.post(
				`http://localhost:3000/api/message/${message.id}/like`,
				+1,
				config
			);

			setLiked((prev) => !prev);
			console.log(result);
		} catch (error) {
			console.log(error);
		} finally {
			setRefresh((prev) => !prev);
			setUpdateLikes((prev) => prev + (liked ? -1 : 1));
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
			console.log(oldMessage);
			setIsToggled(!isToggled);
		} catch (error) {
			console.log(error);
		}
	};

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
					user={oldMessage.User.firstName}
					picture={oldMessage.picture}
					alt={oldMessage.alt}
					likes={updateLikes}
					liked={liked}
					handleDelete={() => handleDelete(oldMessage.id)}
					handleClick={() => handleClick()}
					handleLike={() => handleLike(oldMessage.id)}
				/>
			)}
		</div>
	);
}

/* React.useEffect(() => {
	setLiked(window.localStorage.getItem('liked'));
}, []);

React.useEffect(() => {
	window.localStorage.setItem('liked', liked);
}, [liked]); */
