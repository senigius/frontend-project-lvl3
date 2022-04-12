const makeFeedback = (elements, feedback, i18nInstance) => {
    if (feedback === '') {
        elements.feedback.textContent = i18nInstance.t('form.successInput');
        elements.feedback.classList.remove('text-danger');
        elements.input.classList.remove('border-red');
        elements.feedback.classList.add('text-success');
        elements.input.value = '';
        elements.input.focus();
    } else {
        elements.feedback.textContent = feedback;
        elements.feedback.classList.remove('text-success');
        elements.feedback.classList.add('text-danger');
        elements.input.classList.add('border-red');
    }
    elements.form.focus();
};

export default makeFeedback;