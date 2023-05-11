/* eslint-disable react/prop-types */
import React from 'react';
import Button from '@mui/material/Button';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

export default function UploadEditImageButton({ handleChange }) {
	return (
		<Button
			color="primary"
			variant="contained"
			sx={{ width: '15%', mr: 1, mt: 1 }}
			component="label"
			htmlFor="edit-image"
			startIcon={<PhotoCamera />}
		>
			<input
				hidden
				accept="image/*"
				type="file"
				id="edit-image"
				name="picture"
				onChange={(e) => handleChange(e)}
			/>
			Image
		</Button>
	);
}
