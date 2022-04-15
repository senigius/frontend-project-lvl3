import i18n from 'i18next';
import ru from './locales/ru.js';
import handleSubmit from './handleSubmit.js';
import buildWatchedState from './render/index.js';
import handleClick from './handleClick.js';

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
  };

  const state = {
    lng: defaultLanguage,
    form: {
        state: '',
        feedback: '',
        feeds: [],
        posts: [],
    },
    modal: {
      openedPostId: null,
    },
    viewedPostsIds: [],
  };

  const watchedState = buildWatchedState(state, elements);

  elements.form.focus();
  elements.form.addEventListener('submit', handleSubmit(watchedState));
  elements.posts.addEventListener('click', handleClick(watchedState));
};