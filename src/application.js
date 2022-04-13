import onChange from 'on-change';
import i18next from 'i18next';
import ru from './locales/ru.js';
import en from './locales/en.js';
import validateUrl from './validateUrl';
import makeFeedback from './makeFeedback.js';
import getDataFromUrl from './getDataFromUrl.js';

const render = (elements, i18nInstance) => (path, value) => {
    switch (path) {
        case 'form.lng':
          i18nInstance.changeLanguage(value).then(() => changeDocLang(elements, i18nInstance));
          break;
        
        case 'form.urls':
          getDataFromUrl(elements, value);
          break;

        default:
          break;
      }
};


export default () => {
  const defaultLanguage = 'ru';

  const i18nInstance = i18next.createInstance();
  i18nInstance.init({
    lng: defaultLanguage,
    debug: false,
    resources: { en, ru },
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
        valid: 'true',
        processState: '',
        processError: null,
        error: '',
        urls: [],
        data: '',
    },
  }, render(elements, i18nInstance));

  elements.form.focus();

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const value = formData.get('url');
    state.form.error = validateUrl(value, i18nInstance);
    if (state.form.urls.includes(value)) {
      state.form.error = i18nInstance.t('form.errorDublicate');
    }
    if (state.form.error === '') {
      state.form.urls.push(value);
    }
    makeFeedback(elements, state.form.error, i18nInstance);
    state.form.error = '';
  });
};