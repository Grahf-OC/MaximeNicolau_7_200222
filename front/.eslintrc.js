module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 'latest',
	},
	plugins: ['react', 'prettier'],
	rules: { 'react/prop-types': 0 },
};
