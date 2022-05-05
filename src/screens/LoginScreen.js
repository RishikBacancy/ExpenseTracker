import React, { useState, useContext } from 'react';
import { Alert } from 'react-native';
import AuthContent from '../components/Auth/AuthContent';
import { signInUser } from '../util/auth';
import LoadingOverlay from '../components/UI/LodingOverlay';
import { AuthContext } from '../store/authContext';

function LoginScreen() {
	const [ isAuthenticating, setIsAuthenticating ] = useState(false);

  const authCtx = useContext(AuthContext);
	const signInHandler = async ({ email, password }) => {
		setIsAuthenticating(true);

		try {
			const token = await signInUser(email, password);
      authCtx.authenticate(token);
		} catch (error) {
			Alert.alert('Authentication Failed!', 'Could not log you in ! Try again later!');
      setIsAuthenticating(false);
		}
	};

	if (isAuthenticating) {
		return <LoadingOverlay />;
	}

	return <AuthContent isLogin onAuthenticate={signInHandler} />;
}

export default LoginScreen;
