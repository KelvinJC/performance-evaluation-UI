$(document).ready(function() {
    // populate form fields dropdowns
    disableFirstFourFields();

    $("#first-name").html();
    $("#last-name").html();
    $("#middle-name").html();
    $("#email").html();
    $("#staff-id").html();
    $("#department").html();
    $("#unit").html();
    $("#directorate").html();
    $("#region").html();
    $("#area-office").html();
    $("#designation").html();
    $("#job-level").html();
    $("#line-manager").html();
    $("#reviewer").html();

    $.ajax({
        url: 'https://swapi.dev/api/planets/1/',
        type: "GET",
        dataType: "json",
        success: function (result) {
        console.log(result);
        $.each(result.films, function (key, value) {
            $("#unit").append("<option>" + value + "</option>");
            });
            $.each(result.residents, function (key, value) {
                $("#directorate").append("<option>" + value + "</option>");             
            });
            $.each(result.residents, function (key, value) {
                $("#region").append("<option>" + value + "</option>");             
            });
            $.each(result.residents, function (key, value) {
                $("#area-office").append("<option>" + value + "</option>");             
            });
            $.each(result.residents, function (key, value) {
                $("#job-level").append("<option>" + value + "</option>");             
            });
            $.each(result.residents, function (key, value) {
                $("#line-manager").append("<option>" + value + "</option>");
            });
            $.each(result.residents, function (key, value) {
                $("#reviewer").append("<option>" + value + "</option>");             
            });
        },
        error: function() {
            // Show error message
            alert('An error occurred while submitting the form. Please try again.');
        }
    });

    // handle form submission
    $('#create-profile-form').on('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission action
    
        if (!validateFields()) {
            alert('Please fill all required fields correctly.');
            return;
        }
        // Show spinner
        $('#spinner').show();
        var formData = {
            first_name: $('#first-name').val(),
            middle_name: $('#middle-name').val(),
            last_name: $('#last-name').val(),
            email: $('#email').val(),
            staff_id: $('#staff-id').val(),
            department: $('#department').val(),
            unit: $('#unit').val(),
            directorate: $('#directorate').val(),
            region: $('#region').val(),
            area_office: $('#area-office').val(),
            designation: $('#designation').val(),
            job_level: $('#job-level').val(),
            line_manager: $('#line-manager').val(),
            reviewer: $('#reviewer').val()
        };
        sendProfileData(formData);
    });
});

function sendProfileData(data) {
    console.log(data)
    $.ajax({
        type: 'POST',
        url: 'https://dummy.restapiexample.com/api/v1/create', // Replace with your form processing script URL
        data: JSON.stringify(data),
        success: function(response) {
            // Hide spinner on successful response
            $('#spinner').hide();
            // Show success message
            showSubmissionAlert($('.container-fluid'));
            // Scroll to the top immediately
            $('html, body').scrollTop(0);
            console.log(response);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Hide spinner on error response
            $('#spinner').hide();
            // Show error message
            alert('An error occurred while submitting the form. Please try again.');
        }
    });
}

function disableFirstFourFields() {
    $('#first-name, #last-name, #staff-id, #department, #email').prop('disabled', true);
}

function validateFields() {
    var isValid = true;
    // Validate required fields
    $('#create-profile-form input[required], #create-profile-form select[required]').each(function() {
        if (!$(this).val().trim()) {
            $(this).css('borderColor', 'red');
            isValid = false;
        } else {
            $(this).css('borderColor', ''); // Reset border color if field is filled
        }
    });
    return isValid;
}

function showSubmissionAlert($container) {
    $('.alert').remove(); // Remove existing alerts

    var $alertDiv = $('<div class="alert alert-success alert-dismissible fade show" role="alert">' +
        'Form has been submitted successfully!' +
        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
        '<span aria-hidden="true" style="font-size: 1.5rem;">&times;</span>' +
        '</button></div>'
    );
    $container.prepend($alertDiv); // Prepend the alert at the top of the container
    setupAlertCloseButton($alertDiv);
}

function setupAlertCloseButton($alertDiv) {
    $alertDiv.find('.close').on('click', function() {
        $alertDiv.remove(); // Close the alert when clicked
    });
}



















