import i18n from 'i18next';

export default (response) => {
  const parser = new DOMParser();
  const data = parser.parseFromString(response.data.contents, 'application/xml');
  if (data.querySelector('parsererror')) {
    throw new Error(i18n.t('form.errorLinkDoNotProvideRSS'));
  }

  const postsElements = [...data.querySelectorAll('channel item')];
  const posts = postsElements.map((post) => ({
    description: post.querySelector('description').textContent,
    link: post.querySelector('link').textContent,
    title: post.querySelector('title').textContent,
  }));
  const title = data.querySelector('channel title').textContent;
  const description = data.querySelector('channel description').textContent;

  return { title, description, posts };
};
