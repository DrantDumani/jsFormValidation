const inputs = document.querySelectorAll('.input-box>input');
inputs.forEach((elem) => {
  requireInput(elem);
  elem.addEventListener('focusout', () => {
    if (!elem.valid) {

    }
  });
});

function requireInput(inputElem) {
  inputElem.required = true;
}

function assignValidation(inputForm, validationObj) {
  const keys = Object.keys(validationObj);
  keys.forEach((key) => {
    inputForm.key = validationObj.key;
  });
}

const countryValid = {
  pattern: /^[A-Z]/,
};

const zipCodeValid = {
  pattern: /d{5}/,
};

const passwordValid = {
  pattern: /^(?=.*?[\W_])(?=.*?\d).{6,}$/,
};
