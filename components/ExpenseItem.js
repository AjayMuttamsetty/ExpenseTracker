import { Text, View, StyleSheet, Pressable } from "react-native";
import { GlobalStyles } from "../constants/Style";
import {getFormattedDate} from '../util/date';
import { useNavigation } from "@react-navigation/native";

function ExpenseItem({id,description,amount,date}) {

  const navigation = useNavigation();

 function expensePressHandler()
 {
  navigation.navigate('ManageExpense',{
    expenseId:id
  });
 }

  return (
    <Pressable onPress={expensePressHandler} style={({pressed})=> pressed && Styles.pressed}>
      <View style={Styles.expenseItem}>
        <View>
          <Text style={[Styles.description, Styles.textBase]}>{description}</Text>
          <Text style={Styles.textBase}>{getFormattedDate(date)}</Text>
        </View>
        <View style={Styles.amountContainer}>
          <Text style={Styles.amount}>{amount}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default ExpenseItem;

const Styles = StyleSheet.create({
  pressed:{
    opacity:0.75
  },
  expenseItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 6,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  description: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "white",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    minWidth:80
  },
  amount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: "bold",
  },
});
