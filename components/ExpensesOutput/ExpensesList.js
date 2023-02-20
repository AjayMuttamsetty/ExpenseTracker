import {View, Text, FlatList, StyleSheet} from 'react-native';
import ExpenseItem from '../ExpenseItem'

function renderExpenseItem(itemData)
{
    return (
    <ExpenseItem {...itemData.item}/>
    );
}


function ExpensesList({expenses})
{
    const isEmpty = !(expenses.length);
    if(isEmpty)
    {
        return(
            <View style={styles.emptyContainer}><Text style={styles.text}>You have no expenses</Text></View>  
        )
    }else{
        return(
        <FlatList
        data={expenses}
        renderItem={renderExpenseItem}
        keyExtractor={(item)=>item.id}
        />)
    }
        
}
export default ExpensesList;

const styles = StyleSheet.create({
    emptyContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    text:{
        color:'white',
        fontWeight:'bold',
        fontSize:20
    }
})