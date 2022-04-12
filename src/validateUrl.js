import * as Yup from 'yup';
import * as _ from 'lodash';

const validateLastUrl = (url, i18nInstance) => {
    const schema = Yup.string().url();
    try {
        schema.validateSync(url);
        return '';
      } catch (e) {
        return i18nInstance.t('form.errorInvalidUrl');
      }
};

export default validateLastUrl;