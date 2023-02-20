import {View, Text, StyleSheet} from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import {ExpensesContext} from '../store/expenses-context';
import { useContext, useEffect, useState } from "react";
import { fetchExpense } from "../util/http";

function AllExpenses()
{ 
   const expensesContext  =  useContext(ExpensesContext);
   //const [fetchedExpenses, setFetchedExpenses] = useState([]);

  useEffect(() => {
    async function getExpenses() {
      const expenses = await fetchExpense();
      expensesContext.setExpenses(expenses);
      //setFetchedExpenses(expenses)
    }

    getExpenses();
  }, []);
    return(
        <ExpensesOutput expenses={expensesContext.expenses} expensesPeriod="Total"/>
    )
}

export default AllExpenses;

const styles = StyleSheet.create({
    
})