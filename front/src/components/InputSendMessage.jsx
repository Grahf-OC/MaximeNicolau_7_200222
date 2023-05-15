import React from 'react';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import { TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import useAuth from '../hooks/useAuth';

export default function InputSendMessage({ handleChange, post, errorText }) {
	const { auth } = useAuth();

	return (
		<Container sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
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
	);
}
