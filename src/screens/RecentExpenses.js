import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenseContext';
import { getDateMinusDays } from '../util/date';

const RecentExpenses = () => {
	const expenseCtx = useContext(ExpensesContext);

	const recentExpense = expenseCtx.expenses.filter((expense) => {
		const today = new Date();
		const date7Days = getDateMinusDays(today, 7);

		return (expense.date >= date7Days) && (expense.date <= today);
	})

	return <ExpensesOutput expenses={recentExpense} expensesPeriod={'Last 7 Days'} />;
};

const styles = StyleSheet.create({});

export default RecentExpenses;