/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, CardActionArea, CardActions } from '@mui/material';

export default function DisplayPosts({
	id,
	body,
	user,
	picture,
	alt,
	handleDelete,
	handleClick,
}) {
	return (
		<div>
			<Card sx={{ maxWidth: 845, objectFit: 'cover' }}>
				<Link to={`/message/${id}`}>
					<CardActionArea>
						{picture && (
							<CardMedia
								component="img"
								height="140"
								image={picture}
								alt={alt}
							/>
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
				</Link>
				<CardActions>
					<Button size="small" color="primary">
						<FavoriteIcon />
					</Button>
					<Button size="small" color="primary" onClick={handleDelete}>
						<DeleteIcon />
					</Button>
					<Button size="small" color="primary" onClick={handleClick}>
						Edit
					</Button>
				</CardActions>
			</Card>
		</div>
	);
}
