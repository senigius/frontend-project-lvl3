export default (posts) => posts
  .filter((post) => post.readed === true)
  .forEach((item) => {
    const id = item.postId;
    const link = document.querySelector(`[data-id="${id}"]`);
    link.classList.remove('fw-bold', 'font-weight-bold');
    link.classList.add('fw-normal', 'font-weight-normal', 'text-secondary');
  });
