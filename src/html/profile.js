$(document).ready(function() {
    setupForm();

    $('#submit-btn').on('click', function(event) {
        event.preventDefault(); // Prevent the default form submission action
        handleSubmit();
    });
});

function setupForm() {
    if ($('#session1').length) {
        disableFields(false);
    } else {
        disableFirstFourFields();
    }
}

function disableFirstFourFields() {
    $('#first-name, #middle-name, #last-name, #staff-id, #department').prop('disabled', true);
}

function disableFields(disableStaffId) {
    $('#first-name, #middle-name, #last-name').prop('disabled', true);
    if (disableStaffId) {
        $('#staff-id').prop('disabled', true);
    }
}

function handleSubmit() {
    if (!validateFields()) {
        alert('Please fill all required fields correctly.');
        return;
    }

    $('#spinner').show(); // Show spinner

    // Prepare form data as JSON object
    var formData = {
        session: $('#session').val(),
        startDate: $('#start-date').val(),
        endDate: $('#end-date').val(),
        

        
        // Add more fields as needed
    };

    // Send an AJAX request with JSON data
    $.ajax({
        type: 'POST',
        url: 'your_server_script.php', // Specify your server-side script URL here
        contentType: 'application/json',
        data: JSON.stringify(formData), // Convert JSON object to string
        success: function(response) {
            $('#spinner').hide(); // Hide spinner after operation completion
            showSubmissionAlert($('.container-fluid')); // Show success message
            $('html, body').scrollTop(0); // Scroll to the top of the page
        },
        error: function(xhr, status, error) {
            $('#spinner').hide(); // Hide spinner on error
            console.error(xhr.responseText); // Log error message
            alert('An error occurred. Please try again later.');
        }
    });
}

function validateFields() {
    var isValid = true;
    $('.form input[required], .form select[required]').each(function() {
        if (!$(this).val().trim()) {
            $(this).css('borderColor', 'red');
            isValid = false;
        } else {
            $(this).css('borderColor', ''); // Reset border color
        }
    });

    // Date validation
    var startDateInput = $('#start-date');
    var endDateInput = $('#end-date');
    var startDateValue = startDateInput.val().trim();
    var endDateValue = endDateInput.val().trim();

    if (!startDateValue || !endDateValue) {
        if (!startDateValue) {
            startDateInput.css('borderColor', 'red');
        }
        if (!endDateValue) {
            endDateInput.css('borderColor', 'red');
        }
        isValid = false;
    } else {
        var startDate = new Date(startDateValue);
        var endDate = new Date(endDateValue);
        if (startDate > endDate) {
            startDateInput.css('borderColor', 'red');
            endDateInput.css('borderColor', 'red');
            alert('End Date cannot be earlier than Start Date.');
            startDateInput.val(''); // Clear start date input
            endDateInput.val(''); // Clear end date input
            isValid = false;
        } else {
            startDateInput.css('borderColor', ''); // Reset border color
            endDateInput.css('borderColor', ''); // Reset border color
        }
    }

    return isValid;
}

function showSubmissionAlert($container) {
    $('.alert').remove(); // Remove existing alerts

    var $alertDiv = $('<div class="alert alert-success alert-dismissible fade show" role="alert">' +
        'Your profile has been submitted successfully!' +
        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
        '<span aria-hidden="true">&times;</span>' +
        '</button></div>');

    $container.prepend($alertDiv); // Prepend the alert at the top of the container
    setupAlertCloseButton($alertDiv);
}

function setupAlertCloseButton($alertDiv) {
    $alertDiv.find('.close').on('click', function() {
        $alertDiv.remove(); // Close the alert when clicked
    });
}
