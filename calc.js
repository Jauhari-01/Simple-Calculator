//====================getting element using Dom by using htmp tag's Proprties================
//--------------------selection of result-Area-elements-----------------------------------
const preFeild =  document.querySelector("[data-pre-operand]");//first oprand
const curFeild =  document.querySelector("[data-cur-operand]");//Second oprand
const tempResultEl =  document.querySelector("[temp-result-display]");

//-----------------Selection of the buttons------------------------------------------------
const numButttons = document.querySelectorAll("[data-number]"); // numbers [0,1,2,3,4,5,6,7,8,9]
const operationBtns = document.querySelectorAll("[data-operation]"); //operation[+,-,*,/]
const equalButton = document.querySelector("[data-equals]"); // equal buttuon "="
const deletebtn = document.querySelector("[data-delete]"); // delete button for 1 digit deletion
const allClearbtn = document.querySelector("[data-all-clear]"); // all clear button "AC"
//============================================================================================

//========== variables for calculation=============
let dis1Num = "";
let dis2Num = "";
let result = null;
let lastOperation = "";
let haveDot = false;

//==========================Adding Events on buttons============================
//botton click events(numbers)
numButttons.forEach((number) => {
    number.addEventListener("click", (e) => {
      if (e.target.innerText === "." && !haveDot) {
        haveDot = true;
      } else if (e.target.innerText === "." && haveDot) {
        return;
      }
      dis2Num += e.target.innerText;
      curFeild.innerText = dis2Num;
      // console.log();
    });
  });

//botton click events(operation buttons)
operationBtns.forEach((operation) => {
  operation.addEventListener("click", (e) => {
    if (!dis2Num) return;
    haveDot = false;
    const operationName = e.target.innerText;
    if (dis1Num && dis2Num && lastOperation) {
      mathOperation();
    } else {
      result = parseFloat(dis2Num);
    }
    clearVar(operationName);
    lastOperation = operationName;
  });
});
//Equal button event
equalButton.addEventListener("click", () => {
  if (!dis2Num || !dis1Num) return;
  haveDot = false;
  mathOperation();
  clearVar();
  curFeild.innerText = result;
  tempResultEl.innerText = "";
  preFeild.innerText = "";
  dis2Num = result;
  dis1Num = "";
});

//AC button event
allClearbtn.addEventListener("click", () => {
  dis1Num = "";
  dis2Num = "";
  preFeild.innerText = "";
  curFeild.innerText = "";
  result = "";
  tempResultEl.innerText = "";
});
//Del button event
deletebtn.addEventListener("click", () => {
  curFeild.innerText = curFeild.innerText.substring(0,curFeild.innerHTML.length-1);
  dis2Num = curFeild.innerText;
});

// Event for keyboard click 
window.addEventListener("keydown", (e) => {
  if (
    e.key === "0" ||
    e.key === "1" ||
    e.key === "2" ||
    e.key === "3" ||
    e.key === "4" ||
    e.key === "5" ||
    e.key === "6" ||
    e.key === "7" ||
    e.key === "8" ||
    e.key === "9" ||
    e.key === "."
  ) {
    clickButtonEl(e.key);
  }else if (e.key === "+" || e.key === "-" || e.key === "/" || e.key === "%" || e.key ==="*") {
    if(e.key === "/"){
      clickOperation("÷");
    }else clickOperation(e.key);
  } else if (e.key == "Enter" || e.key === "=") {
    clickEqual();
  }
});
//======================================================================================== 

//==========================Function section=============================================

//funtion for adding operands in variable 1
//also updating temp result field
function clearVar(currentOperant = "") {
    dis1Num += dis2Num + " " + currentOperant + " ";
    preFeild.innerText = dis1Num;
    curFeild.innerText = "";
    dis2Num = "";
    tempResultEl.innerText = result;
  }

// main logical function where all the mathamatical calculation is happning
function mathOperation() {
  if (lastOperation === "*") {
    result = parseFloat(result) * parseFloat(dis2Num);
  } else if (lastOperation === "+") {
    result = parseFloat(result) + parseFloat(dis2Num);
  } else if (lastOperation === "-") {
    result = parseFloat(result) - parseFloat(dis2Num);
  } else if (lastOperation === "÷") {
    result = parseFloat(result) / parseFloat(dis2Num);
  } else if (lastOperation === "%") {
    result = parseFloat(result) % parseFloat(dis2Num);
  }
}

//funtion for button click on key board(For number)
function clickButtonEl(key) {
  numButttons.forEach((button) => {
    if (button.innerText === key) {
       button.click();
    }
  });
}
//funtion for button click on key board(For Operation)
function clickOperation(key) {
  operationBtns.forEach((operation) => {
    if (operation.innerText === key) {
      operation.click();
    }
  });
}
//funtion for button click on key board(For Enter button Or Equal button)
function clickEqual() {
  equalButton.click();
}
//========================================================================