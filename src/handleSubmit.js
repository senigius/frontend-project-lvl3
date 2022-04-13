import axios from 'axios';
import * as yup from 'yup';
import _ from 'lodash';
import parse from './parser.js';
import i18n from 'i18next';
import refreshTimeout from './refreshTimeout.js'

const allOrigins = 'https://allorigins.hexlet.app/get?url=';

const fetchData = (url) => {
    const newUrl = `${allOrigins}${encodeURIComponent(url)}`;
    return axios
            .get(newUrl, { params: { disableCache: true } })
            .then((response) => response)
            .catch(() => Promise.reject(new Error(i18n.t('form.errorNetwork'))));
};

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
        if (_.find(state.form.feeds, url)) {
            throw new Error (i18n.t('form.errorDublicate'));
        }
    });

const updateFeeds = (state) => () => {
    state.form.feeds.forEach(({ id, url }) => {
        fetchData(url).then((response) => {
            const parsedData = parse(response);
            const { error, posts: newPosts } = parsedData;
            if (error) return;
            const [feedPosts, otherPosts] = _.partition(state.posts, { feedId: id });
            if (!_.isEqual(feedPosts, newPosts)) {
                state.form.posts = [...otherPosts, ...newPosts];
            }
        });
    });
};

const handleSubmit = (state) => {
    const { start: onSuccess, stop: onSubmit } = refreshTimeout(updateFeeds(state));
    return (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const url = formData.get('url');
        validateForm(state, url)
            .then(() => {
                state.form.state = 'processing';
                state.form.feedback = '';
                onSubmit();
                return fetchData(url);
            })
            .then((response) => {
                const parsedData = parse(response);
                const { description, error, id, posts, title } = parsedData;
                if (error) throw new Error(error);
                state.form.state = 'success';
                state.form.feeds.push({ description, id, title, url });
                state.form.posts.push(...posts);
                state.form.feedback = i18n.t('form.successInput');
                onSuccess();
                return parsedData;
            })
            .catch((error) => {
                state.form.state = 'invalid';
                state.form.feedback = error.message;
            });
    };
};
export default handleSubmit;