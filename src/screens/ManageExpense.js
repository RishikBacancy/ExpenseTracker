import React,{ useLayoutEffect, useContext } from "react";
import { StyleSheet, Text, View} from "react-native";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import IconButton from "../components/UI/IconButton";
import { GlobalStyle } from "../constants/styles";
import { ExpensesContext } from "../store/expenseContext";
import { deleteExpense, storeExpense, updateExpense } from "../util/http";

const ManageExpense = ({ route, navigation}) => {

    const editingExpenseId = route.params?.expenseId;
    const editMode = !!editingExpenseId;

    const expenseCtx = useContext(ExpensesContext);

    const selectedExpense = expenseCtx.expenses.find(expense => expense.id === editingExpenseId);

    useLayoutEffect(()=>{
        navigation.setOptions({
            title : editMode ? "Edit Expense" : "Add Expense",
        })
    },[navigation, editMode])

    const deleteExpenseHandler = async() => { 
        expenseCtx.deleteExpense(editingExpenseId);
        await deleteExpense(editingExpenseId);
        navigation.goBack();
    };

    const cancelHandelr = () => {
        navigation.goBack();
    };

    const confirmHandelr = async (expenseData) => {
        if(editMode) {
            expenseCtx.updateExpense(editingExpenseId,expenseData);
            await updateExpense(editingExpenseId,expenseData);
        } else {
            const id = await storeExpense(expenseData);
            expenseCtx.addExpense({...expenseData, id : id} );
        }1
        navigation.goBack();
    };

    return(
        <View style={styles.container}>

            <ExpenseForm 
                onSubmit={confirmHandelr} 
                submitLabel={editMode?"Update":"Add"} 
                onCancel={cancelHandelr}
                defaultValue={selectedExpense}/>

            {editMode && 
                <View style={styles.deleteContainer}>
                    <IconButton 
                        icon="trash" 
                        color={GlobalStyle.colors.error500}
                        size={36} 
                        onPress={deleteExpenseHandler}/>
                </View>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:24,
        backgroundColor:GlobalStyle.colors.primary800,
    },
    deleteContainer:{
        marginTop:16,
        paddingTop:8,
        borderTopWidth:2,
        borderTopColor:GlobalStyle.colors.primary200,
        alignItems:"center",
    },  
});

export default ManageExpense;