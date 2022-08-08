import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('input'),
  message: document.querySelector('textarea'),
};

refs.form.addEventListener('input', throttle(onInput, 500));
refs.form.addEventListener('submit', onFormSubmit);

populateForm();

function onInput(evt) {
  const data = localStorage.getItem(STORAGE_KEY);
  const formData = data ? JSON.parse(data) : {};
  formData[evt.target.name] = evt.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  // console.log(formData);
}

function populateForm() {
  const savedForm = localStorage.getItem(STORAGE_KEY);
  if (savedForm) {
    const parseForm = JSON.parse(savedForm);
    if (parseForm.message) {
      refs.message.value = parseForm.message;
    }
    if (parseForm.email) {
      refs.email.value = parseForm.email;
    }
    // console.log(parseForm);
  }
}

function onFormSubmit(evt) {
  evt.preventDefault();
  const email = evt.currentTarget.email.value;
  const message = evt.currentTarget.message.value;

  if (email === '' || message === '') {
    return alert('You have not filled in all fields!!!');
  }
  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
  console.log('Send form', { email, message });
}
