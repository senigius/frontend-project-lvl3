/* eslint-disable no-param-reassign */
import axios from 'axios';
import * as yup from 'yup';
import * as _ from 'lodash';
import i18n from 'i18next';
import parse from './parser.js';

const stateConstants = {
  processing: 'processing',
  success: 'success',
  invalid: 'invalid',
};

// каждые 5 секунд проверка на новые посты
const timeout = 5000;
const delay = 5000;

// avoid Same-origin policy problems when pulling content
const allOrigins = 'https://allorigins.hexlet.app/get?url=';

const normalizeData = (data, url, feedId = null) => {
  const feed = {
    id: feedId ?? _.uniqueId(),
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

const fetchData = (url) => axios
  .get(`${allOrigins}${encodeURIComponent(url)}`, { timeout, params: { disableCache: true } })
  .then((response) => response)
  .catch(() => Promise.reject(new Error(i18n.t('form.errorNetwork'))));

const validate = (url) => {
  yup.setLocale({
    string: {
      url: i18n.t('form.errorInvalidUrl'),
    },
  });
  const schema = yup.string().url();
  return schema.validate(url);
};

const validateForm = (state, url) => validate(url).then(() => {
  if (_.find(state.form.feeds, { url })) {
    throw new Error(i18n.t('form.errorDublicate'));
  }
});

const updateFeeds = (state) => {
  const promises = state.form.feeds
    .map(({ id, url }) => fetchData(url)
      .then((response) => {
        const newData = normalizeData(parse(response), url, id);
        const oldData = state.form.posts.filter(({ feedId }) => feedId === id);

        const newPosts = _.differenceBy(newData.posts, oldData, 'title');
        if (!_.isEmpty(newPosts)) {
          state.form.posts = [...newPosts, ...state.form.posts];
        }
      })
      .catch((e) => console.log(e)));
  Promise.all(promises)
    .finally(() => {
      setTimeout(() => updateFeeds(state), delay);
    });
};

const handleSubmit = (state) => {
  setTimeout(() => updateFeeds(state), timeout);
  return (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('url');
    validateForm(state, url)
      .then(() => {
        state.form.state = stateConstants.processing;
        state.form.feedback = '';
        return fetchData(url);
      })
      .then((response) => {
        const parsedData = normalizeData(parse(response), url);
        state.form.state = stateConstants.success;
        state.form.feeds = [parsedData.feed, ...state.form.feeds];
        state.form.posts = [...parsedData.posts, ...state.form.posts];
        state.form.feedback = i18n.t('form.successInput');
      })
      .catch((error) => {
        state.form.state = stateConstants.invalid;
        state.form.feedback = error.message;
      });
  };
};
export default handleSubmit;
