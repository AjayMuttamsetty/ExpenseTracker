import { createContext, useReducer } from "react";

export const ExpensesContext = createContext({
  expenses: [],
  setExpenses: (expense)=>{},
  addExpense: ({ description, amount, date, id }) => {},
  updateExpense: (id,{ description, amount, date }) => {},
  deleteExpense: (id) => {},
});



function ExpenseContextProvider({ children }) {
  function expenseReducer(state, action) {
    switch (action.type) {
      case "ADD":
        return [action.payload, ...state];
      case "SET":
        const inverted = action.payload;
        return inverted;
      case "UPDATE":
        const updatableExpenseIndex = state.findIndex(
          (expense) => expense.id === action.payload.id
        );
        const updatableExpense = state[updatableExpenseIndex];
        const updatedItem = {...updatableExpense,...action.payload.data };
        const updatedExpenses = [...state];
        updatedExpenses[updatableExpenseIndex] = updatedItem;
        return updatedExpenses;
      case "DELETE":
        return state.filter((expense)=>expense.id !== action.payload);
      default:
        return state;
    }
  }

  const [expenseState, dispatch] = useReducer(expenseReducer, []);

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }

  function setExpenses(expenses)
  {
    dispatch({type :"SET", payload:expenses});
  }

  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  const value = {
    expenses : expenseState,
    setExpenses: setExpenses,
    addExpense: addExpense,
    updateExpense: updateExpense,
    deleteExpense:deleteExpense
  }

  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>;
}

export default ExpenseContextProvider;
