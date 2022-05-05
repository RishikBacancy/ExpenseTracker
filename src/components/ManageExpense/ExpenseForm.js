import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Input from './Input';
import Button from '../UI/Button';
import { GlobalStyle } from '../../constants/styles';

const ExpenseForm = ({ onCancel, onSubmit, submitLabel, defaultValue }) => {
	const [ inputs, setInputs ] = useState({
		amount: { value: defaultValue ? defaultValue.amount.toString() : '', isValid: true },
		date: { value: defaultValue ? defaultValue.date.toISOString().slice(0, 10) : '', isValid: true },
		description: { value: defaultValue ? defaultValue.description : '', isValid: true }
	});

	const inputHandler = (inputIdentifier, enteredValue) => {
		setInputs((currentInputs) => {
			return {
				...currentInputs,
				[inputIdentifier]: { value: enteredValue, isValid: true }
			};
		});
	};

	const submitHandelr = () => {
		const expenseData = {
			amount: +inputs.amount.value,
			date: new Date(inputs.date.value),
			description: inputs.description.value
		};

		const amountValid = expenseData.amount > 0 && !isNaN(expenseData.amount);
		const dateValid = expenseData.date.toString() !== 'Invalid Date';
		const descriptionValid = expenseData.description.trim().length > 0;

		if (!amountValid || !dateValid || !descriptionValid) {
			//Alert.alert('Invalid input', 'Please check your input values');
			setInputs((curInputs) => {
				return {
					amount: { value: curInputs.amount.value, isValid: amountValid },
					date: { value: curInputs.date.value, isValid: dateValid },
					description: { value: curInputs.description.value, isValid: descriptionValid }
				};
			});
			return;
		}

		onSubmit(expenseData);
	};

	const formIsInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid

	return (
		<View style={styles.form}>
			<Text style={styles.title}>Your Expense</Text>
			<View style={styles.inputRow}>
				<Input
					style={styles.rowInput}
					label={'Amount'}
					invalid={!inputs.amount.isValid}
					textInputConfig={{
						keyboardType: 'decimal-pad',
						onChangeText: inputHandler.bind(this, 'amount'),
						value: inputs.amount.value
					}}
				/>
				<Input
					style={styles.rowInput}
					label={'Date'}
					invalid={!inputs.date.isValid}
					textInputConfig={{
						placeholder: 'YYYY-MM-DD',
						maxLength: 10,
						onChangeText: inputHandler.bind(this, 'date'),
						value: inputs.date.value
					}}
				/>
			</View>
			<Input
				label={'Description'}
				invalid={!inputs.description.isValid}
				textInputConfig={{
					multiline: true,
					autoCapitalize: 'none',
					onChangeText: inputHandler.bind(this, 'description'),
					value: inputs.description.value
				}}
			/>
			{ formIsInvalid && <Text style={styles.errorTxt}>
					Invalid Values - Please check your entered data</Text>}
			<View style={styles.btnContainer}>
				<Button style={styles.btn} mode="flat" onPress={onCancel}>
					Cancel
				</Button>
				<Button style={styles.btn} onPress={submitHandelr}>
					{submitLabel}
				</Button>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	inputRow: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	rowInput: {
		flex: 1
	},
	form: {
		marginTop: 40
	},
	title: {
		fontWeight: 'bold',
		fontSize: 24,
		textAlign: 'center',
		marginVertical: 24,
		color: 'white'
	},
	btnContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	btn: {
		minWidth: 120,
		marginHorizontal: 8
	},
	errorTxt:{
		textAlign:"center",
		color: GlobalStyle.colors.error500,
		margin: 8,
	}
});

export default ExpenseForm;