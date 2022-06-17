/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';

const Input = styled('input')({
	display: 'none',
});

export default function EditMessage({ onChange, body, handleEditSubmit }) {
	return (
		<Container>
			<div className="form-container">
				<Stack direction="row" alignItems="center" spacing={1}>
					<form>
						<label htmlFor="contained-button-file">
							<Input
								accept="image/*"
								id="contained-button-file"
								name="picture"
								type="file"
								onChange={onChange}
							/>
							<Button variant="contained" component="span">
								Upload
							</Button>
						</label>
						<label htmlFor="icon-button-file">
							<IconButton
								color="primary"
								aria-label="upload picture"
								component="span"
							>
								<PhotoCamera />
							</IconButton>
						</label>

						<input
							type="text"
							placeholder={body}
							className="form--input"
							name="body"
							onChange={onChange}
							value={body}
						/>
						<button type="button" onClick={handleEditSubmit}>
							Envoyer
						</button>
					</form>
				</Stack>
			</div>
		</Container>
	);
}
