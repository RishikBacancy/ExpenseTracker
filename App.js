import React, { useContext, useEffect } from 'react';
import Navigation from './src/navigation/Navigation';
import AuthContextProvider, { AuthContext } from './src/store/authContext';
import ExpensesContextProvider from './src/store/expenseContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Root = () => {

    const  authCtx = useContext(AuthContext);

    useEffect(()=>{
        const fetchToken = async() => {
            const storedToken =  await AsyncStorage.getItem("token");

            if(storedToken){
                authCtx.authenticate(storedToken);
            }
        }

        fetchToken();
    },[])

    return <Navigation/>
}

const App = () => {
	return (
		<AuthContextProvider>
			<ExpensesContextProvider>
				<Root/>
			</ExpensesContextProvider>
		</AuthContextProvider>
	);
};

export default App;
