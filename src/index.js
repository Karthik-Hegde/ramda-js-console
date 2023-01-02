const {
  pipe,
  ifElse,
  tryCatch,
  when,
  trim,
  prop,
  curry,
  isEmpty,
} = require("ramda");

const consoleInput = document.querySelector(".console-input");
const historyContainer = document.querySelector(".history");

const getOutputString = (output) =>
  output instanceof Array ? `[${output.join(", ")}]` : output.toString();

const trimString = (element) => pipe(prop("value"), trim)(element);

const logResult = (input, output, type) => {
  const inputLogDiv = document.createElement("div");
  const outputLogDiv = document.createElement("div");

  inputLogDiv.classList.add("console-input-log");
  if (type === "success") outputLogDiv.classList.add("console-output-log");
  else outputLogDiv.classList.add("console-output-log", "error");

  inputLogDiv.textContent = `> ${input}`;
  outputLogDiv.textContent = `${getOutputString(output)}`;
  historyContainer.append(inputLogDiv, outputLogDiv);
};

const curriedLogResult = curry(logResult);

const reset = () => {
  consoleInput.value = "";
  historyContainer.scrollTop = historyContainer.scrollHeight;
};

const handleKeyupEvent = (e) => {
  pipe(
    trimString,
    ifElse(
      isEmpty,
      () => null,
      (code) => {
        pipe(
          when(
            () => prop("key", e) === "Enter",
            () => {
              tryCatch(
                () => curriedLogResult(code)(eval(code))("success"),
                (error) => curriedLogResult(code)(error)("error")
              )();
              reset();
            }
          )
        )(code);
      }
    )
  )(consoleInput);
};

consoleInput.addEventListener("keyup", handleKeyupEvent);
