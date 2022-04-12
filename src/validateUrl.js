import * as Yup from 'yup';
import * as _ from 'lodash';

const validateLastUrl = (url, urls) => {
    const schema = Yup.string().url();
    try {
        schema.validateSync(url);
        return '';
      } catch (e) {
        return 'Ссылка должна быть валидным URL';
      }
};

export default validateLastUrl;