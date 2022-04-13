import onChange from 'on-change';
import i18n from 'i18next';
import ru from './locales/ru.js';
import handleSubmit from './handleSubmit.js';
import render from './render/index.js';


export default () => {
  const defaultLanguage = 'ru';

  i18n.init({
    lng: defaultLanguage,
    debug: false,
    resources: { ru },
  });

  const elements = {
      form: document.querySelector('.rss-form'),
      input: document.getElementById('url-input'),
      button: document.querySelector('button[type="submit"]'),
      feedback: document.querySelector('.feedback'),
      posts: document.querySelector('.posts'),
      feeds: document.querySelector('.feeds'),
      en: document.querySelector('button[name="en"]'),
      ru: document.querySelector('button[name="ru"]'),
  };

  const state = onChange({
    form: {
        lng: defaultLanguage,
        state: '',
        feedback: '',
        feeds: [],
        posts: [],
    },
  }, render(elements));

  elements.form.focus();
  elements.form.addEventListener('submit', handleSubmit(state));
};