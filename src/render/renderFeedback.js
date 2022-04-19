/* eslint-disable no-param-reassign */
import i18n from 'i18next';

export default (value, elements) => {
  elements.feedback.textContent = i18n.t(`form.${value}`);
};
