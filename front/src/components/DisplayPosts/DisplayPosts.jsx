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
	date,
	likes,
	liked,
	handleDelete,
	handleClick,
	handleLike,
}) {
	return (
		<div>
			<Card sx={{ maxWidth: 845, objectFit: 'cover', margin: 2 }}>
				<Link to={`/message/${id}`} style={{ textDecoration: 'none' }}>
					<CardActionArea>
						<Typography
							gutterBottom
							variant="h6"
							size="10"
							component="div"
							sx={{ marginLeft: 2 }}
						>
							{user}
						</Typography>

						<Typography
							gutterBottom
							variant="h6"
							size="10"
							component="div"
							sx={{ marginLeft: 2, fontSize: 16 }}
						>
							{date}
						</Typography>

						{picture && (
							<CardMedia
								component="img"
								height="140"
								image={picture}
								alt={alt}
							/>
						)}
						<CardContent>
							<Typography variant="body2" color="text.secondary">
								{body}
							</Typography>
						</CardContent>
					</CardActionArea>
				</Link>
				<CardActions>
					<Button
						size="small"
						color={liked ? 'secondary' : 'primary'}
						onClick={handleLike}
					>
						<FavoriteIcon />
					</Button>
					<Typography variant="body2" color="text.secondary">
						{likes}
					</Typography>
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
