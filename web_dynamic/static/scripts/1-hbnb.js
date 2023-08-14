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
    });
});
