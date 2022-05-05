import React, {useContext, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenseContext';
import axios from 'axios';
import { AuthContext } from '../store/authContext';

const AllExpenses = () => {

	const authCtx = useContext(AuthContext);

	const token = authCtx.token;

	useEffect(()=>{
		axios.get("https://expense-tracker-f2dc3-default-rtdb.asia-southeast1.firebasedatabase.app/message.json?auth=" + token)
		.then((response) => {
			console.log(response.data)
		});
	},[])

	const expensesCtx = useContext(ExpensesContext);

	return <ExpensesOutput expenses={expensesCtx.expenses} expensesPeriod={'Total'} fallBackText="No Expense found!"/>;
};

const styles = StyleSheet.create({});

export default AllExpenses;