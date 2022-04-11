import * as Yup from 'yup';
import * as _ from 'lodash';

const validateLastUrl = (elements, url, urls) => {
    const schema = Yup.string().url();
    try {
        schema.validateSync(url);
        return {};
      } catch (e) {
        elements.input.classList.add('border-red');
        return (e.inner);
      }
};

export default validateLastUrl;