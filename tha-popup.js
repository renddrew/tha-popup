jQuery(document).ready(function($){
	$('body').on('click', 'a[data-tha-popup-id]', function(){
		var id = $(this).data('tha-popup-id');
		var target = $('.tha-popup-preload[data-tha-popup-id="' + id + '"]');

		$(target).fadeIn();
		return false;
	});

	$('body').on('click', '.tha-popup-hide', function(){
		$('.tha-popup-preload').fadeOut();
	});
});