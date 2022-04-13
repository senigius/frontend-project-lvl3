import _ from 'lodash';
import i18n from 'i18next';

export default (response) => {
    const newParser = new DOMParser();
    const data = newParser.parseFromString(response.data.contents, 'application/xml');
    const error = data.querySelector('parseerror');
    if (error) return { error: i18n.t('form.errorLinkDoNotProvideRSS') };
    
    const feedId = _.uniqueId();
    const postsElements = [...data.querySelectorAll('channel item')];
    const posts = postsElements.map((post) => ({
        description: post.querySelector('description').textContent,
        feedId,
        id: `${feedId}${post.querySelector('title').textContent}`,
        link: post.querySelector('link').textContent,
        title: post.querySelector('title').textContent,
        read: false,
    }));
    const title = data.querySelector('channel title').textContent;
    const description = data.querySelector('channel description').textContent;

    return {
        description,
        title,
        id: feedId,
        posts,
    };
};