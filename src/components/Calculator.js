import React from "react";
import Button from "./Button";
import Display from "./Display";

const zeroButton = { class: "btn-2", id: "zero", content: 0 };
const oneButton = { class: "btn-1", id: "one", content: 1 };
const twoButton = { class: "btn-1", id: "two", content: 2 };
const threeButton = { class: "btn-1", id: "three", content: 3 };
const fourButton = { class: "btn-1", id: "four", content: 4 };
const fiveButton = { class: "btn-1", id: "five", content: 5 };
const sixButton = { class: "btn-1", id: "six", content: 7 };
const sevenButton = { class: "btn-1", id: "seven", content: 6 };
const eightButton = { class: "btn-1", id: "eight", content: 8 };
const nineButton = { class: "btn-1", id: "nine", content: 9 };

const decimalButton = { class: "btn-1", id: "decimal", content: "." };
const clearButton = { class: "btn-3", id: "clear", content: "AC" };
const equalsButton = { class: "btn-1", id: "equals", content: "=" };

const addButton = { class: "btn-1", id: "add", content: "+" };
const subtractButton = { class: "btn-1", id: "subtract", content: "-" };
const multiplyButton = { class: "btn-1", id: "multiply", content: "*" };
const divideButton = { class: "btn-1", id: "divide", content: "/" };

const Calculator = (props) => {
  return (
    <div className="calculator">
      <div className="row">
        <Display display={props.display}></Display>
      </div>
      <div className="row">
        <Button infoOfButton={clearButton} onclick={props.onclick}></Button>
        {/* <Button></Button>
        <Button></Button> */}
        <Button infoOfButton={divideButton} onclick={props.onclick}></Button>
      </div>
      <div className="row">
        <Button infoOfButton={sevenButton} onclick={props.onclick}></Button>
        <Button infoOfButton={eightButton} onclick={props.onclick}></Button>
        <Button infoOfButton={nineButton} onclick={props.onclick}></Button>
        <Button infoOfButton={multiplyButton} onclick={props.onclick}></Button>
      </div>
      <div className="row">
        <Button infoOfButton={fourButton} onclick={props.onclick}></Button>
        <Button infoOfButton={fiveButton} onclick={props.onclick}></Button>
        <Button infoOfButton={sixButton} onclick={props.onclick}></Button>
        <Button infoOfButton={subtractButton} onclick={props.onclick}></Button>
      </div>
      <div className="row">
        <Button infoOfButton={oneButton} onclick={props.onclick}></Button>
        <Button infoOfButton={twoButton} onclick={props.onclick}></Button>
        <Button infoOfButton={threeButton} onclick={props.onclick}></Button>
        <Button infoOfButton={addButton} onclick={props.onclick}></Button>
      </div>
      <div className="row">
        <Button infoOfButton={zeroButton} onclick={props.onclick}></Button>
        {/* <Button></Button> */}
        <Button infoOfButton={decimalButton} onclick={props.onclick}></Button>
        <Button infoOfButton={equalsButton} onclick={props.onclick}></Button>
      </div>
    </div>
  );
};

export default Calculator;
