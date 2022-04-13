import onChange from 'on-change';
import i18n from 'i18next';
import ru from './locales/ru.js';
import en from './locales/en.js';
import renderFormState from './render/renderFormState.js';
import renderFeedback from './render/renderFeedback.js';
import handleSubmit from './handleSubmit.js';
import renderFeeds from './render/renderFeeds.js';
import renderPosts from './render/renderPosts.js';

const render = (elements) => (path, value) => {
    switch (path) {
        case 'form.lng':
          i18n.changeLanguage(value).then(() => changeDocLang(elements));
          break;
        
        case 'form.state':
          renderFormState(value, elements);
          break;
        
        case 'form.feedback':
          renderFeedback(value, elements);
          break;
        
        case 'form.feeds':
          renderFeeds(value, elements);
          break;

        case 'form.posts':
          renderPosts(value, elements);
          break;

        default:
          break;
      }
};


export default () => {
  const defaultLanguage = 'ru';

  i18n.init({
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
        state: '',
        feedback: '',
        feeds: [],
        posts: [],
    },
  }, render(elements));

  elements.form.focus();
  elements.form.addEventListener('submit', handleSubmit(state));
};