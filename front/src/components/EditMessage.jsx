/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Container from '@mui/material/Container';
// import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';

export default function EditMessage({ onChange, body, handleEditSubmit }) {
	return (
		<Container>
			<Stack direction="row" alignItems="center" spacing={1}>
				<FormControl>
					<IconButton
						color="primary"
						aria-label="upload picture"
						component="label"
					>
						<input
							hidden
							accept="image/*"
							type="file"
							name="picture"
							onChange={onChange}
						/>
						<PhotoCamera />
					</IconButton>

					<TextField
						placeholder={body}
						name="body"
						onChange={onChange}
						value={body}
					/>

					<Button type="button" variant="contained" onClick={handleEditSubmit}>
						Envoyer
					</Button>
				</FormControl>
			</Stack>
		</Container>
	);
}
