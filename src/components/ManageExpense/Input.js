import React from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import { GlobalStyle } from '../../constants/styles';

const Input = ({ label, invalid, textInputConfig, style }) => {

    const inputStyle = [styles.textInput];

    if(textInputConfig && textInputConfig.multiline) {
        inputStyle.push(styles.textInputMultiline)
    }

    if(invalid) {
        inputStyle.push(styles.invalidInput)
    }

	return (
		<View style={[styles.container,style]}>
			<Text style={[styles.label, invalid && styles.invalidLabel]}>{label}</Text>
			<TextInput style={inputStyle} {...textInputConfig} />
		</View>
	);
};

const styles = StyleSheet.create({
    container:{
        marginHorizontal:4,
        marginVertical:8,
    },
    label:{
        fontSize:12,
        color: GlobalStyle.colors.primary100,
        marginBottom:4,
    },
    textInput:{
        backgroundColor: GlobalStyle.colors.primary100,
        color: GlobalStyle.colors.primary700,
        padding:6,
        borderRadius:7,
        fontSize:18,
    },
    textInputMultiline:{
        minHeight: 100,
        textAlignVertical:"top",
    },
    invalidLabel:{
        color: GlobalStyle.colors.error500,
    },
    invalidInput:{
        backgroundColor: GlobalStyle.colors.error50,
    },
});

export default Input;