import * as yup from 'yup';
import onChange from 'on-change';

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

const schema = yup.string()
        .matches(
            /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
            'Enter correct url!'
        ).required('Please enter website');

const validate = (url) => {
  try {
    schema.validateSync(url, { abortEarly: false });
    return {};
  } catch (e) {
    return keyBy(e.inner, 'path');
  }
};

const render = (elements) => (path, value, prevValue) => {
    switch (path) {
        case 'form.processState':
          handleProcessState(elements, value);
          break;
    
        case 'form.processError':
          handleProcessError();
          break;
    
        case 'form.valid':
          elements.submitButton.disabled = !value;
          break;
    
        case 'form.errors':
          renderErrors(elements, value, prevValue);
          break;
    
        default:
          break;
      }
};


export default () => {
    const elements = {
        form: document.querySelector('rss-form'),
        input: document.getElementById('url-input'),
        button: document.querySelector('button[type="submit"]'),
        posts: document.querySelector('.posts'),
        feeds: document.querySelector('.feeds'),
    };

    const stateOnChange = onChange(state, render(elements));

    elements.input.addEventListener('change', (e) => {

    })
}