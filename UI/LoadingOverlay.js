import { View, ActivityIndicator, StyleSheet } from "react-native";
import { GlobalStyles } from "../constants/Style";

function LoadingOverlay() {
  return <View style={styles.root}>
    <ActivityIndicator size='large' color='white' />
  </View>;
}

export default LoadingOverlay;

const styles = StyleSheet.create({
    root:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        padding:24,
        backgroundColor:GlobalStyles.colors.primary700
    }
})