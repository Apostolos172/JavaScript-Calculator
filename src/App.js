import "./App.css";
import "./css/style.css";
import Calculator from "./components/Calculator";
import { useState } from "react";

function App() {
  // state for the monitor
  const initialDisplay = "0";
  const [display, setDisplay] = useState(initialDisplay);

  // state for the calculations
  const initialState = {
    currentOperator: { value: "", decimal: false, negative: false },
    otherOperator: { value: "", decimal: false, negative: false },
    operation: { value: "" },
    previousState: {},
    previousButtonPressed: "",
  };
  // to do
  // check unnecessary variables and delete them
  const [state, setState] = useState(initialState);

  // state for the previous each time button pressed
  const initialButtonPressed = "";
  const [previousButtonPressed, setPreviousButtonPressed] =
    useState(initialButtonPressed);

  const tempStateMinusInitial = {};
  const [tempStateMinus, setTempStateMinus] = useState(tempStateMinusInitial);

  // useful functions
  const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  };

  const calculateResult2OpBasedOnOp = (
    firstOperator,
    operation,
    secondOperator
  ) => {
    // calculate and return the result of two operators based on the operation symbol
    let result;
    switch (operation) {
      case "+":
        result = Number(firstOperator) + Number(secondOperator);
        // console.log(Number(firstOperator) + " " + Number(secondOperator));
        break;
      case "-":
        result = Number(firstOperator) - Number(secondOperator);
        // console.log(Number(firstOperator) + " " + Number(secondOperator));
        break;
      case "*":
        result = Number(firstOperator) * Number(secondOperator);
        // console.log(Number(firstOperator) + " " + Number(secondOperator));
        break;
      case "/":
        result = Number(firstOperator) / Number(secondOperator);
        // console.log(Number(firstOperator) + " " + Number(secondOperator));
        break;
      default:
        result = Number(secondOperator);
    }
    return result;
  };

  const isDecimal = (n) => {
    return n % 1 !== 0;
  };

  const isNegative = (n) => {
    return n < 0;
  };

  function getBestPrecisionNumber(n) {
    // the decimal results of the calculator will be up to 4 decimal digits if needed
    if (decimalCount(n) > 4) {
      return Number(n).toFixed(4);
    } else {
      return n;
    }
  }

  const decimalCount = (num) => {
    const numStr = String(num);
    if (numStr.includes(".")) {
      return numStr.split(".")[1].length;
    }
    return 0;
  };

  // the calculator
  const callBackForClickEvents = (event) => {
    // here there is the logic to update all the state depending on the key, which pressed,
    //   either for the monitor, or the under the hood calculations
    /* tests
      3 + 5 * 6 - 2 / 4 = 11.5
      5 * - 5 = - 25
      6 + / 3 = 2
      5 * - + 5 = 10
      5 - 2 = / 2 = 1.5
    */

    /* to do
    9 / 9 / = 1 θα ήθελα, αλλά δεν μπορεί να το υπολογίσει, δεν θα έπρεπε να το υπολογίζει, δες πραγματική
    */

    // console.log("previous state ");
    // console.log(state);

    const buttonPressed = event.target;
    const buttonPressedText = buttonPressed.innerHTML;

    // MONITOR
    // set the content of the MONITOR on each click of a button of the calculator
    if (
      (/^\d+$/.test(buttonPressedText) || buttonPressedText === ".") &&
      previousButtonPressed !== "="
    ) {
      // when the user writes a number decimal or not and we are not after a result the user wanted (previousButtonPressed==="=")
      //   simply append the buttonPressedText to the current content of the monitor
      let tempNum = state.currentOperator.value.toString().replace(/^0+/, ""); // remove 0 at the beginning of the string (leading zeros)
      setDisplay(tempNum + buttonPressedText);
    } else {
      // we display something new to the monitor, after a result we have a new number, we want to show the operation symbol when pressed etc
      setDisplay(buttonPressedText);
    }

    // CALCULATIONS
    // Check for every button click, which button pressed and forward to the necessary actions
    const actions = "+-*/";

    if (buttonPressedText === "AC") {
      // clean calculator
      setState(initialState);
      setDisplay(initialDisplay);
      setPreviousButtonPressed(initialButtonPressed);
      setTempStateMinus(tempStateMinusInitial);
      return;
    }

    if (/^\d+$/.test(buttonPressedText)) {
      // digit pressed
      let additionToTheBeginning;
      if (!isEmpty(tempStateMinus)) {
        // πατήθηκε πράξη και μετά ως τελευταίο σύμβολο πράξης υπάρχει το - που σηματοδοτεί πράξη με αρνητικό
        additionToTheBeginning = "-";
      } else {
        additionToTheBeginning = "";
      }

      setState((previousState) => {
        if (previousState.operation.value === "=") {
          // πατήθηκε άμεσα αριθμός μετά το =
          //   so we do not need the result, unlike this case 5 - 2 = / 2 = 1.5, which we save every time after the = as the current operator,
          //   so change the value of it with the buttonPressedText. We begin a new operation.
          // π.χ. 5-5= 5-4= (two different operations each one after the other)
          return {
            ...initialState,
            previousState: previousState,
            previousButtonPressed: previousButtonPressed,
            // operation: { value: "later" },
            currentOperator: {
              ...previousState.currentOperator,
              value: buttonPressedText,
            },
          };
        }
        // return the new current operator in the state
        return {
          ...previousState,
          previousState: previousState,
          previousButtonPressed: previousButtonPressed,
          currentOperator: {
            ...previousState.currentOperator,
            value:
              previousState.currentOperator.value +
              additionToTheBeginning +
              buttonPressedText,
          },
        };
      });
    }

    if (buttonPressedText === ".") {
      // pressed .
      setState((previousState) => {
        if (previousState.currentOperator.decimal) {
          // the current operator the user types is already decimal
          //   so return the same state and do nothing
          return {
            ...previousState,
            previousState: previousState,
            previousButtonPressed: previousButtonPressed,
          };
        } else {
          // the current operator the user types is decimal
          //   so append . to the current operator
          return {
            ...previousState,
            previousState: previousState,
            previousButtonPressed: previousButtonPressed,
            currentOperator: {
              ...previousState.currentOperator,
              decimal: true,
              value: previousState.currentOperator.value + ".",
            },
          };
        }
      });
    }

    if (
      buttonPressedText === "+" ||
      buttonPressedText === "-" ||
      buttonPressedText === "*" ||
      buttonPressedText === "/"
    ) {
      // operation symbol pressed
      /*
      If 2 or more operators are entered consecutively, the operation performed should be the last operator 
      entered (excluding the negative (-) sign.
      */

      setState((previousState) => {
        if (
          buttonPressedText === "-" &&
          actions.includes(previousButtonPressed) &&
          previousButtonPressed !== ""
        ) {
          // 5 * - 5 will be some time here
          // full the state TempStateMinus because of a possible existance of negative number 
          //    and then 
          //    if the next button pressed is action, the next if statement continues the operation
          //    if the next button is number, while the app reads numbers it checks if the TempStateMinus is full, which is
          //      true in this case will put a minus in front of the number, keeping also the last operation the user wanted.
          let newState = {
            previousState: previousState, // άχρηστο
            previousButtonPressed: previousButtonPressed, // άχρηστο
            ...previousState,
            currentOperator: { ...previousState.currentOperator, value: "-" },
          };
          setTempStateMinus(newState);
          // return the same state instead of the newState if the number which follows is negative at the end
          return previousState;
        }
        if (
          actions.includes(previousButtonPressed) &&
          previousButtonPressed !== ""
        ) {
          // 6 + / 3 will be some time here
          // keep the latest operation the user pressed, keep all the other same
          setTempStateMinus(tempStateMinusInitial);
          return {
            ...previousState,
            previousButtonPressed: previousButtonPressed,
            previousState: previousState,
            operation: { value: buttonPressedText },
          };
        }

        setTempStateMinus(tempStateMinusInitial);

        /* 
        Θα τσεκάρω όταν πατηθεί operation symbol αν δεν είναι κενό το other operator δηλαδή αν δεν πρόκειται για την πρώτη πράξη
        που θα κάνω τότε πρωτού αποθηκεύσει την νέα πράξη να παίρνει το other operator και με το current operator να εκτελεί την ήδη 
        αποθηκευμένη πράξη, έπειτα να βάζει το αποτέλεσμα στo other operator, να καθαρίζει το current και να ολοκληρώνει 
        έτσι ώστε όταν πατηθεί το = τελικά να γίνεται η επιθυμητή πράξη
        // test 3 + 5 * 6 - 2 / 4 for example gives 11.5 with this way
        // Immediate Execution Logic
        */

        // θα εκτελεστούν την πρώτη φορά πριν εκτελεστεί τυχόν κάποιο από τα παραπάνω if statements και έτσι θα έχει υλοποιήσει την 
        //    πράξη που ζητήθηκε.
        if (previousState.otherOperator.value !== "") {
          // δεν είμαστε στην πρώτη πράξη που θέλει να συμβεί
          //   so calculate the current result of the two operators based on the operation,
          //   before you update the operation, and store the result to otherOperator
          let firstOperator = previousState.otherOperator.value;
          let operation = previousState.operation.value;
          let secondOperator = previousState.currentOperator.value;
          let result = calculateResult2OpBasedOnOp(
            firstOperator,
            operation,
            secondOperator
          );
          let newOtherOperator = {
            value: result,
            negative: isNegative(result),
            decimal: isDecimal(result),
          };

          return {
            ...initialState,
            previousState: previousState,
            previousButtonPressed: previousButtonPressed,
            otherOperator: newOtherOperator,
            operation: { value: buttonPressedText },
          };
        } else {
          // first time a symbol of operation pressed
          //   move to the other operator the current operator
          let newOtherOperator = state.currentOperator;

          return {
            ...initialState,
            previousState: previousState,
            previousButtonPressed: previousButtonPressed,
            otherOperator: newOtherOperator,
            operation: { value: buttonPressedText },
          };
        }
      });
    }

    if (buttonPressedText === "=") {
      // pressed button =
      // λήξτο
      /*
      5 - 2 = / 2 = 1.5 
      έχουμε αποθηκευμένο το αποτέλεσμα πάντα ως current operator 
      και αν πατηθεί αριθμός το τσεκάρει στους αριθμούς και αγνοεί το αποτέλεσμα, νέα πράξη,
      ενώ αν πατηθεί σύμβολο πράξης περνά από τον έλεγχο για σύμβολο πράξης και επειδή είναι κενό το other operator ==="", 
      τελικά μεταφέρει το result στο other operator, κρατά την πράξη και συνεχίζει διαβάζοντας νέο αριθμό για την πράξη
      // Pressing an operator immediately following "=" should start a new calculation that operates on the result of the previous evaluation
      */
      let result;
      setState((previousState) => {
        result = calculateResult2OpBasedOnOp(
          previousState.otherOperator.value,
          previousState.operation.value,
          previousState.currentOperator.value
        );
        result = getBestPrecisionNumber(result);
        // console.log("result " + result);
        // show result to the monitor
        setDisplay(result);

        // return the result as current operator and = as the operation
        return {
          ...initialState,
          previousState: previousState,
          previousButtonPressed: previousButtonPressed,
          currentOperator: {
            value: result,
            decimal: isDecimal(result),
            negative: isNegative(result),
          },
          operation: { value: "=" },
        };
      });
    }

    setPreviousButtonPressed(buttonPressedText);
  };

  return (
    <div className="App fluid-container">
      <Calculator
        display={display}
        onclick={callBackForClickEvents}
      ></Calculator>
    </div>
  );
}

export default App;
