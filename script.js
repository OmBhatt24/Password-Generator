const NumberOfCharRange = document.getElementById("NumberOfCharRange");
const NumberOfCharNumber = document.getElementById("NumberOfCharNumber");
const form = document.getElementById("passwordGeneratorForm");
const Uppercase = document.getElementById("upperCase");
const Numbers = document.getElementById("number");
const Symbols = document.getElementById("symbols");
const password = document.getElementById("password");
const myTooltip = document.getElementById("myTooltip");
const arrayLowToHigh = (low, high) => {
  const array = [];
  for (let i = low; i <= high; i++) {
    array.push(String.fromCharCode(i));
  }
  return array;
};

const UPPERCASE_CHAR_CODE = arrayLowToHigh(65, 90);
const LOWERCASE_CHAR_CODE = arrayLowToHigh(97, 122);
const NUMBER_CHAR_CODE = arrayLowToHigh(48, 57);
const SYMBOL_CHAR_CODE = arrayLowToHigh(33, 47)
  .concat(arrayLowToHigh(58, 64))
  .concat(arrayLowToHigh(91, 96))
  .concat(arrayLowToHigh(123, 126));

const generatePassword = (
  characterAmount,
  includeUppercase,
  includeNumbers,
  includeSymbols
) => {
  let password = [];
  let char_code = LOWERCASE_CHAR_CODE;
  if (includeUppercase) {
    char_code = char_code.concat(UPPERCASE_CHAR_CODE);
  }
  if (includeNumbers) {
    char_code = char_code.concat(NUMBER_CHAR_CODE);
  }
  if (includeSymbols) {
    char_code = char_code.concat(SYMBOL_CHAR_CODE);
  }

  for (let i = 0; i <= characterAmount; i++) {
    password.push(char_code[Math.floor(Math.random() * char_code.length)]);
  }
  password = password.join("");
  console.log(password);
  //   console.log(password);
  return password;
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const includeUppercase = Uppercase.checked;
  const includeNumbers = Numbers.checked;
  const includeSymbols = Symbols.checked;
  const characterAmount = NumberOfCharRange.value;
  const generatedPassword = generatePassword(
    characterAmount,
    includeUppercase,
    includeNumbers,
    includeSymbols
  );
  password.textContent = generatedPassword;
});
const syncCharacterAmount = (e) => {
  const value = e.target.value;

  //   console.log(value);
  NumberOfCharRange.value = value;
  NumberOfCharNumber.value = value;
};
var clipboard = new ClipboardJS(password);

clipboard.on("success", function (e) {
  console.info("Action:", e.action);
  console.info("Text:", e.text);
  console.info("Trigger:", e.trigger);
  e.clearSelection();
});

clipboard.on("error", function (e) {
  console.info("Action:", e.action);
  console.info("Text:", e.text);
  console.info("Trigger:", e.trigger);
});

const handleClick = () => {
  myTooltip.innerText = "copied!";
};
const outFunc = () => {
  myTooltip.innerText = "copy";
};
NumberOfCharRange.addEventListener("input", syncCharacterAmount);
NumberOfCharNumber.addEventListener("input", syncCharacterAmount);
