import { View, Text, StyleSheet } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext, useEffect, useState } from "react";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinus } from "../util/date";
import { fetchExpense } from "../util/http";
import LoadingOverlay from "../UI/LoadingOverlay";
import ErrorOverlay from "../UI/ErrorOverlay";

function RecentExpense() {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();
  const expensesContext = useContext(ExpensesContext);

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      try {
        const expenses = await fetchExpense();
        expensesContext.setExpenses(expenses);
        setIsFetching(false);
      } catch (error) {
        setError('Could not fetch expenses');
        setIsFetching(false);
      }
    }
    getExpenses();
  }, []);

  if (isFetching) {
    return <LoadingOverlay />;
  }

  function errorHandler() {
    setError(null);
  }

  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  //   const expenses = expensesContext.expenses.filter((expense) => {
  //     const date = new Date();
  //     const date7DaysAgo = getDateMinus(date, 7);
  //     return expense.date > date7DaysAgo && expense.date <= date;
  //   });

  const filtered_expenses = expensesContext.expenses.filter((expense) => {
    const date = new Date();
    const date7DaysAgo = getDateMinus(date, 7);
    return expense.date > date7DaysAgo && expense.date <= date;
  });
  return (
    <ExpensesOutput expenses={filtered_expenses} expensesPeriod="Last 7 days" />
  );
}

export default RecentExpense;

const styles = StyleSheet.create({});
