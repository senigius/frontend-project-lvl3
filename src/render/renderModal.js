export default (post, elements) => {
    elements.modalTitle.textContent = post.title;
    elements.modalBody.textContent = post.description;
    elements.modalLink.href = post.link;
    elements.modalForm.ariahidden = false;
};