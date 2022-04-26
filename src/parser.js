export default (response) => {
  const parser = new DOMParser();
  const data = parser.parseFromString(response.data.contents, 'application/xml');

  const error = data.querySelector('parserError');
  if (error) {
    throw new Error(error.textContent);
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
