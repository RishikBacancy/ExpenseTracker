import React, { createContext, useReducer } from 'react';

export const ExpensesContext = createContext({
	expenses: [],
	addExpense: ({ description, amount, date }) => {},
	updateExpense: (id, { description, amount, date }) => {},
	deleteExpense: (id) => {}
});

const DUMMY_EXP = [
	{
		id: 'e1',
		description: 'Buy a phone',
		amount: 72000.0,
		date: new Date('2022-01-01')
	},
	{
		id: 'e2',
		description: 'Buy a mac',
		amount: 152000.0,
		date: new Date('2022-01-05')
	},
	{
		id: 'e3',
		description: 'Buy a book',
		amount: 200.0,
		date: new Date('2022-02-19')
	},
	{
		id: 'e4',
		description: 'Buy a watch',
		amount: 5000.0,
		date: new Date('2022-03-20')
	},
	{
		id: 'e5',
		description: 'Buy a thumbs up',
		amount: 20.0,
		date: new Date('2022-03-22')
	},
	{
		id: 'e6',
		description: 'Buy a phone',
		amount: 72000.0,
		date: new Date('2022-05-01')
	},
	{
		id: 'e7',
		description: 'Buy a mac',
		amount: 152000.0,
		date: new Date('2022-05-05')
	},
	{
		id: 'e8',
		description: 'Buy a book',
		amount: 200.0,
		date: new Date('2022-02-19')
	},
	{
		id: 'e9',
		description: 'Buy a watch',
		amount: 5000.0,
		date: new Date('2022-03-20')
	},
	{
		id: 'e10',
		description: 'Buy a thumbs up',
		amount: 20.0,
		date: new Date('2022-03-22')
	}
];

const ExpenseReducer = (state, action) => {
	switch (action.type) {
		case 'ADD':
			const id = new Date().toString() + Math.random().toString();
			return [ { ...action.payload, id: id }, ...state ];
		case 'UPDATE':
			const updateId = state.findIndex((expense) => expense.id === action.payload.id);

			const updatableExpense = state[updateId];

			const updatedData = { ...updatableExpense, ...action.payload.data };
			const updatedExpense = [ ...state ];

			updatedExpense[updateId] = updatedData;
			return updatedExpense;
		case 'DELETE':
			return state.filter((expense) => expense.id !== action.payload);
		default:
			return state;
	}
};

const ExpensesContextProvider = ({ children }) => {
	const [ expenseState, dispatch ] = useReducer(ExpenseReducer, DUMMY_EXP);

	const addExpense = (expenseData) => {
		dispatch({ type: 'ADD', payload: expenseData });
	};

	const updateExpense = (id, expenseData) => {
		dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData } });
	};

	const deleteExpense = (id) => {
		dispatch({ type: 'DELETE', payload: id });
	};

	const value = {
		expenses: expenseState,
		addExpense: addExpense,
		updateExpense: updateExpense,
		deleteExpense: deleteExpense
	};

	return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>;
};

export default ExpensesContextProvider;
