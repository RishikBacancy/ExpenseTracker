import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { GlobalStyle } from '../../constants/styles';
import ExpenseList from './ExpensesList';
import ExpenseSummary from './ExpensesSummary';

const ExpensesOutput = ({ expenses, expensesPeriod}) => {
	return (
		<View style={styles.container}>
			<ExpenseSummary expenses={expenses} periodName={expensesPeriod} />
            <ExpenseList expense={expenses}/>
		</View>
	);
};

const styles = StyleSheet.create({
    container:{
        paddingHorizontal:24,
        paddingTop:24,
        backgroundColor:GlobalStyle.colors.primary700,
        flex:1,
    }
})

export default ExpensesOutput;