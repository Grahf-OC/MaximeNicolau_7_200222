/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { OutlinedInput } from '@mui/material';

export default function EditPw({
	password,
	newPw,
	confirmNewPw,
	setPassword,
	setNewPw,
	setConfirmNewPw,
	cancel,
	wrongPasswords,
	incorrectPassword,
	setIncorrectPassword,
	setWrongPasswords,
	isInputValid,
}) {
	return (
		<Box sx={{ marginTop: '100' }}>
			<Container
				sx={{
					width: {
						xs: '92%',
						sm: '70%',
						md: '70%',
						lg: '50%',
						xl: '40%',
					},
				}}
			>
				<Container>
					<FormControl fullWidth>
						<Typography
							gutterBottom
							variant="h6"
							size="10"
							component="div"
							sx={{ marginLeft: 2, fontsize: 10 }}
						>
							Ancien mot de passe
						</Typography>
						<OutlinedInput
							type="password"
							placeholder="Ancien mot de passe"
							name="password"
							onChange={(e) => {
								setPassword(e.target.value);
								setIncorrectPassword('');
								setWrongPasswords('');
							}}
							value={password}
						/>

						<p className="error">{incorrectPassword}</p>

						<Typography
							gutterBottom
							variant="h6"
							size="10"
							component="div"
							sx={{ marginLeft: 2, fontsize: 10 }}
						>
							Nouveau mot de passe
						</Typography>
						<OutlinedInput
							type="password"
							placeholder="Nouveau mot de passe"
							name="newPw"
							onChange={(e) => {
								setNewPw(e.target.value);
								setIncorrectPassword('');
								setWrongPasswords('');
								isInputValid(
									/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
									e.target.value
								);
							}}
							value={newPw}
						/>
						<p className="error">{wrongPasswords}</p>

						<Typography
							gutterBottom
							variant="h6"
							size="10"
							component="div"
							sx={{ marginLeft: 2, fontsize: 10 }}
						>
							Confirmer le nouveau mot de passe
						</Typography>
						<OutlinedInput
							type="password"
							placeholder="Confirmer mot de passe"
							name="confirmNewPw"
							onChange={(e) => {
								setConfirmNewPw(e.target.value);
								setIncorrectPassword('');
								setWrongPasswords('');
							}}
							value={confirmNewPw}
						/>
					</FormControl>
				</Container>
				<Button
					sx={{
						width: '100%',
						marginRight: '4px',
						backgroundColor: '#CB8EC8',
						marginTop: 2,
					}}
					variant="contained"
					onClick={() => {
						setPassword('');
						setNewPw('');
						setConfirmNewPw('');
						cancel();
					}}
				>
					Annuler
				</Button>
			</Container>
		</Box>
	);
}
