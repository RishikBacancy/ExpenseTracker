import React from 'react';
import { Pressable, StyleSheet, View, Text } from 'react-native';
import { GlobalStyle } from '../../constants/styles';
import { getFormattedDate } from '../../util/date';
import { useNavigation } from "@react-navigation/native";

const ExpenseItem = ({ id, description, amount, date }) => {
	
    const navigation = useNavigation();

    const expenseHandler = () => {
        navigation.navigate("Manage",{
            expenseId: id
        });
    };

    return (
		<Pressable style={({pressed}) => pressed && styles.pressed} onPress={expenseHandler}>
			<View style={styles.expenseItem}>
				<View>
					<Text style={[styles.description, styles.textBase]}>{description}</Text>
					<Text style={styles.textBase}>{getFormattedDate(date)}</Text>
				</View>
				<View style={styles.amountConntainer}>
					<Text style={styles.amount}>{amount.toFixed(2)}</Text>
				</View>
			</View>
		</Pressable>
	);
};

const styles = StyleSheet.create({
    pressed:{
        opacity:0.75,
    },
    expenseItem:{
        padding:12,
        marginVertical:8,
        backgroundColor: GlobalStyle.colors.primary500,
        flexDirection:"row",
        borderRadius:7,
        elevation:4,
        shadowColor:GlobalStyle.colors.gray500,
        shadowOffset:{ width:2, height:2},
        shadowRadius:5,
        shadowOpacity:0.5,
        justifyContent:"space-between",
    },
    textBase:{
        color: GlobalStyle.colors.primary50,
    },
    description:{
        fontSize:16,
        marginBottom:4,
        fontWeight:"bold",
    },
    amountConntainer:{
        paddingHorizontal:12,
        paddingVertical:4,
        backgroundColor:"white",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:5,
        minWidth: 100,
    },
    amount:{
        color:GlobalStyle.colors.primary500,
        fontWeight:"bold",
    }
});

export default ExpenseItem;
