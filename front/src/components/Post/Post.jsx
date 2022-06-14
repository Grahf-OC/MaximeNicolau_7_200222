/* eslint-disable react/prop-types */
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, CardActionArea, CardActions } from '@mui/material';

export default function Post({ body, user, picture, alt }) {
	return (
		<Card sx={{ maxWidth: 845 }}>
			<CardActionArea>
				{picture && (
					<CardMedia component="img" height="140" image={picture} alt={alt} />
				)}
				<CardContent>
					<Typography gutterBottom variant="h6" size="10" component="div">
						{user}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{body}
					</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions>
				<Button size="small" color="primary">
					<FavoriteIcon />
				</Button>
				<Button size="small" color="primary">
					<DeleteIcon />
				</Button>
				<Button size="small" color="primary">
					Edit
				</Button>
			</CardActions>
		</Card>
	);
}
