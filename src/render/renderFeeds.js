/* eslint-disable no-param-reassign */
import i18n from 'i18next';

export default (value, elements) => {
  elements.feeds.innerHTML = '';

  const feedTitle = document.createElement('h2');
  feedTitle.textContent = i18n.t('feeds');

  const ul = document.createElement('ul');
  ul.classList.add('list-group', 'mb-5');

  value.forEach(({ title, description }) => {
    const postTitle = document.createElement('h3');
    postTitle.textContent = title;

    const pElement = document.createElement('p');
    pElement.textContent = description;

    const li = document.createElement('li');
    li.classList.add('list-group-item', 'border');
    li.append(postTitle, pElement);
    ul.append(li);
  });
  const fragment = new DocumentFragment();
  fragment.append(feedTitle, ul);
  elements.feeds.append(fragment);
};
