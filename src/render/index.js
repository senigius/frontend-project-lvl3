import renderFormState from './renderFormState.js';
import renderFeedback from './renderFeedback.js';
import renderFeeds from './renderFeeds.js';
import renderPosts from './renderPosts.js';

export default (elements) => (path, value) => {
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
          renderPosts(value, elements);
          break;

        default:
          break;
      }
};