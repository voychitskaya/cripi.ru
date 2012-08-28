$(function () {
    var $form = $('.js-form');
    $form.find('input, textarea').removeAttr('disabled');

    function isValidForm(formData) {
        for (var i = 0, c = formData.length, item; i < c; i++) {
            item = formData[i];
            if (!item.value) {
                return false;
            }
        }

        return true;
    }

    function convertFormDataToObject(formData) {
        var result = {};
        for (var i = 0, c = formData.length, item; i < c; i++) {
            item = formData[i];
            result[item.name] = item.value;
        }

        return result;
    }

    $form.on('submit', function () {
        var formData = $form.serializeArray(),
            counter = window.yaCounter16788463,
            metrikaParams = {};

        if (!isValidForm(formData)) {
            $('.js-warning').text('Необходимо заполнить все поля!');
            return false;
        }

        if (counter) {
            formData = convertFormDataToObject(formData);
            metrikaParams[formData['email']] = formData;

            counter.params(metrikaParams);
            $('.js-submit').val('Спасибо, заявка отправлена!');
            $form.find('input, textarea').attr('disabled', 'disabled');
        }

        return false;
    });
});