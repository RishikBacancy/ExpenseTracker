import React from "react";
import { StyleSheet, Text, View} from "react-native";

const AllExpenses = () => {
    return(
        <View style={styles.screen}>
            <Text>AllExpenses</Text>
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

export default AllExpenses;