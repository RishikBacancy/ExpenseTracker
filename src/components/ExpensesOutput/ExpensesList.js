import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import ExpenseItem from "./ExpenseItem";

const renderExpenseItem = ( itemData ) => {
    return(
        <ExpenseItem {...itemData.item}/>
    )
}

const ExpenseList = ({expense}) => {
    return(
        <FlatList data={expense} renderItem={renderExpenseItem} keyExtractor={(item)=>item.id}/>
    );
};

export default ExpenseList;