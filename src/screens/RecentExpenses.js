import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import LoadingOverlay from '../components/UI/LodingOverlay';
import { ExpensesContext } from '../store/expenseContext';
import { getDateMinusDays } from '../util/date';
import { fetchExpense } from '../util/http';

const RecentExpenses = () => {
	const expenseCtx = useContext(ExpensesContext);

	const [ isFetching, setIsFetching ] = useState(true);

	useEffect(()=>{

		const getExpense = async() => {
			setIsFetching(true);
			const expenses = await fetchExpense();
			setIsFetching(false);
			expenseCtx.setExpense(expenses);
		};

		getExpense();

	}, [])

	if(isFetching) {
		return(
			<LoadingOverlay/>
		)
	}

	const recentExpense = expenseCtx.expenses.filter((expense) => {
		const today = new Date();
		const date7Days = getDateMinusDays(today, 7);

		return (expense.date >= date7Days) && (expense.date <= today);
	})

	return <ExpensesOutput expenses={recentExpense} expensesPeriod={'Last 7 Days'} fallBackText="No Expense found in last 7 days!"/>;
};

const styles = StyleSheet.create({});

export default RecentExpenses;