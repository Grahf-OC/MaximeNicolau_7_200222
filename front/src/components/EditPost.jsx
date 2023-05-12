/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-console */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import UploadEditImageButton from './Buttons/UploadEditImageButton';

export default function EditPost({
	handleChange,
	body,
	handleEditSubmit,
	errorText,
}) {
	return (
		<Box component="form" sx={{ marginTop: 15 }}>
			<Container>
				<FormControl fullWidth>
					<InputLabel htmlFor="edit-message" />
					<TextField
						multiline
						name="body"
						id="edit-message"
						placeholder={body}
						onChange={(e) => handleChange(e)}
						value={body}
						variant="filled"
						helperText={errorText}
						error={errorText !== ''}
					/>
					<Stack direction="row" justifyContent="center">
						<UploadEditImageButton handleChange={handleChange} />
						<InputLabel htmlFor="send-edited-message" />
						<Button
							color="primary"
							variant="contained"
							id="send-edited-message"
							onClick={() => handleEditSubmit()}
							sx={{ width: '15%', mr: 1, mt: 1 }}
						>
							Publier
						</Button>
					</Stack>
				</FormControl>
			</Container>
		</Box>
	);
}
