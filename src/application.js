import onChange from 'on-change';
import * as _ from 'lodash';
import i18n from 'i18next';
import ru from './locales/ru.js';
import en from './locales/en.js';
import validateUrl from './validateUrl';
import makeFeedback from './makeFeedback.js';

const render = (elements) => (path, value, prevValue) => {
    switch (path) {
        case 'form.processState':
          handleProcessState(elements, value);
          break;
        
        case 'form.urls':
          break;
        
        case 'form.processError':
          handleProcessError(elements, value);
          break;

        default:
          break;
      }
};


export default () => {
  const elements = {
      form: document.querySelector('.rss-form'),
      input: document.getElementById('url-input'),
      button: document.querySelector('button[type="submit"]'),
      feedback: document.querySelector('.feedback'),
      posts: document.querySelector('.posts'),
      feeds: document.querySelector('.feeds'),
  };

  const defaultLanguage = 'ru';

  const i18nInstance = i18n.createInstance()
  .then(i18nInstance.init({
    lng: defaultLanguage,
    debug: false,
    resources: { en, ru },
  }));

  const state = onChange({
    form: {
        lng: defaultLanguage,
        valid: 'true',
        processState: '',
        processError: null,
        error: '',
        urls: [],
        data: '',
    },
}, render(elements));

elements.form.focus();

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const value = formData.get('url');
    state.form.error = validateUrl(value);
    if (state.form.urls.includes(value)) {
      state.form.error = 'RSS уже существует';
    }
    if (state.form.error === '') {
      state.form.urls.push(value);
    }
    makeFeedback(elements, state.form.error);
    state.form.error = '';
  });
};