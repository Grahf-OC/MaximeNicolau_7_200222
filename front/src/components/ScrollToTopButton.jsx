import React, { useState, useEffect } from 'react';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function ScrollToTopButton() {
	const [backToTopButton, setBackToTopButton] = useState(false);

	useEffect(() => {
		window.addEventListener('scroll', () => {
			if (window.scrollY > 200) {
				setBackToTopButton(true);
			} else {
				setBackToTopButton(false);
			}
		});
	}, []);

	function scrollUp() {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	}

	return (
		<div>
			{backToTopButton && (
				<Fab
					title="Haut de page"
					aria-label="Scroll to top"
					size="large"
					color="primary"
					sx={{
						position: 'fixed',
						borderRadius: '100%',
						right: 50,
						bottom: 50,
					}}
					onClick={() => scrollUp()}
				>
					<KeyboardArrowUpIcon sx={{ fontSize: 40 }} />
				</Fab>
			)}
		</div>
	);
}
