import React from "react";
import { StyleSheet, Text, View} from "react-native";

const RecentExpenses = () => {
    return(
        <View style={styles.screen}>
            <Text>RecentExpenses</Text>
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

export default RecentExpenses;