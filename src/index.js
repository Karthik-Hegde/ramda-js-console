const consoleInput = document.querySelector(".console-input");
const historyContainer = document.querySelector(".history");

const logResult = (input, output, type = "success") => {
  const outputString =
    output instanceof Array ? `[${output.join(", ")}]` : output.toString();
  const inputLogDiv = document.createElement("div");
  const outputLogDiv = document.createElement("div");

  inputLogDiv.classList.add("console-input-log");
  if (type === "success") outputLogDiv.classList.add("console-output-log");
  else outputLogDiv.classList.add("console-output-log", "error");

  inputLogDiv.textContent = `> ${input}`;
  outputLogDiv.textContent = `${outputString}`;
  historyContainer.append(inputLogDiv, outputLogDiv);
};

consoleInput.addEventListener("keyup", (e) => {
  const code = consoleInput.value.trim();

  if (code.length === 0) {
    return;
  }

  if (e.key === "Enter") {
    try {
      logResult(code, eval(code));
    } catch (error) {
      logResult(code, error, "error");
    }

    consoleInput.value = "";
    historyContainer.scrollTop = historyContainer.scrollHeight;
  }
});
