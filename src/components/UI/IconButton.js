import React from "react";
import { View, StyleSheet, Pressable} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const IconButton = ({icon, color, size, onPress}) => {
    return(
        <Pressable onPress={onPress} style={({pressed}) => pressed && styles.pressed}>
            <View style={styles.btnContainer}>
                <Ionicons name={icon} color={color} size={size}/>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    btnContainer:{
        borderRadius:24,
        padding:6,
        marginHorizontal:8,
        marginVertical:2,
    },
    pressed:{
        opacity:0.75,
    }
});

export default IconButton;