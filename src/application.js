import onChange from 'on-change';
import validateUrl from './validateUrl';
import * as _ from 'lodash';

const state = {
    form: {
        valid: 'true',
        processState: '',
        processError: null,
        errors: [],
        urls: [],
        data: '',
    },
};

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
      posts: document.querySelector('.posts'),
      feeds: document.querySelector('.feeds'),
  };

  const state = onChange({
    form: {
        valid: 'true',
        processState: '',
        processError: null,
        errors: {},
        urls: [],
        data: '',
    },
}, render(elements));

elements.form.focus();

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const value = formData.get('url');
    state.form.errors = validateUrl(elements, value, state.form.urls);
    state.form.valid = _.isEmpty(state.form.errors);
    state.form.urls.push(value);
  });
};