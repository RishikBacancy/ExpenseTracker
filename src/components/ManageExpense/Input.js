import React from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import { GlobalStyle } from '../../constants/styles';

const Input = ({ label, textInputConfig, style }) => {

    const inputStyle = [styles.textInput];

    if(textInputConfig && textInputConfig.multiline) {
        inputStyle.push(styles.textInputMultiline)
    }

	return (
		<View style={[styles.container,style]}>
			<Text style={styles.label}>{label}</Text>
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
    }
});

export default Input;