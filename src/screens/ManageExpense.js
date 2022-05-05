import React,{ useLayoutEffect, useContext, useState } from "react";
import { StyleSheet, Text, View} from "react-native";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import IconButton from "../components/UI/IconButton";
import LoadingOverlay from "../components/UI/LodingOverlay";
import { GlobalStyle } from "../constants/styles";
import { AuthContext } from "../store/authContext";
import { ExpensesContext } from "../store/expenseContext";
import { deleteExpense, storeExpense, updateExpense } from "../util/http";

const ManageExpense = ({ route, navigation}) => {

    const editingExpenseId = route.params?.expenseId;

    const editMode = !!editingExpenseId;

    const expenseCtx = useContext(ExpensesContext);

    const authCtx = useContext(AuthContext);

    const token = authCtx.token;

    const selectedExpense = expenseCtx.expenses.find(expense => expense.id === editingExpenseId);

    const [ isSubmitting, setIsSubmitting ] = useState(false);

    const [ error, setError ] = useState();

    useLayoutEffect(()=>{
        navigation.setOptions({
            title : editMode ? "Edit Expense" : "Add Expense",
        })
    },[navigation, editMode])

    const deleteExpenseHandler = async() => { 
        setIsSubmitting(true);

        try{
            await deleteExpense(editingExpenseId,token);
            expenseCtx.deleteExpense(editingExpenseId);
            navigation.goBack();
        } catch (error) {
            setError("Could not delete Expense - Please try again later!");
            setIsSubmitting(false);
        }
  
    };

    const cancelHandelr = () => {
        navigation.goBack();
    };

    const confirmHandelr = async (expenseData) => {
        setIsSubmitting(true);
        try{
            if(editMode) {
                expenseCtx.updateExpense(editingExpenseId,expenseData);
                await updateExpense(editingExpenseId,expenseData,token);
            } else {
                const id = await storeExpense(expenseData,token);
                expenseCtx.addExpense({...expenseData, id : id} );
            }1
            navigation.goBack();
        } catch (error) {
            setError("Could not save data - Please try again later!");
            setIsSubmitting(false);
        }
    };

    const errorHandler = () => {
        setError(null);
    };

    if( error && !isSubmitting) {
        return(
            <ErrorOverlay errorMsg={error} onConfirm={errorHandler}/>
        )
    }

    if(isSubmitting) {
        return(
            <LoadingOverlay/>
        );
    }

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