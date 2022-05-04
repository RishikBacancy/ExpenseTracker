import React, {useContext} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenseContext';

const AllExpenses = () => {

	const expensesCtx = useContext(ExpensesContext);

	return <ExpensesOutput expenses={expensesCtx.expenses} expensesPeriod={'Total'} fallBackText="No Expense found!"/>;
};

const styles = StyleSheet.create({});

export default AllExpenses;
