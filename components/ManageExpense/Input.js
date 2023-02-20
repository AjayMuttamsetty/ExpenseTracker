import {View, TextInput, Text,  StyleSheet} from 'react-native';
import { GlobalStyles } from '../../constants/Style';


function Input({label, textInputConfig, style, invalid})
{
    let inputStyles = [styles.input];

    if(textInputConfig && textInputConfig.multiline)
    {
        inputStyles.push(styles.inputMultiline)
    }
    if(invalid)
    {
        inputStyles.push(styles.invalidInput)
    }
    return(
    <View style={[styles.inputContainer,style]}>
        <Text style={[styles.label, invalid && styles.invalidLabel]}>{label}</Text>
        <TextInput style={inputStyles} {...textInputConfig}  />
    </View>
    );

}

export default Input;

const styles = StyleSheet.create({
    inputContainer:{
        marginHorizontal:4,
        marginVertical:12
    },
    label:{
        fontSize:14,
        color:GlobalStyles.colors.primary100,
        marginBottom:4
    },
    input:{
        backgroundColor:GlobalStyles.colors.primary100,
        padding:7,
        borderRadius:6,
        color:GlobalStyles.colors.primary700,
        fontSize:16
    },
    inputMultiline:{
        minHeight:100,
        textAlignVertical:'top'
    },
    invalidLabel:{
        color:GlobalStyles.colors.error500
    },
    invalidInput:{
        backgroundColor:GlobalStyles.colors.error50
    }
})