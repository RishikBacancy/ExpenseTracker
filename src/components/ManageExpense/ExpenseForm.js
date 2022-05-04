import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Input from './Input';
import Button from "../UI/Button"

const ExpenseForm = ({onCancel, onSubmit, submitLabel}) => {
	const [ inputValue, setInputValue ] = useState({
		amount: '',
		date: '',
		description: ''
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
