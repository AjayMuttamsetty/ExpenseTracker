import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Input from "./Input";
import Button from "../../UI/Button";
import IconButton from "../../UI/IconButton";
import { GlobalStyles } from "../../constants/Style";

function ExpenseForm({
  deleteHandler,
  cancelHandler,
  isEditing,
  onSubmit,
  defaultValues,
}) {
  const [input, setInput] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? defaultValues.date.toISOString().slice(0, 10) : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
  });

  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInput((currentValue) => {
      return {
        ...currentValue,
        [inputIdentifier]: {value:enteredValue, isValid:true},
      };
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: +input.amount.value,
      date: new Date(input.date.value),
      description: input.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const isDateValid = expenseData.date.toString() !== "Invalid Date";
    const description = expenseData.description.trim().length > 0;

  

    if (!amountIsValid || !isDateValid || !description) {
     // Ale;

     setInput((curInput)=>{
        return{
            amount: {value:curInput.amount.value, isValid:amountIsValid},
            date: {value:curInput.date.value, isValid:isDateValid},
            description: {value:curInput.description.value, isValid:description}
        }
     })
      return;
    }

    onSubmit(expenseData);
  }

  const isFormValid = !input.amount.isValid || !input.date.isValid || !input.description.isValid;


  return (
    <View style={styles.form}>
      <Text style={styles.formInput}>Your Expense:</Text>
      <View style={styles.root}>
        <Input
          label="Amount"
          style={styles.rowInput}
          invalid={!input.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, "amount"),
            value: input.amount.value,
          }}
        />
        <Input
          label="Date"
          style={styles.rowInput}
          invalid={!input.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, "date"),
            value: input.date.value,
          }}
        />
      </View>
      <Input
        label="Description"
        invalid={!input.description.isValid}
        textInputConfig={{
          multiline: true,
          autoCapitalize: "sentences",
          onChangeText: inputChangeHandler.bind(this, "description"),
          value: input.description.value,
        }}
      />
      {isFormValid && <Text style={styles.errorStyle}>Invalid input values - please check your entered data</Text>}
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={cancelHandler}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            size={48}
            color={GlobalStyles.colors.error500}
            onPress={deleteHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 80,
  },
  formInput: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    marginVertical: 24,
  },
  root: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopColor: GlobalStyles.colors.primary200,
    borderTopWidth: 2,
    alignItems: "center",
  },
  errorStyle:{
    textAlign:'center',
    fontSize:18,
    color:GlobalStyles.colors.error500
  }
});
