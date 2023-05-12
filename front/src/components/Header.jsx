/* eslint-disable react/no-unescaped-entities */

import * as React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import { Toolbar } from '@mui/material';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import Avatar from '@mui/material/Avatar';
import Switch from '@mui/material/Switch';
import useAuth from '../hooks/useAuth';
import ColorModeContext from '../context/ColorModeContext';

export default function Sidebar() {
	const { setAuth, auth } = useAuth();
	const logout = () => {
		setAuth({});
		localStorage.clear();
	};
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.up('lg'));
	const { colorMode, checked } = React.useContext(ColorModeContext);

	return (
		<Box>
			{matches ? (
				<Stack
					sx={{
						position: 'fixed',

						width: {
							xs: '100%',
							sm: '80%',
							md: '15%',
							lg: '15%',
							xl: '15%',
						},
						margin: 2,
						padding: 2,
					}}
				>
					<List>
						<ListItem key="accueil">
							<ListItemButton component={Link} to="/">
								<ListItemIcon>
									<HomeIcon sx={{ color: '#1976d2' }} />
								</ListItemIcon>
								<ListItemText primary="Accueil" />
							</ListItemButton>
						</ListItem>
						<ListItem key="liste des membres">
							<ListItemButton component={Link} to="/membres">
								<ListItemIcon>
									<GroupsIcon sx={{ color: '#1976d2' }} />
								</ListItemIcon>
								<ListItemText primary="Liste des membres" />
							</ListItemButton>
						</ListItem>
						{auth.token && (
							<ListItem key="profil">
								<ListItemButton component={Link} to={`/profil/${auth.user.id}`}>
									<ListItemIcon>
										<AccountCircleIcon sx={{ color: '#1976d2' }} />
									</ListItemIcon>
									<ListItemText primary="Profil" />
								</ListItemButton>
							</ListItem>
						)}
						<ListItem key="logout">
							<ListItemButton onClick={logout}>
								<ListItemIcon>
									<LogoutIcon sx={{ color: '#1976d2' }} />
								</ListItemIcon>
								<ListItemText primary="Se déconnecter" />
							</ListItemButton>
						</ListItem>
						<ListItem key="nightMode">
							<ListItemButton>
								<ListItemIcon>
									<ModeNightIcon sx={{ color: '#1976d2' }} />
								</ListItemIcon>
								<Switch onClick={colorMode.toggleColorMode} checked={checked} />
							</ListItemButton>
						</ListItem>
					</List>
				</Stack>
			) : (
				<AppBar>
					<Toolbar sx={{ justifyContent: 'center' }}>
						<ListItemButton component={Link} to="/" title="Page d'accueil">
							<HomeIcon />
						</ListItemButton>

						<ListItemButton component={Link} to="/membres" title="Membres">
							<GroupsIcon />
						</ListItemButton>

						{auth.token && (
							<ListItemButton
								component={Link}
								to={`/profil/${auth.user.id}`}
								title="Profil"
							>
								<Avatar
									sx={{ width: 30, height: 30, marginLeft: 1 }}
									alt="Photo de profil"
									src={auth.user.picture}
								/>
							</ListItemButton>
						)}

						<ListItemButton onClick={logout} title="Se déconnecter">
							<LogoutIcon />
						</ListItemButton>

						<ListItemButton title="Thème clair ou sombre">
							<ModeNightIcon />
							<Switch onClick={colorMode.toggleColorMode} checked={checked} />
						</ListItemButton>
					</Toolbar>
				</AppBar>
			)}
		</Box>
	);
}
