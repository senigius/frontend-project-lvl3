import renderFormState from './renderFormState.js';
import renderFeedback from './renderFeedback.js';
import renderFeeds from './renderFeeds.js';
import renderPosts from './renderPosts.js';
import onChange from 'on-change';

export default (state, elements) => {
  const watchedState = onChange(state, (path, value) => {
    switch (path) {
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
        renderPosts(value, elements, watchedState.viewedPostsIds);
        break;

      case 'viewedPostsIds':
        renderPosts(watchedState.form.posts, elements, value);
        break;
      
      case 'modal.openedPostId':
  
        break;

      default:
        throw new Error(console.log(`Render state ${path} is missing`));
    }
  });
  return watchedState;
};