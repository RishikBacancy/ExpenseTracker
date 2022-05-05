import React, { useState, useContext } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/UI/LodingOverlay';
import { AuthContext } from '../store/authContext';
import { createUser } from '../util/auth';

const SignupScreen = () => {
	const [ isAuthenticating, setIsAuthenticating ] = useState(false);

	const authCtx = useContext(AuthContext);

	const signupHandler = async ({ email, password }) => {
		setIsAuthenticating(true);
		try {
			const token = await createUser(email, password);
			authCtx.authenticate(token);
		} catch (error) {
			Alert.alert('Authentication Failed!', 'Could not create user ! Try again later!');
			setIsAuthenticating(false);
		}
	};

	if (isAuthenticating) {
		return <LoadingOverlay />;
	}

	return <AuthContent onAuthenticate={signupHandler} />;
};

export default SignupScreen;
