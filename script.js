const validityObjs = {};
const form = document.querySelector('.form-container');

function validateForm(e) {
  e.preventDefault();
  const victoryText = document.querySelector('.victory-text');
  victoryText.classList.remove('hide');
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  validateForm(e);
});

function assignValidityProps(elem, validityObj) {
  const keys = Object.keys(validityObj.props);
  const { key: keyStr } = validityObj;
  keys.forEach((prop) => {
    elem[prop] = validityObj.props[prop];
  });
  elem.dataset.key = keyStr;
  validityObjs[keyStr] = validityObj;
}

const emailValidity = {
  props: {
    maxLength: 254,
    type: 'email',
  },
  msgPropPairs: [
    { propCheck: 'tooLong', msg: 'Email must be shorter than 255 characters' },
    { propCheck: 'typeMismatch', msg: 'Please enter a valid email' },
  ],
  key: 'email',
};

const zipCodeValidity = {
  props: { pattern: '^\\d{5}$' },
  msgPropPairs: [
    { propCheck: 'patternMismatch', msg: 'Zip code must be 5 numbers' },
  ],
  key: 'zipCode',
};

const passwordValidity = {
  props: {
    pattern: '.*(?=.*?[\\W_])(?=.*?\\d).*',
    minLength: 6,
    maxLength: 20,
  },
  msgPropPairs: [
    {
      propCheck: 'patternMismatch',
      msg: 'Password must contain a special character, a letter, and a number',
    },
    {
      propCheck: 'tooLong',
      msg: 'Password cannot be longer than 20 characters',
    },
    {
      propCheck: 'tooShort',
      msg: 'Password must not be shorter than 6 characters',
    },
  ],

};

const countryValidity = {
  props: {
    maxLength: 56,
    pattern: '^[A-Z][a-z]*$',
  },
  msgPropPairs: [
    { propCheck: 'patternMismatch', msg: 'Country name must start with a capital letter' },
    { propCheck: 'tooLong', msg: 'Country name cannot be longer then 56 characters.' },
  ],
  key: 'country',
};

function handleValidationOnNoFocus(e) {
  const elem = e.target;
  const { id } = elem;
  const validityState = elem.validity;
  if (!validityState.valid) {
    const errorMsg = document.querySelector(`#${id} + .validation-text`);
    const { key } = elem.dataset;
    let text = '';
    const { msgPropPairs } = validityObjs[key];
    msgPropPairs.forEach((obj) => {
      if (validityState[obj.propCheck]) {
        text = obj.msg;
        elem.setCustomValidity(obj.msg);
      }
    });
    if (validityState.valueMissing) {
      text = 'Please fill in this field';
    }
    errorMsg.innerText = text;
    elem.reportValidity();
  }
}

function handleValidationOnInput(e) {
  const elem = e.target;
  elem.setCustomValidity('');
  const { id } = elem;
  const validityState = elem.validity;
  if (validityState.valid) {
    const errorMsg = document.querySelector(`#${id} + .validation-text`);
    errorMsg.innerText = '';
  }
}

const email = document.querySelector('#email');
const country = document.querySelector('#country-name');
const zipCode = document.querySelector('#zipCode');
const password = document.querySelector('#password');

const pairs = [
  [email, emailValidity],
  [country, countryValidity],
  [zipCode, zipCodeValidity],
  [password, passwordValidity],
];

pairs.forEach((el) => {
  assignValidityProps(el[0], el[1]);
  el[0].required = true;
  el[0].addEventListener('focusout', (e) => {
    handleValidationOnNoFocus(e);
  });
  el[0].addEventListener('input', (e) => {
    handleValidationOnInput(e);
  });
});

const confirmPassword = document.querySelector('#confirm-password');
confirmPassword.required = true;

function validateConfirmPass() {
  const passwordVal = document.querySelector('#password').value;
  const confirmPass = document.querySelector('#confirm-password');
  if (confirmPass.value !== '') {
    if (confirmPass.value !== passwordVal) {
      confirmPass.setCustomValidity('Passwords must match');
      confirmPass.reportValidity();
      const errMsg = document.querySelector(`#${confirmPass.id} + .validation-text`);
      errMsg.innerText = 'Passwords must match';
    }
  }
}

function validateConfirmPassOnInput() {
  const passwordVal = document.querySelector('#password').value;
  const confirmPass = document.querySelector('#confirm-password');
  if (confirmPass.value === passwordVal) {
    confirmPass.setCustomValidity('');
    const errMsg = document.querySelector(`#${confirmPass.id} + .validation-text`);
    errMsg.innerText = '';
  }
}

confirmPassword.addEventListener('focusout', validateConfirmPass);
confirmPassword.addEventListener('input', validateConfirmPassOnInput);
