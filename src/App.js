// import logo from './logo.svg';
import "./App.css";
import "./css/style.css";
import Calculator from "./components/Calculator";
//import { useEffect, useState } from "react";
import { useState } from "react";

// document.addEventListener("keydown", (event) => {
//   console.log(event);
// });

function App() {
  const initialMonitorText = { value: "0", decimal: false };
  const [monitorText, setMonitorText] = useState(initialMonitorText);

  const initialMemory = {
    previousNumberEntered: 0,
    expectedActionSymbol: "",
  };
  const [memory, setMemory] = useState(initialMemory);

  const initialState = {
    currentOperator: { value: "", decimal: false, negative: false },
    otherOperator: { value: "", decimal: false, negative: false },
    operation: { value: "" },
  };
  const [state, setState] = useState(initialState);

  const isDecimal = (n) => {
    return n % 1 !== 0;
  };

  const isNegative = (n) => {
    return n<0;
  };

  function getBestPrecisionNumber(n) {
    if (decimalCount(n) > 4) {
      return Number(n).toFixed(4);
    } else {
      return n;
    }
  }

  const decimalCount = (num) => {
    // Convert to String
    const numStr = String(num);
    // String Contains Decimal
    if (numStr.includes(".")) {
      return numStr.split(".")[1].length;
    }
    // String Does Not Contain Decimal
    return 0;
  };

  const callBackForClickEvents = (event) => {
    // console.log(event);
    // const keyPressed = event.key;
    // console.log(keyPressed);
    console.log("previous state ");
    console.log(state);

    const buttonPressed = event.target;
    //console.log(buttonPressed);
    const buttonPressedText = buttonPressed.innerHTML;
    // filter the string in order to watch only digits and  +-*/ = .
    // δεν ζητά βασικά keyDown listener, άκυρο

    // to do
    // onClick σε όλα τα κουμπιά, με δεδομένη function, switch, τελικά Update display and state, and continue
    if (buttonPressedText === "AC") {
      // clean calculator
      setState(initialState);
      return;
    }
    const actions = "+-*/";
    if (/^\d+$/.test(buttonPressedText)) {
      // digit pressed
      setState((previousState) => {
        return {
          ...previousState,
          currentOperator: {
            ...previousState.currentOperator,
            value: previousState.currentOperator.value + buttonPressedText,
          },
        };
      });

      // setMonitorText((previousMonitorText) => {
      //   if (
      //     previousMonitorText.value === "0" ||
      //     actions.includes(previousMonitorText.value)
      //   ) {
      //     // previous digit 0
      //     return {
      //       ...previousMonitorText,
      //       value: buttonPressedText,
      //     };
      //   }
      //   if (
      //     /^\d+$/.test(previousMonitorText.value) ||
      //     previousMonitorText.value.includes(".")
      //   ) {
      //     return {
      //       ...previousMonitorText,
      //       value: previousMonitorText.value + buttonPressedText,
      //     };
      //   }
      //   // return {...previousMonitorText}
      // });
    }
    if (buttonPressedText === ".") {
      // pressed .
      setState((previousState) => {
        if (previousState.currentOperator.decimal) {
          return previousState;
        } else {
          return {
            ...previousState,
            currentOperator: {
              ...previousState.currentOperator,
              decimal: true,
              value: previousState.currentOperator.value + ".",
            },
          };
        }
      });

      // setMonitorText((previousMonitorText) => {
      //   if (previousMonitorText.decimal) {
      //     return previousMonitorText;
      //   } else {
      //     return { value: previousMonitorText.value + ".", decimal: true };
      //   }
      // });
    }
    if (
      buttonPressedText === "+" ||
      buttonPressedText === "-" ||
      buttonPressedText === "*" ||
      buttonPressedText === "/"
    ) {
      // let previousNumberEntered = monitorText.value;
      // intialize calculator
      // setMonitorText({ ...initialMonitorText, value: buttonPressedText });
      // setMemory((previousMemory) => {
      //   return {
      //     previousNumberEntered: previousNumberEntered,
      //     expectedActionSymbol: buttonPressedText,
      //   };
      // });
      let newOtherOperator = state.currentOperator;
      setState((previousState) => {
        return {
          ...initialState,
          otherOperator: newOtherOperator,
          operation: { value: buttonPressedText },
        };
      });
    }
    if (buttonPressedText === "=") {
      // λήξτο
      let result;
      setState((previousState) => {
        // πρόσεχε είναι 0 στην αρχή κάπου θα δημιουργηθούν προβλήματα
        switch (previousState.operation.value) {
          case "+":
            result =
              Number(previousState.otherOperator.value) +
              Number(previousState.currentOperator.value);
            console.log(
              Number(previousState.otherOperator.value) +
                "" +
                Number(previousState.currentOperator.value)
            );
            break;
          case "-":
            result =
              Number(previousState.otherOperator.value) -
              Number(previousState.currentOperator.value);
            console.log(
              Number(previousState.otherOperator.value) +
                "" +
                Number(previousState.currentOperator.value)
            );
            break;
          case "*":
            result =
              Number(previousState.otherOperator.value) *
              Number(previousState.currentOperator.value);
            console.log(
              Number(previousState.otherOperator.value) +
                "" +
                Number(previousState.currentOperator.value)
            );
            break;
          case "/":
            result =
              Number(previousState.otherOperator.value) /
              Number(previousState.currentOperator.value);
            console.log(
              Number(previousState.otherOperator.value) +
                "" +
                Number(previousState.currentOperator.value)
            );
            break;
          default:
            result = Number(previousState.currentOperator);
        }
        result = getBestPrecisionNumber(result);
        console.log("result " + result);

        let decimal = isDecimal(result);
        let negative = isNegative(result);
        // if (isDecimal(result)) {
        //   setMonitorText({ decimal: true, value: result });
        // } else {
        //   setMonitorText({ ...initialMonitorText, value: result });
        // }

        return {...initialState};
        // μόνο όταν πατηθεί έπειτα απευθείας σύμβολο
        // return {
        //   currentOperator: { value: "", decimal: false, negative: false },
        //   ...previousState,
        //   otherOperator: { value: result, decimal: decimal, negative: negative},
        // };

        // let result;
        // setMemory((previousMemory) => {
        //   // πρόσεχε είναι 0 στην αρχή κάπου θα δημιουργηθούν προβλήματα
        //   switch (previousMemory.expectedActionSymbol) {
        //     case "+":
        //       result =
        //         Number(previousMemory.previousNumberEntered) +
        //         Number(monitorText.value);
        //       console.log(
        //         Number(previousMemory.previousNumberEntered) +
        //           "" +
        //           Number(monitorText.value)
        //       );
        //       break;
        //     case "-":
        //       result =
        //         Number(previousMemory.previousNumberEntered) -
        //         Number(monitorText.value);
        //       console.log(
        //         Number(previousMemory.previousNumberEntered) +
        //           "" +
        //           Number(monitorText.value)
        //       );
        //       break;
        //     case "*":
        //       result =
        //         Number(previousMemory.previousNumberEntered) *
        //         Number(monitorText.value);
        //       console.log(
        //         Number(previousMemory.previousNumberEntered) +
        //           "" +
        //           Number(monitorText.value)
        //       );
        //       break;
        //     case "/":
        //       result =
        //         Number(previousMemory.previousNumberEntered) /
        //         Number(monitorText.value);
        //       console.log(
        //         Number(previousMemory.previousNumberEntered) +
        //           "" +
        //           Number(monitorText.value)
        //       );
        //       break;
        //     default:
        //       result = Number(previousMemory.previousNumberEntered);
        //   }
        //   result = getBestPrecisionNumber(result);
        //   console.log("result" + " " + result);
        //   if (isDecimal(result)) {
        //     setMonitorText({ decimal: true, value: result });
        //   } else {
        //     setMonitorText({ ...initialMonitorText, value: result });
        //   }
        //   return initialMemory;

        // console.log(typeof result);
      });
    }

    // FOLLOW THESE
    // αν πατηθεί = τότε επέστρεψε το history που θα κρατά την παράσταση
    // αν πατηθεί +-/* τότε πάρε monitorText (που θα είναι ένας αριθμός) και
    // αποθήκευσε τον αριθμό σαν property του state της ιστορίας και την πράξη
    // διαβαζε και όταν πατηθεί = με βάση την πράξη με κάποιο switch που είχες κρατήσει
    // εκτέλεσέ την και στην συνέχεια καθάρισε history και έπειτα πάσαρέ το να εμφανιστεί
    // αν πατηθεί +-/* ξανά τότε κάνε πράξη, εξασφάλισέ το εξ' αρχής αυτό και περίμενε για το =

    // όταν πατηθεί . γύρνα false σε ιδιότητα της κατάστασης display και μην ξαναδεχθείς τέτοιον χαρακτήρα μέχρι
    // τον επόμενο αριθμό μετά από σύμβολο

    // κάνε την ανάλογη πράξη και αποθήκευσε το αποτέλεσμα στην ιστορία

    // --------------------- SEE HERE ---------------------------------------
    // Pressing an operator immediately following "=" should start a new calculation that operates on the result of the previous evaluation

    // setMonitorText((previousMonitorText) => {
    //   // console.log(previousMonitorText);
    //   let newState;
    //   if (/^\d+$/.test(buttonPressedText)) {
    //     // pressed a digit
    //     const actions = "+-*/";
    //     if (
    //       previousMonitorText.value === "0" ||
    //       actions.includes(previousMonitorText.value)
    //     ) {
    //       newState = buttonPressedText;
    //     } else {
    //       newState = previousMonitorText.value + buttonPressedText;
    //     }
    //     return { ...previousMonitorText, value: newState };
    //   } else if (buttonPressedText === ".") {
    //     // pressed .
    //     if (previousMonitorText.decimal) {
    //       return previousMonitorText;
    //     } else {
    //       return { value: previousMonitorText.value + ".", decimal: true };
    //     }
    //   } else {
    //     // go for the other options . -+/* = in setMemory
    //     // console.log("other option except digit");
    //     return previousMonitorText;
    //   }
    // });

    // // console.log(memory);
    // setMemory((previousMemory) => {
    //   if (buttonPressedText === "=") {
    //     // λήξτο
    //     let result;
    //     // πρόσεχε είναι 0 στην αρχή κάπου θα δημιουργηθούν προβλήματα
    //     switch (previousMemory.expectedActionSymbol) {
    //       case "+":
    //         result = Number(previousMemory.previousNumberEntered) + Number(monitorText.value);
    //         break;
    //       case "-":
    //         result = Number(previousMemory.previousNumberEntered) - Number(monitorText.value);
    //         break;
    //       case "*":
    //         result = Number(previousMemory.previousNumberEntered) * Number(monitorText.value);
    //         break;
    //       case "/":
    //         result = Number(previousMemory.previousNumberEntered) / Number(monitorText.value);
    //         break;
    //       default:
    //         result = Number(previousMemory.previousNumberEntered);
    //     }
    //     // console.log(typeof result);

    //     result = getBestPrecisionNumber(result);
    //     console.log(result);
    //     setMonitorText({ ...initialMonitorText, value: result });
    //     return initialMemory;
    //   } else if (
    //     buttonPressedText === "+" ||
    //     buttonPressedText === "-" ||
    //     buttonPressedText === "*" ||
    //     buttonPressedText === "/"
    //   ) {
    //     let previousNumberEntered = monitorText.value;
    //     // intialize calculator
    //     setMonitorText({ ...initialMonitorText, value: buttonPressedText });

    //     return {
    //       previousNumberEntered: previousNumberEntered,
    //       expectedActionSymbol: buttonPressedText,
    //     };
    //   }
    //   return previousMemory;
    //   // Hint! : don' t display history to the calculator in order to pass tests
    // });

    // GENERAL INSTRUCTIONS TO DO
    // here you can put the logic to update all the state depending the key which pressed,
    // either for the monitor, or the under the hood calculations
  };

  // const listenForKeyboardEvents = () => {
  //   // document.addEventListener("keydown", callBackForClickEvents);
  // };
  // useEffect(listenForKeyboardEvents, []);

  return (
    <div className="App fluid-container">
      <Calculator
        display={monitorText.value}
        onclick={callBackForClickEvents}
      ></Calculator>
    </div>
  );
}

export default App;
