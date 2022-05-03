import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GlobalStyle } from '../../constants/styles';

const ExpenseSummary = ({ expenses, periodName }) => {
	const expensesSum = expenses.reduce((sum, expense) => {
		return sum + expense.amount;
	}, 0);

	return (
		<View style={styles.container}>
			<Text style={styles.period}>{periodName}</Text>
			<Text style={styles.sum}>{expensesSum.toFixed(2)} ₹</Text>
		</View>
	);
};

const styles = StyleSheet.create({
    container:{
        padding: 8,
        backgroundColor: GlobalStyle.colors.primary50,
        borderRadius: 7,
        flexDirection:"row",
        justifyContent: "space-between",
        alignItems:"center",
    },
    period:{
        fontSize:12,
        color: GlobalStyle.colors.primary400,
    },
    sum:{
        fontSize:16,
        fontWeight:"bold",
        color: GlobalStyle.colors.primary500,
    }
});

export default ExpenseSummary;