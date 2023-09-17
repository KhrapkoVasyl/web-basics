const form = document.querySelector('.form');

const formValidationRegexps = {
  fullName: /^[А-ЯЇІЄҐ][а-яїієґ']+\s[А-ЯЇІЄҐ]\.[А-ЯЇІЄҐ]\.$/,
  ID_сard: /^[А-ЯЇІЄҐ]{2}\s№[0-9]{6}$/,
  dateOfBirthday: /^(0[1-9]|[12]\d|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/,
  address: /^м\.\s[А-ЯЇІЄҐ][А-ЯЇІЄҐа-яїієґ']+$/,
  email: /^[A-Za-z0-9]+@[A-Za-z]+\.com$/,
};

const clearInvalidFields = (keysArr) => {
  for (const key of keysArr) {
    const inputElement = form.querySelector(`#${key}`);
    inputElement.classList.remove('invalid-input');
  }
};

const showInvalidFields = (invalidFields) => {
  for (const field of invalidFields) {
    const inputElement = form.querySelector(`#${field}`);
    inputElement.classList.add('invalid-input');
  }
};

const showResult = (formDataValues) => {
  const resHtml = `
  <p><b>Введені дані:</b></p>
    <ul>
      <li>ПІБ: ${formDataValues.fullName}</li>
      <li>ID-card: ${formDataValues.ID_сard}</li>
      <li>Дата народження: ${formDataValues.dateOfBirthday}</li>
      <li>Адреса: ${formDataValues.address}</li>
      <li>e-mail: ${formDataValues.email}</li>
    </ul>
    <button id="button-close">Закрити</button>
  `;
  const resultWindowWidth = 300;
  const resultWindowHeight = 250;

  const resultWindow = window.open(
    '/lab2/form-result',
    '',
    `width=${resultWindowWidth}px, height=${resultWindowHeight}px`
  );
  resultWindow.setTimeout(() => (resultWindow.document.title = 'form-result'));
  resultWindow.moveBy(
    window.screen.availWidth / 2 - resultWindowWidth / 2,
    window.screen.availHeight / 2 - resultWindowHeight / 2
  );
  resultWindow.document.write(`<div>${resHtml}<div>`);
  const buttonClose = resultWindow.document.getElementById('button-close');
  buttonClose.addEventListener('click', () => {
    resultWindow.close();
  });
};

const validateFormField = (key, value) =>
  formValidationRegexps[key].test(value);

const checkFormData = (formData) => {
  const formDataValues = {};
  const invalidFields = [];
  for (const [key, value] of formData) {
    formDataValues[key] = value;
    const isValid = validateFormField(key, value);
    if (!isValid) invalidFields.push(key);
  }
  clearInvalidFields(Object.keys(formDataValues));
  if (invalidFields.length !== 0) {
    showInvalidFields(invalidFields);
    return;
  }
  showResult(formDataValues);
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  checkFormData(formData);
});
