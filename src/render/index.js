import renderFormState from './renderFormState.js';
import renderFeedback from './renderFeedback.js';
import renderFeeds from './renderFeeds.js';
import renderPosts from './renderPosts.js';
import renderModal from './renderModal.js';
import renderViewedPosts from './renderViewedPosts.js';

export default (elements) => (path, value) => {
  switch (path) {
    case 'form.state':
      renderFormState(value, elements);
      break;

    case 'form.feedback':
      renderFeedback(value, elements);
      break;

    case 'feeds':
      renderFeeds(value, elements);
      break;

    case 'posts':
      renderPosts(value, elements);
      break;

    case 'viewedPosts':
      renderViewedPosts(value, elements);
      break;

    case 'modal.openedPost':
      renderModal(value, elements);
      break;

    default:
      break;
  }
};
