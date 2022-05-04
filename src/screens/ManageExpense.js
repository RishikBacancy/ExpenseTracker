import React,{ useLayoutEffect, useContext } from "react";
import { StyleSheet, Text, View} from "react-native";
import Button from "../components/UI/Button";
import IconButton from "../components/UI/IconButton";
import { GlobalStyle } from "../constants/styles";
import { ExpensesContext } from "../store/expenseContext";

const ManageExpense = ({ route, navigation}) => {

    const editingExpenseId = route.params?.expenseId;
    const editMode = !!editingExpenseId;


    const expenseCtx = useContext(ExpensesContext);

    useLayoutEffect(()=>{
        navigation.setOptions({
            title : editMode ? "Edit Expense" : "Add Expense",
        })
    },[navigation, editMode])

    const deleteExpenseHandler = () => { 
        expenseCtx.deleteExpense(editingExpenseId);
        navigation.goBack();
    };

    const cancelHandelr = () => {
        navigation.goBack();
    };

    const confirmHandelr = () => {
        if(editMode) {
            expenseCtx.updateExpense(editingExpenseId,{description:"Update Test", amount: 99.99, date: new Date("2022-05-04")});
        } else {
            expenseCtx.addExpense({description:"Test", amount:99.99, date: new Date("2022-05-04")});
        }
        navigation.goBack();
    };

    return(
        <View style={styles.container}>

            <View style={styles.btnContainer}>
                <Button style={styles.btn} mode="flat" onPress={cancelHandelr} >Cancel</Button>
                <Button style={styles.btn} onPress={confirmHandelr} >{editMode?"Update":"Add"}</Button>
            </View>

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
    btnContainer:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
    },
    btn:{
        minWidth:120,
        marginHorizontal:8,
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