/* eslint-disable no-console */
import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Axios from 'axios';
import Home from './pages/Home';
import Form from './pages/Form';
import Profil from './pages/Profil';
import Header from './components/Header';

/* Axios.defaults.headers.post['Content-Type'] = 'application/json';
Axios.defaults.headers.common.Authorization = 'AUTH TOKEN';

Axios.interceptors.request.use(
	(request) => {
		console.log(request);
		// Edit request config
		return request;
	},
	(error) => {
		console.log(error);
		return Promise.reject(error);
	}
);

Axios.interceptors.response.use(
	(response) => {
		console.log(response);
		// Edit response config
		return response;
	},
	(error) => {
		console.log(error);
		return Promise.reject(error);
	}
); */

const container = document.getElementById('root');

const root = createRoot(container);
root.render(
	<BrowserRouter>
		<Header />
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/Form" element={<Form />} />
			<Route path="/Profil" element={<Profil />} />
		</Routes>
	</BrowserRouter>
);
