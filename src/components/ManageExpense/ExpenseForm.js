import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Input from './Input';
import Button from "../UI/Button"

const ExpenseForm = ({onCancel, onSubmit, submitLabel, defaultValue}) => {
	const [ inputValue, setInputValue ] = useState({
		amount: defaultValue ? defaultValue.amount.toString() : '',
		date: defaultValue ? defaultValue.date.toISOString().slice(0,10) :'',
		description: defaultValue ? defaultValue.description :''
	});

	const inputHandler = (inputIdentifier, enteredValue) => {
		setInputValue((currentInputValue) => {
			return {
				...currentInputValue,
				[inputIdentifier]: enteredValue
			};
		});
	};

    const submitHandelr = () => {
        const expenseData = {
            amount: +inputValue.amount,
            date: new Date(inputValue.date),
            description: inputValue.description
        }

        const amountValid = expenseData.amount > 0 && !isNaN(expenseData.amount);
        const dateValid = expenseData.date.toString() !== "Invalid Date";
        const descriptionValid = expenseData.description.trim().length > 0;

        if(!amountValid || !dateValid || !descriptionValid) {
            Alert.alert("Invalid input","Please check your input values");
            return;
        }

        onSubmit(expenseData);
    };

	return (
		<View style={styles.form}>
			<Text style={styles.title}>Your Expense</Text>
			<View style={styles.inputRow}>
				<Input
					style={styles.rowInput}
					label={'Amount'}
					textInputConfig={{
						keyboardType: 'decimal-pad',
						onChangeText: inputHandler.bind(this, "amount"),
                        value: inputValue.amount,
					}}
				/>
				<Input
					style={styles.rowInput}
					label={'Date'}
					textInputConfig={{
						placeholder: 'YYYY-MM-DD',
						maxLength: 10,
						onChangeText: inputHandler.bind(this, "date"),
                        value: inputValue.date,
					}}
				/>
			</View>
			<Input
				label={'Description'}
				textInputConfig={{
					multiline: true,
					autoCapitalize: 'none',
                    onChangeText: inputHandler.bind(this, "description"),
                    value: inputValue.description,
				}}
			/>
            <View style={styles.btnContainer}>
                <Button style={styles.btn} mode="flat" onPress={onCancel} >Cancel</Button>
                <Button style={styles.btn} onPress={submitHandelr} >{submitLabel}</Button>
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
    btnContainer:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
    },
    btn:{
        minWidth:120,
        marginHorizontal:8,
    }
});

export default ExpenseForm;