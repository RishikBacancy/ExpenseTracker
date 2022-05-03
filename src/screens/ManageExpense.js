import React,{ useLayoutEffect } from "react";
import { StyleSheet, Text, View} from "react-native";
import Button from "../components/UI/Button";
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
        navigation.goBack();
    };

    const cancelHandelr = () => {
        navigation.goBack();
    };

    const confirmHandelr = () => {
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