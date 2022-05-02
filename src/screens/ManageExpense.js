import React from "react";
import { StyleSheet, Text, View} from "react-native";

const ManageExpense = () => {
    return(
        <View style={styles.screen}>
            <Text>ManageExpense</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex:1,
        justifyContent:"center",
        alignItems:"center",
    },
});

export default ManageExpense;