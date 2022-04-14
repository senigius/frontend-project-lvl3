import axios from 'axios';
import * as yup from 'yup';
import * as _ from 'lodash';
import parse from './parser.js';
import i18n from 'i18next';

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

const fetchData = (url) =>
    axios
        .get(`${allOrigins}${encodeURIComponent(url)}`,
         { timeout: delay, params: { disableCache: true } })
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

const validateForm = (state, url) =>
    validate(url).then(() => {
        if (_.find(state.form.feeds, { url })) {
            throw new Error (i18n.t('form.errorDublicate'));
        }
    });

const updateFeeds = (state) => {
    const promises = state.form.feeds
        .map(({ id, url }) => fetchData(url)
            .then((response) => {
                const parsedData = parse(response);
                const { error, posts: newPosts } = parsedData;
                if (error) return;
                const oldData = state.form.posts.filter(({ feedId }) => feedId === id);
                
                if (!_.isEqual(oldData, newPosts)) {
                    state.form.posts = [...otherPosts, ...newPosts];
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
                const parsedData = parse(response);
                const { description, error, id, posts, title } = parsedData;
                if (error) {
                    state.form.feedback = error;
                    return;
                };
                state.form.state = stateConstants.success;
                state.form.feeds.push({ description, id, title, url });
                state.form.posts.push(...posts);
                state.form.feedback = i18n.t('form.successInput');
                return parsedData;
            })
            .catch((error) => {
                state.form.state = stateConstants.invalid;
                state.form.feedback = error.message;
            });
    };
};
export default handleSubmit;