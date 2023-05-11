/* eslint-disable react/prop-types */
import React from 'react';
import Button from '@mui/material/Button';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

export default function UploadMessageImageButton({ handleChange }) {
	return (
		<Button
			sx={{ width: '15%', mr: 1 }}
			color="primary"
			variant="contained"
			component="label"
			htmlFor="upload-image"
			startIcon={<PhotoCamera />}
		>
			<input
				hidden
				accept="image/*"
				id="upload-image"
				type="file"
				name="picture"
				onChange={(e) => handleChange(e)}
			/>
			Image
		</Button>
	);
}
