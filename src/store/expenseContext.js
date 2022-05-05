import React, { createContext, useReducer } from 'react';

export const ExpensesContext = createContext({
	expenses: [],
	addExpense: ({ description, amount, date }) => {},
	setExpense: (expense) => {},
	updateExpense: (id, { description, amount, date }) => {},
	deleteExpense: (id) => {}
});

const ExpenseReducer = (state, action) => {
	switch (action.type) {
		case 'ADD':
			return [ action.payload, ...state ];
		case 'SET':
			const inverted = action.payload.reverse();
			return inverted;
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
	const [ expenseState, dispatch ] = useReducer(ExpenseReducer, []);

	const addExpense = (expenseData) => {
		dispatch({ type: 'ADD', payload: expenseData });
	};

	const setExpense = (expense) => {
		dispatch({ type: 'SET', payload: expense });
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
		setExpense: setExpense,
		updateExpense: updateExpense,
		deleteExpense: deleteExpense
	};

	return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>;
};

export default ExpensesContextProvider;
