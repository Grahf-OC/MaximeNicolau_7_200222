/* eslint-disable react/no-unescaped-entities */

import * as React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
// import useAuth from '../../hooks/useAuth';

const drawerWidth = 240;

export default function PermanentDrawerLeft() {
	/* const { setAuth, auth } = useAuth();
	const logout = () => {
		setAuth(null);
		localStorage.clear();
	}; */

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<AppBar
				position="fixed"
				sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
			/>

			<Drawer
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					'& .MuiDrawer-paper': {
						width: drawerWidth,
						boxSizing: 'border-box',
					},
				}}
				variant="permanent"
				anchor="left"
			>
				<Toolbar />
				<Divider />
				<List>
					<ListItem key="accueil" disablePadding>
						<ListItemButton component={Link} to="/">
							<ListItemText primary="Accueil" />
						</ListItemButton>
					</ListItem>
					<ListItem key="liste des membres" disablePadding>
						<ListItemButton component={Link} to="/membres">
							<ListItemText primary="Liste des membres" />
						</ListItemButton>
					</ListItem>
					{/*	<ListItem key="profil" disablePadding>
						<ListItemButton component={Link} to={`/profil/${auth.user.id}`}>
							<ListItemText primary="Profil" />
						</ListItemButton>
					</ListItem> */}
					<ListItem key="logout" disablePadding>
						<ListItemButton>
							<ListItemText primary="Se déconnecter" />
						</ListItemButton>
					</ListItem>
				</List>
				<Divider />
			</Drawer>
			<Box
				component="main"
				sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
			>
				<Toolbar />
			</Box>
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
