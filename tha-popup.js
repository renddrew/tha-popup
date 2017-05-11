jQuery(document).ready(function($){


	function tha_get_popup_content(id=null, show=1, bg=null, color=null){

		var anchored = $('body .tha-popup-anchor[data-tha-popup-id="'+id+'"]');

		if(anchored.length){
			$(anchored).find('.tha-popup-container, .tha-pop-shadow').fadeIn(function(){
				console.log('showed anchored ' + $(anchored).data('tha-popup-id'));
			});
			return;
		} 

		if(id){
			var data = { 'action':'tha_ajax', 'id':id };
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
			                   	  '<div class="tha-pop-shadow"></div>' + 
				                  '<div class="tha-popup-container">' +
				                  	  '<div class="tha-popup-hide">x</div>' +
				                      '<div class="tha-popup-body" style="'+styles+'">' +
				                         data.content +
			                           '</div>' +
			                        '</div>' +
			                     '</div>';
			        $('body').append(out);  
			        console.log('anchored: ' + id);

			        if(show){
				        $('.tha-popup-anchor[data-tha-popup-id="'+id+'"]').find('.tha-popup-container, .tha-pop-shadow').fadeIn(100);
				    }
				 }
			});
		}
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

