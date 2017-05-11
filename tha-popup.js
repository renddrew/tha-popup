jQuery(document).ready(function($){

	$('body').append('<div class="tha-pop-shadow"></div>');

	function tha_get_popup_content(id, show, bg, color){

		if(!id){
			return false;
		}

		var show = show || 0, bg = bg || null, color = color || null;

		var anchored = $('body .tha-popup-anchor[data-tha-popup-id="'+id+'"]');

		if(anchored.length && show){
			$('.tha-pop-shadow').fadeIn();
			$(anchored).find('.tha-popup-container').fadeIn(50);
			return;
		} 	

		if(show){
			$('.tha-pop-shadow').fadeIn();
			$('.tha-pop-shadow').addClass('loading');
		}

		var data = {'action':'tha_popup_ajax', 'id':id};
		$.ajax({
			 url:tha_popup.thaAjaxUrl,
			 type:'POST',
			 data: data,
			 success: function(data){
			 	var data = JSON.parse(data);

			 	var styles= '';

			 	if(bg){
			 		styles+='background-color:'+bg+';';
			 	}

			 	if(color){
			 		styles+='color:'+color+';';
			 	}

			 	var out = '<div class="tha-popup-anchor" data-tha-popup-id="'+id+'">' + 
			                  '<div class="tha-popup-container">' +
			                  	  '<div class="tha-popup-hide">x</div>' +
			                      '<div class="tha-popup-body" style="'+styles+'">' +
			                         data.content +
		                           '</div>' +
		                        '</div>' +
		                     '</div>';
		        $('body').append(out);  

		        if(show){
			        $('.tha-popup-anchor[data-tha-popup-id="'+id+'"]').find('.tha-popup-container').fadeIn(50);
			        $('.tha-pop-shadow').removeClass('loading');
			    }
			 }
		});
	}

	$(window).load(function(){
		$('.tha-popup-trigger[data-tha-popup-lazy="true"]').each(function(i,v){
			var id = $(v).data('tha-popup-id');
			var bg = $(v).data('tha-popup-bg');
			var color = $(v).data('tha-popup-color');
			tha_get_popup_content(id, 0, bg, color);
		});
	});

	$('body').on('click', '.tha-popup-trigger[data-tha-popup-id]', function(e){
		e.preventDefault();
		var id = $(this).data('tha-popup-id');
		var bg = $(this).data('tha-popup-bg');
		var color = $(this).data('tha-popup-color');
		tha_get_popup_content(id, 1, bg, color);
	});

	$('body').on('click', '.tha-popup-hide', function(){
		$('.tha-popup-container, .tha-pop-shadow').fadeOut(100);
	});


});

