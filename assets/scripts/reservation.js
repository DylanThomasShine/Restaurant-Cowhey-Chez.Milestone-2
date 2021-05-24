$(document).ready(function() {

    const submitButton = $('#reservation-submit-button');

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
                    message: 'We need your phone number in case something changes' 
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
                    message: 'We may need to contact you through email' 
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
                    fn: (fieldElement) => noPatternMatch(fieldElement, /^[2-8]$/), 
                    message: 'Please enter a number between 2 and 8' 
                }
            ]
        }
    ];

    submitButton.click((event) => {
        event.preventDefault();

        // Clear previous error states
        // 
        Array.from(document.querySelectorAll('.form-group input')).forEach(formField => {
            console.log(formField);
            $(formField).toggleClass('error', false);
        });

        $('#form-error').text('').hide();


        for (const field of fieldValidators) {
            const fieldElement = $(`#${field.id}`);

            for (const validator of field.validators ) {
                if (validator.fn(fieldElement)) {
                    
                    $('#form-error').text(validator.message).show();

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
    console.log('field', formField.val());
    return formField.val().trim() === '';
}

function noPatternMatch(formField, pattern) {
    return pattern.test(formField.val()) === false;
}

function submitReservationRequest() {
    console.log('REQUEST SUBMITTED');

// Creating a timelimit for the message to the user before it fades out

    setTimeout(() => {
        $('#form-error').text('Thank you for your reservation, we will be in touch shortly to confirm your booking').show();
    }, 2000);

    setTimeout(() => {
        $('#form-error').text().hide();
    }, 4000);
}

