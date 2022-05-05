import axios from 'axios';

const API_KEY = "AIzaSyDIbupShGEpVLzeqXp90hKI_YxzONt5twI";

const createUser = () => {
	axios.post(
		'https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=' + API_KEY
	);
};