import i18n from "i18next";

export default (value, elements) => {
    console.log(value)
    elements.posts.innerHTML = `
    <h2>${i18n.t('posts')}</h2>
    <ul class="list-group">
      ${value.map(({ title, link, id }) => `
          <li class="list-group-item d-flex justify-content-between align-items-start">
            ${
              link
                ? `<a href="${link}" class="font-weight-bold" data-id="${id}" target="_blank" rel="noopener noreferrer">
                    ${title}
                  </a>`
                : title
            }
            <button type="button" class="btn btn-primary btn-sm" data-id="${id}" data-toggle="modal" data-target="#modal">
              ${i18n.t('view')}
            </button>
          </li>
        `
      ).join('')}
    </ul>
  `;
};