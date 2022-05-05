import axios from 'axios';

const ROOT_URL = 'https://expense-tracker-f2dc3-default-rtdb.asia-southeast1.firebasedatabase.app/';

export const storeExpense = async(expenseData) => {
	const response = await axios.post(ROOT_URL + 'expense.json', expenseData);

    const id = response.data.name;

    return  id;
};

export const fetchExpense = async () => {
	const response = await axios.get(ROOT_URL + 'expense.json');

	const expense = [];

	for (const key in response.data) {
		const expenseObj = {
			id: key,
			amount: response.data[key].amount,
			date: new Date(response.data[key].date),
			description: response.data[key].description
		};
		expense.push(expenseObj);
	}

    return expense;
};

export const updateExpense = (id, expenseData) => {
    return axios.put(
        ROOT_URL + `/expense/${id}.json`,
        expenseData
    );
}

export const deleteExpense = async(id) => {
    return axios.delete(
        ROOT_URL + `/expense/${id}.json`
    );
}