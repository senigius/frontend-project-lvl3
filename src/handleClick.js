export default (state) => (e) => {
    const { target, target: { dataset: { id } } } = e;
    if (!target.hasAttribute('data-id')) {
      return;
    }

    state.modal.openedPostId = id;
    state.viewedPostsIds.push(id);
    console.log(state.viewedPostsIds)
};