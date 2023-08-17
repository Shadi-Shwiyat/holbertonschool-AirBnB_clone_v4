$(document).ready(function () {
  let checkemarkedAmenities = [];

  $('li :checkbox').change(function () {
    const dataName = $(this).attr('data-name');

    if (this.checked) {
      checkemarkedAmenities.push(dataName);
    } else {
      checkemarkedAmenities = checkemarkedAmenities.filter((item) => item !== dataName);
    }
    $('div.amenities h4').text(checkemarkedAmenities.join(', '));
  });

  $.get('http://2c90ef8d54bf.654b0ff2.hbtn-cod.io:5001/api/v1/status', function (data) {
    console.log(data.status);
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });

  $.ajax({
    url: 'http://2c90ef8d54bf.654b0ff2.hbtn-cod.io:5001/api/v1/places_search/',
    type: 'POST',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify({}), // sending empty dictionary for server to fill with data
    // sets up what should happen when server responds with data
    success: function (data) {
      for (const place of data) {
        // requesting user information related to a place
        $.get('http://2c90ef8d54bf.654b0ff2.hbtn-cod.io:5001/api/v1/users/' + place.user_id, function (userData) {
          const placeHTML = `<article>
          <div class="title_box">
            <h2>${place.name}</h2>
            <div class="price_by_night">$${place.price_by_night}</div>
          </div>
          <div class="information">
            <div class="max_guest">${place.max_guest} Guests</div>
            <div class="number_rooms">${place.number_rooms} Bedrooms</div>
            <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
          </div>
          <div class="user">
            <b>Owner:</b> ${userData.first_name} ${userData.last_name}
          </div>
          <div class="description">
            ${place.description}
          </div>
          </article>`;
          $('.places').append(placeHTML);
        });
      }
    }
  });

  $('#button').click(function () {
    console.log(checkemarkedAmenities);
    $('.places > article').remove();
    console.log('You are clicking the button!');
    $.ajax({
      url: 'http://2c90ef8d54bf.654b0ff2.hbtn-cod.io:5001/api/v1/places_search/',
      type: 'POST',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({ amenities: checkemarkedAmenities }), // sending dictionary with checkmarked amenities
      // sets up what should happen when server responds with data
      success: function (data) {
        console.log(data);
        for (const place of data) {
          // requesting user information related to a place
          $.get('http://2c90ef8d54bf.654b0ff2.hbtn-cod.io:5001/api/v1/users/' + place.user_id, function (userData) {
            const placeHTML = `<article>
            <div class="title_box">
              <h2>${place.name}</h2>
              <div class="price_by_night">$${place.price_by_night}</div>
            </div>
            <div class="information">
              <div class="max_guest">${place.max_guest} Guests</div>
              <div class="number_rooms">${place.number_rooms} Bedrooms</div>
              <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
            </div>
            <div class="user">
              <b>Owner:</b> ${userData.first_name} ${userData.last_name}
            </div>
            <div class="description">
              ${place.description}
            </div>
            </article>`;
            $('.places').append(placeHTML);
          });
        }
      },
      error: function (xhr, status, error) {
        console.error("ajax error:", error);
      }
    });
  });
});
