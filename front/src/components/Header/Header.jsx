/* eslint-disable react/no-unescaped-entities */

import * as React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import Switch from '@mui/material/Switch';
import useAuth from '../../hooks/useAuth';

export default function Sidebar() {
	const { setAuth, auth } = useAuth();
	const logout = () => {
		setAuth({});
		localStorage.clear();
	};

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />

			<List sx={{ margin: 3 }}>
				<ListItem key="accueil">
					<ListItemButton component={Link} to="/">
						<ListItemIcon>
							<HomeIcon />
						</ListItemIcon>
						<ListItemText primary="Accueil" />
					</ListItemButton>
				</ListItem>
				<ListItem key="liste des membres">
					<ListItemButton component={Link} to="/membres">
						<ListItemIcon>
							<GroupsIcon />
						</ListItemIcon>
						<ListItemText primary="Liste des membres" />
					</ListItemButton>
				</ListItem>
				{auth.token && (
					<ListItem key="profil">
						<ListItemButton component={Link} to={`/profil/${auth.user.id}`}>
							<ListItemIcon>
								<AccountCircleIcon />
							</ListItemIcon>
							<ListItemText primary="Profil" />
						</ListItemButton>
					</ListItem>
				)}
				<ListItem key="logout">
					<ListItemButton onClick={logout}>
						<ListItemIcon>
							<LogoutIcon />
						</ListItemIcon>
						<ListItemText primary="Se déconnecter" />
					</ListItemButton>
				</ListItem>
				<ListItem key="nightMode">
					<ListItemButton>
						<ListItemIcon>
							<ModeNightIcon />
						</ListItemIcon>
						<Switch />
					</ListItemButton>
				</ListItem>
			</List>
		</Box>
	);
}

/* import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

export default function Header() {
	const { setAuth, auth } = useAuth();
	const logout = () => {
		setAuth(null);
		localStorage.clear();
	};

	return (
		<nav>
			{auth?.token ? (
				<>
					<Link to="/">Accueil</Link>
					<Link to="/membres">Liste des membres</Link>
					<Link to={`/profil/${auth.user.id}`}>Profil</Link>
					<button className="form--submit" type="button" onClick={logout}>
						Logout
					</button>
				</>
			) : (
				<>
					<Link to="/signup">S'inscrire</Link>
					<Link to="/login">Login</Link>
				</>
			)}
		</nav>
	);
} */
