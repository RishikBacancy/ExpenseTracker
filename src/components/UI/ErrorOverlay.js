import React from "react";
import  { View, StyleSheet, Text } from "react-native";
import { GlobalStyle } from "../../constants/styles";
import Button from "./Button";

const ErrorOverlay = ({errorMsg, onConfirm}) => {
    return(
        <View style={styles.container}>
            <Text style={[styles.title, styles.errorTxt]}>An Error occurred!</Text>
            <Text style={styles.errorTxt}>{errorMsg}</Text>
            <Button onPress={onConfirm}>Okay</Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        padding:24,
        backgroundColor: GlobalStyle.colors.primary700,
    },
    errorTxt:{
        textAlign:"center",
        marginBottom:8,
        color:"white",
    },
    title:{
        fontSize:20,
        fontWeight:"bold",
    },
});

export default ErrorOverlay;