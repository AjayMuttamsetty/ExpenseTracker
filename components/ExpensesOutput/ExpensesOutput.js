import {View, Text, StyleSheet} from 'react-native';
import { GlobalStyles } from '../../constants/Style';
import ExpensesList from './ExpensesList';
import ExpensesSummary from './ExpensesSummary';




function ExpensesOutput({expenses, expensesPeriod}){
return(
    <View style={Styles.container}>
        <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
        <ExpensesList expenses={expenses}/>
    </View>
);
}

export default ExpensesOutput;

const Styles = StyleSheet.create({
    container:{
        flex:1,
        padding:24,
        backgroundColor:GlobalStyles.colors.primary700,
        paddingBottom:0
    }
})