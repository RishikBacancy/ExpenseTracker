import axios from 'axios';

const API_KEY = "AIzaSyDIbupShGEpVLzeqXp90hKI_YxzONt5twI";

const authentication = async(mode,email, password) => {

    const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

    const response = await axios.post(
		url,
        {
            email: email,
            password: password,
            returnSecureToken: true
        }
	);

    const token = response.data.idToken;

    return token;
}

export const createUser = ( email, password) => {
	return authentication("signUp",email,password);
};

export const signInUser = ( email, password) => {
    return authentication("signInWithPassword", email, password);
};