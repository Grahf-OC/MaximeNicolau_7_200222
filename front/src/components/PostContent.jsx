import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { Button, CardActionArea, CardActions, IconButton } from '@mui/material';

export default function PostContent({
	id,
	body,
	user,
	isUser,
	picture,
	profile,
	alt,
	date,
	likes,
	liked,
	handleDelete,
	handleClick,
	handleLike,
}) {
	const [objectFitStyle, setObjectFitStyle] = React.useState('contain');

	const handleImageLoad = (event) => {
		const { naturalHeight, naturalWidth } = event.target;
		if (naturalHeight > naturalWidth) {
			setObjectFitStyle('contain');
		} else {
			setObjectFitStyle('cover');
		}
	};

	return (
		<Card sx={{ margin: 1, padding: 'auto' }}>
			<Link to={`/profil/${id}`} style={{ textDecoration: 'none' }}>
				<CardActionArea>
					<Stack
						direction="row"
						alignItems="center"
						justifyContent="flex-start"
					>
						<Avatar
							sx={{
								width: 55,
								height: 55,
								ml: 2,
								mb: 1,
								mt: 1,
							}}
							alt="Photo de profil"
							src={profile}
						/>

						<Typography
							gutterBottom
							variant="h6"
							size="10"
							component="div"
							sx={{ marginLeft: 2, color: '#1976d2' }}
						>
							{user}
						</Typography>

						<Typography
							gutterBottom
							variant="h6"
							size="10"
							component="div"
							color="#4E5166"
							sx={{ marginLeft: 2, fontSize: 14 }}
						>
							{date}
						</Typography>
					</Stack>

					{picture && (
						<CardMedia
							component="img"
							image={picture}
							alt={alt}
							onLoad={handleImageLoad}
							sx={{ maxHeight: 500, objectFit: objectFitStyle }}
						/>
					)}
					<CardContent sx={{ overflowWrap: 'anywhere' }}>
						<Typography variant="body2" color="text.secondary">
							{body}
						</Typography>
					</CardContent>
				</CardActionArea>
			</Link>
			<CardActions>
				<IconButton
					size="small"
					color={liked ? 'secondary' : 'primary'}
					onClick={handleLike}
				>
					<FavoriteIcon />
				</IconButton>
				<Typography variant="body2" color="text.secondary">
					{likes}
				</Typography>
				{isUser && (
					<>
						<IconButton size="small" color="primary" onClick={handleDelete}>
							<DeleteIcon />
						</IconButton>
						<Button size="small" color="primary" onClick={handleClick}>
							Edit
						</Button>
					</>
				)}
			</CardActions>
		</Card>
	);
}
