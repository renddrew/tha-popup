jQuery(document).ready(function($){
	$('body').on('click', '[data-tha-popup-id]', function(){
		var id = $(this).data('tha-popup-id');
		var target = $('.tha-popup-preload[data-tha-popup-target="' + id + '"]');

		$(target).fadeIn();
		return false;
	});

	$('body').on('click', '.tha-popup-hide', function(){
		$('.tha-popup-preload').fadeOut();
	});



	// Exit Intent Trigger Preloaded Popups
    tcPop = {
        exitDelay:15000,
        loadTime: '',

        getDomain: function(){
            var domain = '';
            if(tapclicks.siteUrl.indexOf('tapclicks.com')!== -1){
                domain = 'tapclicks.com';
            }
            return domain;
        },

        getLoadTime: function(){
            if(!this.loadTime){
                this.loadTime = new Date().getTime();
            }
            return this.loadTime;
        },

        checkPopupCookie: function(id){
            return Cookies.get('tcPopView_' + id);
        },

        setPopupCookie: function(id, expire){
            var expire = expire || 3;
            var domain = this.getDomain();
            Cookies.set('tcPopView_' + id, '1', { path: '/', expires:expire, domain:domain });
        },
        
        triggerExitPopups: function(){
            var self = this;
            $('.preloaded-page-popup[data-exit-trigger]').each(function(){
                var id = $(this).data('popup-id');
                var exitDelay = $(this).data('exit-delay');
                var expire = $(this).data('exit-intent-expire');
                if(!exitDelay){
                    exitDelay = self.exitDelay;
                }
                if(!self.checkPopupCookie(id)){
                    var date = new Date;
                    var time = date.getTime();
                    if(time > (self.getLoadTime() + exitDelay)){
                        tc_preloaded_popup(id);
                        self.setPopupCookie(id, expire);
                    }
                }
            });
        },

        watchMouse: function(){
            this.getLoadTime;
            $(document).mousemove(function(e){
                /*
                Notes
                Side thought, could add in functionality for checking whether it's windows or mac or linux and which browser so we could determine if they are moving to close the browser for the pop up.
                */
                var  
                yOff = window.pageYOffset,
                xOff = window.pageXOffset,
                pageX = e.pageX,
                pageY = e.pageY,
                headerSp=jQuery("#header-space"),
                navHH=Math.floor(headerSp.height()*(1/4));
                
                if(((pageY - yOff)<=navHH) || ((pageX - yOff)<=20)){
                   tcPop.triggerExitPopups();  
                }
            });
        }
    }


    if( $('.preloaded-page-popup[data-exit-trigger]').length ){
        tcPop.watchMouse();
    }














});
