import { useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../constants/Style";

import { useContext } from "react";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { storeExpense } from "../util/http";
import { updateExpenseAPI } from "../util/http";
import { deleteExpenseAPI } from "../util/http";
import LoadingOverlay from "../UI/LoadingOverlay";
import ErrorOverlay from '../UI/ErrorOverlay';

function ManageExpense({ route, navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();
  const expenseCTX = useContext(ExpensesContext);
  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;

  const selectedExpense = expenseCTX.expenses.find(
    (expense) => expense.id === expenseId
  );
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData) {
    setIsSubmitting(true);

    try{
      if (isEditing) {
        await updateExpenseAPI(expenseId, expenseData);
        expenseCTX.updateExpense(expenseId, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        expenseCTX.addExpense({ ...expenseData, id: id });
      }
      navigation.goBack();
    } catch(e)
    {
      setError('Could not save data - Please try again later!');
      setIsSubmitting(false);
    }

  }

  async function deleteHandler() {
    setIsSubmitting(true);
    try{
      await deleteExpenseAPI(expenseId);
      expenseCTX.deleteExpense(expenseId);
      navigation.goBack();
    }catch(error)
    {
      setError('Could not delete expense - please try again later!');
      setIsSubmitting(false);
    }
  }

  function errorHandler()
  {
    setError(null);
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  if(error && !isSubmitting)
  {
    return <ErrorOverlay message={error} onConfirm={errorHandler}/>
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        confirmHandler={confirmHandler}
        deleteHandler={deleteHandler}
        cancelHandler={cancelHandler}
        isEditing={isEditing}
        onSubmit={confirmHandler}
        defaultValues={selectedExpense}
      />
    </View>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
});
