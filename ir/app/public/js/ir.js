jQuery('document').ready(function($) {
  $.ajax({
    type: "GET",
    url: $(location).attr("href") + 'cmd/',
    crossDomain: true,
    success: function(responseData, status, xhr) {
      $('#running-cmd').val(responseData.cmd);
    },
    error: function(request, status, error) {
      $('#alert-failed').show();
      setTimeout(function() {
        $('#alert-failed').hide();
      }, 3000);
      console.log(request.status);
    }
  });
  $(".cmd").bind("click", function(event) {
    event.preventDefault();
    var remote = $(this).data("remote");
    var cmd = $(this).data("cmd");
    var password = $('#password').val();
    $.ajax({
      type: "POST",
      url: $(location).attr("href") + 'cmd/' + remote + '/' + cmd + '/' + password,
      crossDomain: true,
      success: function(responseData, status, xhr) {
        $('#running-cmd').val(cmd);
      },
      error: function(request, status, error) {
        $('#alert-failed').show();
        setTimeout(function() {
          $('#alert-failed').hide();
        }, 3000);
        console.log(request.status);
      }
    });
  });
});
