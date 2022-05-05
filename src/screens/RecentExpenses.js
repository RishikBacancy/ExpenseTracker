import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import ErrorOverlay from '../components/UI/ErrorOverlay';
import LoadingOverlay from '../components/UI/LodingOverlay';
import { AuthContext } from '../store/authContext';
import { ExpensesContext } from '../store/expenseContext';
import { getDateMinusDays } from '../util/date';
import { fetchExpense } from '../util/http';

const RecentExpenses = () => {
	const expenseCtx = useContext(ExpensesContext);

	const authCtx = useContext(AuthContext);

	const token = authCtx.token;

	const [ isFetching, setIsFetching ] = useState(true);
	const [ error, setError ] = useState();

	useEffect(() => {
		const getExpense = async () => {
			setIsFetching(true);
			try {
				const expenses = await fetchExpense(token);
				expenseCtx.setExpense(expenses);
			} catch (error) {
				setError('Could not fetch expense!');
			}
			setIsFetching(false);
		};

		getExpense();
	}, [token]);

	const errorHandler = () => {
		setError(null);
	};

	if(error && !isFetching) {
		return(
			<ErrorOverlay errorMsg={error} onConfirm={errorHandler}/>
		);
	}

	if (isFetching) {
		return <LoadingOverlay />;
	}

	const recentExpense = expenseCtx.expenses.filter((expense) => {
		const today = new Date();
		const date7Days = getDateMinusDays(today, 7);

		return expense.date >= date7Days && expense.date <= today;
	});

	return (
		<ExpensesOutput
			expenses={recentExpense}
			expensesPeriod={'Last 7 Days'}
			fallBackText="No Expense found in last 7 days!"
		/>
	);
};

const styles = StyleSheet.create({});

export default RecentExpenses;
