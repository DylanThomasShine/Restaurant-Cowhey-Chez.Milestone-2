$(document).ready(function() {

    const submitButton = $('#reservation-submit-button');
    setDateInput();

    // grabbing the fields and adding an event listener
    // using arrays to organise the order of the booking form as it is laid out
    // using predicate functions to determine the field element values and regexp to find certain patterns

    const fieldValidators = [
        { 
            id: 'customerName', 
            validators: [
                { 
                    name: 'required', 
                    fn: fieldHasEmptyValue, 
                    message: 'We need your name to make the reservation' 
                }
            ]
        },
        {
            id: 'customerPhoneNumber',
            validators: [
                { 
                    name: 'required', 
                    fn: fieldHasEmptyValue, 
                    message: 'Please enter your phone number so we can call you back' 
                },
                { 
                    name: 'pattern', 
                    fn: (fieldElement) => noPatternMatch(fieldElement, /^\d+$/), 
                    message: 'Please enter digits only' 
                }
            ]
        },
        {
            id: 'customerEmail',
            validators: [
                { 
                    name: 'required', 
                    fn: fieldHasEmptyValue, 
                    message: 'We will need your email address to confirm the booking. ' 
                },
                { 
                    name: 'pattern', 
                    fn: (fieldElement) => noPatternMatch(fieldElement, /^[^\s@]+@[^\s@]+$/), 
                    message: 'Please enter a valid email address' 
                }
            ]
        },
        {
            id: 'customerSeatCount',
            validators: [
                { 
                    name: 'required', 
                    fn: fieldHasEmptyValue, 
                    message: 'A customer seat count is required' 
                },
                { 
                    name: 'pattern', 
                    fn: (fieldElement) => noPatternMatch(fieldElement, /^[1-6]$/), 
                    message: 'Please enter a number between 1 and 6...for groups larger than 6 please contact us directly by telephone....thank you.' 
                }
            ]
        }
    ];

    submitButton.click((event) => {
        event.preventDefault();

    // Clear previous error states

        Array.from(document.querySelectorAll('.form-group input')).forEach(formField => {
            $(formField).toggleClass('error', false);
        });

        resetFormStatus().hide();

        for (const field of fieldValidators) {
            const fieldElement = $(`#${field.id}`);

            for (const validator of field.validators ) {
                if (validator.fn(fieldElement)) {
                    
                    $('#form-status')
                        .toggleClass('error', true)
                        .text(validator.message)
                        .show();

                    fieldElement.toggleClass('error', true)
                    return;
                }
            }
        } 
        submitReservationRequest();
    });
  
});

    // Validator Functions 
    // using booleans and patterns to determine the outcome of the user input

function fieldHasEmptyValue(formField) {
    return formField.val().trim() === '';
}

function noPatternMatch(formField, pattern) {
    return pattern.test(formField.val()) === false;
}

function submitReservationRequest() {
    const formStatus = resetFormStatus();

    // creating a temporary message to show the user that the form is active

    formStatus
        .toggleClass('info', true)
        .text('Sending Request...')
        .fadeIn(); 

    // Creating a timelimit for the message to the user before it fades out

    setTimeout(() => {
        formStatus
            .toggleClass('info', false)
            .toggleClass('success', true)
            .text('Thank you for your reservation, we will be in touch shortly to confirm your booking.')
    }, 2000);

    setTimeout(() => {
        $('#form-status').text('').fadeOut();
        $('#reservation-form').each(function() {
            this.reset();
        });
        setDateInput();
    }, 10000);
}

    // Setting the format of the date input 
    // zero padding to ensure there is a zero before the number

function setDateInput() {
    const dateInput = $('#customerDate');
    const nowFormatted = getDateString(new Date());

    dateInput.val(nowFormatted);
    dateInput.attr('min', nowFormatted);
}

function getDateString(date) {
    const dayString = `0${date.getDate()}`.slice(-2);
    const monthString = `0${date.getMonth() + 1}`.slice(-2);
    const yearString = date.getFullYear();

    return `${yearString}-${monthString}-${dayString}`;
}

    // Resetting the form 

function resetFormStatus() {
    const formStatus = $('#form-status');

    formStatus
        .toggleClass(['success', 'error', 'info'], false)
        .text('');

    return formStatus;
}

