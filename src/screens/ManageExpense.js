import React,{ useLayoutEffect } from "react";
import { StyleSheet, Text, View} from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyle } from "../constants/styles";


const ManageExpense = ({ route, navigation}) => {

    const editingExpenseId = route.params?.expenseId;
    const editMode = !!editingExpenseId;

    useLayoutEffect(()=>{
        navigation.setOptions({
            title : editMode ? "Edit Expense" : "Add Expense",
        })
    },[navigation, editMode])

    const deleteExpenseHandler = () => { 

    };

    return(
        <View style={styles.container}>
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