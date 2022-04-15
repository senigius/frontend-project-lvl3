import i18n from "i18next";

const buildPostLink = (title, link, id) => {
  const aElement = document.createElement('a');
  aElement.href = link;
  aElement.classList.add('text-decoration-none');
  aElement.setAttribute('data-id', id);
  aElement.setAttribute('target', '_blank');
  aElement.setAttribute('rel', 'noopener noreferrer');
  aElement.textContent = title;
  return aElement;
};

const buildPostButton = (id) => {
  const button = document.createElement('button');
  button.setAttribute('type', 'button');
  button.classList.add('btn', 'btn-primary', 'btn-sm');
  button.setAttribute('data-id', id);
  button.setAttribute('data-bs-toggle', 'modal');
  button.setAttribute('data-bs-target', '#modal');
  button.textContent = i18n.t('previewButton');
  return button;
};

export default (posts, elements, viewedPostsIds) => {
  elements.posts.innerHTML = '';

  const postsTitle = document.createElement('h2');
  postsTitle.textContent = i18n.t('posts');
  const ul = document.createElement('ul');
  ul.classList.add('list-group', 'mb-5');

  posts.forEach(({ title, link, id}) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start');
    
    const postLink = buildPostLink(title, link, id);
    const fontWeights = viewedPostsIds.includes(id)
    ? ['fw-normal', 'font-weight-normal', 'text-secondary']
    : ['fw-bold', 'font-weight-bold'];
    postLink.classList.add(...fontWeights);
  
    const button = buildPostButton(id);
    li.append(postLink, button);
    ul.append(li);
  });
  const fragment = new DocumentFragment();
  fragment.append(postsTitle, ul);
  elements.posts.append(fragment);
}