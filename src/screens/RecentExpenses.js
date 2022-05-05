import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenseContext';
import { getDateMinusDays } from '../util/date';
import { fetchExpense } from '../util/http';

const RecentExpenses = () => {
	const expenseCtx = useContext(ExpensesContext);

	const [ fetchedExpenses, setFetchedExpenses ] = useState([]);

	useEffect(()=>{

		const getExpense = async() => {
			const expenses = await fetchExpense();
			expenseCtx.setExpense(expenses);
		};

		getExpense();

	}, [])

	const recentExpense = expenseCtx.expenses.filter((expense) => {
		const today = new Date();
		const date7Days = getDateMinusDays(today, 7);

		return (expense.date >= date7Days) && (expense.date <= today);
	})

	return <ExpensesOutput expenses={recentExpense} expensesPeriod={'Last 7 Days'} fallBackText="No Expense found in last 7 days!"/>;
};

const styles = StyleSheet.create({});

export default RecentExpenses;