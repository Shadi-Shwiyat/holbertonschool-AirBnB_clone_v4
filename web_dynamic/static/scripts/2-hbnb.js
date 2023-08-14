$(document).ready(function () {
    let checkemarkedAmenities = [];

    $('li :checkbox').change(function () {
        const dataName = $(this).attr("data-name");

        if (this.checked) {
            checkemarkedAmenities.push(dataName);
        } else {
            checkemarkedAmenities = checkemarkedAmenities.filter((item) => item !== dataName);
        }
        $('div.amenities h4').text(checkemarkedAmenities.join(', '));

    $.get('http://0a5f2fab0457.a72dbe54.hbtn-cod.io:5001/api/v1/status/', function (data) {
            if (data.status === 'OK') {
              $('#api_status').addClass('available');
            } else {
                $('#api_status').removeClass('available');
            }
        });
    });
});