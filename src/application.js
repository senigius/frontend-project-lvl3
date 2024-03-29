/* eslint-disable no-param-reassign */
import * as yup from 'yup';
import i18n from 'i18next';
import onChange from 'on-change';
import axios from 'axios';
import _ from 'lodash';
import 'bootstrap';

import ru from './locales/ru.js';
import parse from './parser.js';
import render from './render/index.js';

const defaultLanguage = 'ru';

const stateConstants = {
  processing: 'processing',
  success: 'success',
  invalid: 'invalid',
};

// каждые 5 секунд проверка на новые посты
const timeout = 5000;

// avoid Same-origin policy problems when pulling content
const allOrigins = 'https://allorigins.hexlet.app/get?';

const normalizeData = (data, url, feedId = null) => {
  feedId = feedId ?? _.uniqueId();
  const feed = {
    id: feedId,
    title: data.title,
    description: data.description,
    url,
  };
  const posts = data.posts.map(({ title, description, link }) => {
    const id = _.uniqueId();
    return {
      id,
      feedId,
      title,
      description,
      link,
    };
  });
  return { feed, posts };
};

const addUnReadedPosts = (posts) => posts
  .map((post) => {
    const { id } = post;
    return { postId: id, readed: false };
  });

const buildValidator = () => {
  const schema = yup.string().url('errorInvalidUrl');
  return (url, feeds) => schema.notOneOf(feeds, 'errorDublicate').validate(url);
};

const buildRequest = (url) => {
  const newUrl = new URL(allOrigins);
  newUrl.searchParams.set('disableCache', 'true');
  newUrl.searchParams.set('url', url);
  return newUrl.toString();
};

const addContent = (url, data, state) => {
  const { feed, posts } = normalizeData(data, url);

  state.urls.push(url);
  state.feeds.push(feed);
  state.posts.unshift(...posts);
  state.viewedPosts.push(...addUnReadedPosts(posts));
};

const updateFeeds = (state) => {
  const promises = state.feeds
    .map(({ id, url }) => axios.get(buildRequest(url))
      .then((response) => {
        const newData = normalizeData(parse(response), url, id);
        const oldData = state.posts.filter(({ feedId }) => feedId === id);

        const newPosts = _.differenceBy(newData.posts, oldData, 'title');
        if (!_.isEmpty(newPosts)) {
          state.posts = [...newPosts, ...state.posts];
          state.viewedPosts.push(...addUnReadedPosts(state.posts));
        }
      })
      .catch((e) => {
        if (axios.isAxiosError(e)) {
          state.form.feedback = 'errorUpdate';
          state.form.state = 'invalid';
        } else console.log(e);
      }));
  Promise.all(promises)
    .finally(() => {
      setTimeout(() => updateFeeds(state), timeout);
    });
};

export default () => i18n.init({
  lng: defaultLanguage,
  debug: false,
  resources: { ru },
})
  .then(() => {
    const state = {
      form: {
        state: '',
        feedback: '',
      },
      urls: [],
      feeds: [],
      posts: [],
      modal: {
        openedPost: null,
      },
      viewedPosts: [],
    };

    const elements = {
      form: document.querySelector('.rss-form'),
      input: document.getElementById('url-input'),
      button: document.querySelector('button[type="submit"]'),
      feedback: document.querySelector('.feedback'),
      posts: document.querySelector('.posts'),
      feeds: document.querySelector('.feeds'),
      modalForm: document.querySelector('.modal'),
      modalTitle: document.querySelector('.modal-title'),
      modalBody: document.querySelector('.modal-body'),
      modalLink: document.querySelector('.full-article'),
    };

    const watchedState = onChange(state, render(elements));

    const validate = buildValidator();

    elements.form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const url = formData.get('url');
      validate(url, state.urls)
        .then((validUrl) => {
          watchedState.form.state = stateConstants.processing;
          watchedState.form.feedback = 'loading';
          return axios.get(buildRequest(validUrl));
        }).then((response) => {
          const parsedData = parse(response);
          addContent(url, parsedData, watchedState);
          watchedState.form.state = stateConstants.success;
          watchedState.form.feedback = 'successInput';
        }).catch((error) => {
          watchedState.form.state = stateConstants.invalid;
          if (axios.isAxiosError(error)) {
            watchedState.form.feedback = 'errorNetwork';
          } else if (error.name === 'ValidationError') {
            watchedState.form.feedback = error.message;
          } else watchedState.form.feedback = 'errorLinkDoNotProvideRSS';
        });
    });

    elements.posts.addEventListener('click', (e) => {
      const { id } = e.target.dataset;
      if (id) {
        const [reviewPost] = watchedState.posts.filter((post) => post.id === id);
        watchedState.modal.openedPost = reviewPost;
        watchedState.viewedPosts.push({ postId: id, readed: true });
      }
    });
    updateFeeds(watchedState);
  });
