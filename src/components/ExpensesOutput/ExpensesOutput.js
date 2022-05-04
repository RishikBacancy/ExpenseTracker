import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { GlobalStyle } from '../../constants/styles';
import ExpenseList from './ExpensesList';
import ExpenseSummary from './ExpensesSummary';

const ExpensesOutput = ({ expenses, expensesPeriod, fallBackText }) => {
	let content = <Text style={styles.fallText}>{fallBackText}</Text>;

	if (expenses.length > 0) {
		content = <ExpenseList expense={expenses} />;
	}

	return (
		<View style={styles.container}>
			<ExpenseSummary expenses={expenses} periodName={expensesPeriod} />
			{content}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 24,
		paddingTop: 24,
		backgroundColor: GlobalStyle.colors.primary700,
		flex: 1
	},
    fallText:{
        color: "white",
		fontSize: 16,
		textAlign:"center",
		marginTop:32,
    }
});

export default ExpensesOutput;
