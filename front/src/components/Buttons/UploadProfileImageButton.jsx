import React from 'react';
import Button from '@mui/material/Button';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

export default function UploadProfileImageButton({ handleChange }) {
	return (
		<Button
			sx={{ width: '15%', mr: 1, mb: 2 }}
			color="primary"
			variant="contained"
			component="label"
			htmlFor="Profile-picture"
			startIcon={<PhotoCamera />}
		>
			<input
				hidden
				accept="image/*"
				id="Profile-picture"
				type="file"
				name="picture"
				onChange={(e) => handleChange(e)}
			/>
			Photo
		</Button>
	);
}
