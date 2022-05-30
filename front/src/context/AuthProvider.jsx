/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */
import React from 'react';

const AuthContext = React.createContext({});

const usePersistentState = (defaultValue) => {
	const [auth, setAuth] = React.useState(() => {
		const persistentAuth = localStorage.getItem('auth');
		return persistentAuth !== null ? JSON.parse(persistentAuth) : defaultValue;
	});

	React.useEffect(() => {
		localStorage.setItem('auth', JSON.stringify(auth));
	}, ['auth', auth]);

	return [auth, setAuth];
};

export function AuthProvider({ children }) {
	const [auth, setAuth] = usePersistentState({});

	return (
		<AuthContext.Provider value={{ auth, setAuth }}>
			{children}
		</AuthContext.Provider>
	);
}

export default AuthContext;

/* 
import React from 'react';

const AuthContext = React.createContext({});

export function AuthProvider({ children }) {
	const [auth, setAuth] = React.useState({});

	return (
		<AuthContext.Provider value={{ auth, setAuth }}>
			{children}
		</AuthContext.Provider>
	);
}

export default AuthContext;
*/
