/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

export default function EditMessage({
	onChange,
	body,
	handleEditSubmit,
	errorText,
}) {
	return (
		<Box component="form" sx={{ marginTop: 15 }}>
			<Container>
				<FormControl fullWidth>
					<TextField
						placeholder={body}
						name="body"
						onChange={onChange}
						value={body}
						variant="filled"
						helperText={errorText}
						multiline
						error={errorText !== ''}
					/>

					<Button type="button" variant="contained" onClick={handleEditSubmit}>
						Envoyer
					</Button>
					<Button
						color="primary"
						aria-label="upload picture"
						component="label"
						startIcon={<PhotoCamera />}
					>
						<input
							hidden
							accept="image/*"
							type="file"
							name="picture"
							onChange={onChange}
						/>
						Image
					</Button>
				</FormControl>
			</Container>
		</Box>
	);
}
