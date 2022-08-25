const numberButtons = document.querySelectorAll(".numbers");
const operationButtons = document.querySelectorAll(".operation");
const currentNumField = document.querySelector(".current-field");
const previousNumField = document.querySelector(".previous-field");
const equalsButton = document.querySelector(".equals");
const deleteButton = document.querySelector(".delete");
const deleteAllButton = document.querySelector(".delete-all");
const changeSignButton = document.querySelector(".change-sign");
const sqrtButton = document.querySelector(".sqrt");

class Calculator {
  // В конструкторе будем клать текстовые элементы, которые будем изменять
  constructor(previousNumElement, currentNumElement) {
    this.previousNumElement = previousNumElement;
    this.currentNumElement = currentNumElement;
    // Обнуляем все, чтобы не было ошибок при каждом новом вызове калькулятора
    this.deleteAll();
  }

  deleteAll() {
    this.currentNum = "";
    this.previousNum = "";
    this.operation = undefined;
  }

  // Функция для контроля ввода
  addNumber(number) {
    // Не даем ввести точку > 1 раза
    if (number === "." && this.currentNum.indexOf(".") !== -1) {
      return;
    }
    // Приводим всё на всякий случай к сторке, чтобы вводимые значения не складывались
    this.currentNum = this.currentNum.toString() + number.toString();
  }

  chooseOperation(operation) {
    // Проверяем что у нас не пустой ввод
    if (this.currentNum === "") return;
    // Проверяем, если у нас что то уже введено и мы хоти провести еще одну операцию,
    // то сначала посчитаем то что уже было введено
    if (this.previousNum !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousNum = this.currentNum;
    this.currentNum = "";
  }

  // Работает с элементами, которые мы помещаем в конструктор
  updateDisplay() {
    this.currentNumElement.innerText = this.currentNum;
    this.previousNumElement.innerText = this.previousNum;
    if (isNaN(this.currentNum)) {
      this.deleteAll();
    }
  }

  delete() {
    this.currentNum = this.currentNum.toString().slice(0, -1);
  }

  changeSign() {
    const currStr = this.currentNum.toString();
    if (currStr.indexOf("-") === 0) {
      this.currentNum = currStr.substring(1, currStr.length);
    } else {
      this.currentNum = "-" + currStr;
    }
  }

  sqrt() {
    const curr = parseFloat(this.currentNum);
    if (isNaN(curr)) return;
    this.currentNum = curr > 0 ? this.roundToEight(Math.sqrt(curr)) : "Ошибка";
  }

  roundToEight(num) {
    return Number(Math.round(num + "e+8") + "e-8");
  }

  compute() {
    let compResult;
    const prev = parseFloat(this.previousNum);
    const curr = parseFloat(this.currentNum);
    // Проверяем, если у нас ничего не введено, то не будем проводить вычисления
    if (isNaN(prev) || isNaN(curr)) return;
    switch (this.operation) {
      case "+":
        compResult = this.roundToEight(prev + curr);
        break;
      case "-":
        compResult = this.roundToEight(prev - curr);
        break;
      case "X":
        compResult = this.roundToEight(prev * curr);
        break;
      case "÷":
        compResult = curr !== 0 ? this.roundToEight(prev / curr) : "Ошибка";
        break;
      default:
        return;
    }
    this.currentNum = compResult;
    this.operation = undefined;
    this.previousNum = "";
  }
}

const calculator = new Calculator(previousNumField, currentNumField);

numberButtons.forEach((num) => {
  num.addEventListener("click", () => {
    calculator.addNumber(num.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((op) => {
  op.addEventListener("click", () => {
    calculator.chooseOperation(op.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});

deleteAllButton.addEventListener("click", () => {
  calculator.deleteAll();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

changeSignButton.addEventListener("click", () => {
  calculator.changeSign();
  calculator.updateDisplay();
});

sqrtButton.addEventListener("click", () => {
  calculator.sqrt();
  calculator.updateDisplay();
});
