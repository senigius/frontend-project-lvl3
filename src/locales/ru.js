export default {
    translation: {
        name: 'RSS агрегатор',
        description: 'RSS ленты сегодня одна из лучших возможностей держать руку на пульсе событий',
        form: {
            label: 'Ссылка RSS',
            example: 'Пример: https://ru.hexlet.io/lessons.rss',
            inputButton: 'Добавить',
            errorDublicate: 'RSS уже существует',
            errorInvalidUrl: 'Ссылка должна быть валидным URL',
            errorLinkDoNotProvideRSS: 'Ресурс не содержит валидный RSS',
            errorNetwork: 'Ошибка сети',
            successInput: 'RSS успешно загружен',
            missingFormState: 'Нет подходящего действия для состояния формы'
        },
        feeds: 'Фиды',
        posts: 'Посты',
    },
};