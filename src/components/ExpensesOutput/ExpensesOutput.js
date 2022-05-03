import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { GlobalStyle } from '../../constants/styles';
import ExpenseList from './ExpensesList';
import ExpenseSummary from './ExpensesSummary';

const DUMMY_EXP = [
    {
        id:"e1",
        description:"Buy a phone",
        amount: 72000.00,
        date: new Date("2022-01-01")
    },
    {
        id:"e2",
        description:"Buy a mac",
        amount: 152000.00,
        date: new Date("2022-01-05")
    },
    {
        id:"e3",
        description:"Buy a book",
        amount: 200.00,
        date: new Date("2022-02-19")
    },
    {
        id:"e4",
        description:"Buy a watch",
        amount: 5000.00,
        date: new Date("2022-03-20")
    },
    {
        id:"e5",
        description:"Buy a thumbs up",
        amount: 20.00,
        date: new Date("2022-03-22")
    },
    {
        id:"e6",
        description:"Buy a phone",
        amount: 72000.00,
        date: new Date("2022-01-01")
    },
    {
        id:"e7",
        description:"Buy a mac",
        amount: 152000.00,
        date: new Date("2022-01-05")
    },
    {
        id:"e8",
        description:"Buy a book",
        amount: 200.00,
        date: new Date("2022-02-19")
    },
    {
        id:"e9",
        description:"Buy a watch",
        amount: 5000.00,
        date: new Date("2022-03-20")
    },
    {
        id:"e10",
        description:"Buy a thumbs up",
        amount: 20.00,
        date: new Date("2022-03-22")
    }
];

const ExpensesOutput = ({ expenses, expensesPeriod}) => {
	return (
		<View style={styles.container}>
			<ExpenseSummary expenses={DUMMY_EXP} periodName={expensesPeriod} />
            <ExpenseList expense={DUMMY_EXP}/>
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