import axios from "axios";

const BACKEND_URL = "https://react-native-course-1f074-default-rtdb.firebaseio.com/"

export async function storeExpense(expenseData) {
 const response = await axios.post(
    BACKEND_URL+"expense.json",
    expenseData
  );
  const id = response.data.name;
  return id;
}

export async function fetchExpense()
{
   const response = await axios.get(BACKEND_URL+"expense.json");

   const expensesArr = [];

   for(const key in response.data)
   {
        const expenseObj = {
            id: key,
            amount: +response.data[key].amount,
            date: new Date(response.data[key].date),
            description: response.data[key].description
        }
        expensesArr.push(expenseObj);
   }
   return expensesArr;
}

export function updateExpenseAPI(id, expenseData)
{
  return axios.put(BACKEND_URL+`expense/${id}.json`,expenseData);
}

export function deleteExpenseAPI(id)
{
  return axios.delete(BACKEND_URL+`expense/${id}.json`);
}