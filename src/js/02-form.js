const formEl = document.querySelector('.feedback-form');
const FEEDBACK_FORM_STATE = 'feedback-form-state';

formEl.addEventListener('input', event => {
  const { email, message } = event.currentTarget;

  const inputData = {
    [email.name]: email.value.trim(),
    [message.name]: message.value.trim(),
  };

  localStorage.setItem(FEEDBACK_FORM_STATE, JSON.stringify(inputData));
});

formEl.addEventListener('submit', event => {
  event.preventDefault();
  const { email, message } = event.currentTarget;
  if (!email.value || !message.value) {
    alert('Both form fields must be filled in');
    return;
  }
  const submitData = {
    [email.name]: email.value.trim(),
    [message.name]: message.value.trim(),
  };
  console.log(submitData);
  localStorage.removeItem(FEEDBACK_FORM_STATE);
  formEl.reset();
});

document.addEventListener('DOMContentLoaded', reloadPage);

function reloadPage() {
  if (!localStorage.getItem(FEEDBACK_FORM_STATE)) return;

  try {
    const { email, message } = JSON.parse(
      localStorage.getItem(FEEDBACK_FORM_STATE)
    );
    formEl.email.value = email;
    formEl.message.value = message;
  } catch (e) {
    console.log(e.message);
  }
}
