import i18n from "i18next";

export default (value, elements) => {
    elements.feeds.innerHTML = `
    <h2>${i18n.t('feeds')}</h2>
    <ul class="list-group mb-5">${value.map(({ title, description }) => `
        <li class="list-group-item">
          <h3>${title}</h3>
          <p>${description}</p>
        </li>
      `
    ).join('')}</ul>
  `;
};