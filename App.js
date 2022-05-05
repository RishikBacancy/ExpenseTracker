import React from 'react';
import Navigation from './src/navigation/Navigation';
import AuthContextProvider from './src/store/authContext';
import ExpensesContextProvider from './src/store/expenseContext';

const App = () => {
	return (
		<AuthContextProvider>
			<ExpensesContextProvider>
				<Navigation />
			</ExpensesContextProvider>
		</AuthContextProvider>
	);
};

export default App;
