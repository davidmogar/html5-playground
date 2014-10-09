$(function() {

  /* HTML5 local storage */
  if (typeof(Storage) !== 'undefined') {
    if (localStorage.lsInput) {
      $('section#localstorage article.demo').prepend('<div class="alert alert-info"><span>Yay!</span> We loaded your previous data</div>');
      $('section#localstorage input').val(localStorage.lsInput);
    }

    /* Initialize update count variable */
    sessionStorage.updateCount = 0;

    $('section#localstorage input').keyup(function() {
      var alertInfo = $('section#localstorage div.alert-info');

      if (alertInfo.length) {
        alertInfo.html("<span>Yay!</span> Data saved");
      } else {
        $('section#localstorage article.demo').prepend('<div class="alert alert-info"><span>Yay!</span> Data saved</div>');
      }

      localStorage.lsInput = $('section#localstorage input').val();

      /* Increment update count */
      sessionStorage.updateCount++;

      /* Update session storage section text */
      $('section#sessionstorage p span').html(sessionStorage.updateCount);
    });
  } else {
    $('section#localstorage article.demo').html('<div class="alert alert-error"><span>Ooops!</span> Your browser doesn\'t support local storage</div>');
    $('section#sessionstorage article.demo').html('<div class="alert alert-error"><span>Ooops!</span> Your browser doesn\'t support local storage</div>');
  }

  /* Geolocation */
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    $('section#geolocation article.demo').html('<div class="alert alert-error"><span>Ooops!</span> Geolocation is not supported in your browser.</div>');
  }

  function showPosition(position) {
    var infowindow = new google.maps.InfoWindow();
    var map = new google.maps.Map(document.getElementById('mapholder'), {
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var lat = position.coords.latitude;
    var lng = position.coords.longitude;

    var initialLocation = new google.maps.LatLng(lat, lng);
    map.setCenter(initialLocation);
    infowindow.setContent(lat + " " + lng);
    infowindow.setPosition(initialLocation);
    infowindow.open(map);

    $('section#geolocation div#mapholder').addClass('shown');
  }

  /* Page Visibility */
  /* Set the name of the hidden property and the change event for visibility */
  var hidden, visibilityChange;
  if (typeof document.hidden !== "undefined") {
    hidden = "hidden";
    visibilityChange = "visibilitychange";
  } else if (typeof document.mozHidden !== "undefined") {
    hidden = "mozHidden";
    visibilityChange = "mozvisibilitychange";
  } else if (typeof document.msHidden !== "undefined") {
    hidden = "msHidden";
    visibilityChange = "msvisibilitychange";
  } else if (typeof document.webkitHidden !== "undefined") {
    hidden = "webkitHidden";
    visibilityChange = "webkitvisibilitychange";
  }

  function handleVisibilityChange() {
    if (document[hidden]) {
        $('section#pagevisibility article.demo').html('<div class="alert alert-info"><span>Yay!</span> This works but... WHERE HAVE YOU BEEN?!!!.</div>');
    }
  }

  if (typeof document.addEventListener === "undefined" || typeof document[hidden] === "undefined") {
    $('section#pagevisibility article.demo').html('<div class="alert alert-error"><span>Ooops!</span> Page Visibility is not supported in your browser.</div>');
  } else {
    document.addEventListener(visibilityChange, handleVisibilityChange, false);
  }
});
