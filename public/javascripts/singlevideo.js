

// pass upvote request
$(document).on('click', '#video-upvote-courageous', function() {
  var pathname = window.location.pathname;
  var apiCall = pathname + '/upvote/courageous';
	$.get(apiCall); 
});


$(document).on('click', '#video-upvote-inspiring', function() {
  var pathname = window.location.pathname;
  var apiCall = pathname + '/upvote/inspiring';
	$.get(apiCall); 
});


$(document).on('click', '#video-upvote-unique', function() {
  var pathname = window.location.pathname;
  var apiCall = pathname + '/upvote/unique';
	$.get(apiCall); 
});

	