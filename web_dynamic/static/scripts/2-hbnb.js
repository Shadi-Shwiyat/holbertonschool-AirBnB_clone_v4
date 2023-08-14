$(Document).ready(function () {
    let checkemarkedAmenities = [];

    $('li :checkbox').change(function () {
        const dataName = $(this).attr("data-name");

        if (this.checked) {
            checkemarkedAmenities.push(dataName);
        } else {
            checkemarkedAmenities = checkemarkedAmenities.filter((item) => item !== dataName);
        }
        $('div.amenities h4').text(checkemarkedAmenities.join(', '));

    $.get('http://0.0.0.0:5001/api/v1/status/', function (data, status) {
            if (data.status === 'OK') {
              $('div#api_status').addClass('available');
            } else {
                $('div#api_status').removeClass('available');
            }
        });
    });
});