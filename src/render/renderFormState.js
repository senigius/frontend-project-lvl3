/* eslint-disable no-param-reassign */
import i18n from 'i18next';

export default (value, elements) => {
  switch (value) {
    case 'invalid':
      elements.input.classList.remove('border-red');
      elements.input.removeAttribute('readonly');
      elements.button.disabled = false;
      elements.feedback.classList.add('text-danger');
      elements.feedback.classList.remove('text-success');
      break;
    case 'processing':
      elements.input.setAttribute('readonly', true);
      elements.button.disabled = true;
      break;
    case 'success':
      elements.button.disabled = false;
      elements.feedback.classList.remove('text-danger');
      elements.feedback.classList.add('text-success');
      elements.input.removeAttribute('readonly');
      elements.input.classList.remove('border-red');
      elements.input.value = '';
      elements.input.focus();
      break;
    default:
      throw new Error(i18n.t('form.missingFormState'));
  }
};
