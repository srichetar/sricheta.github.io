$(function(){
	'use strict';

	smoothScroll.init({
		updateURL: false
	});

	var c_height = $('.main-section').outerHeight() - 40,
		$body = $('body'),
		$menu_btn = $('.menu-btn');
	function menu_btn_color(){
		if( $(window).scrollTop() >= c_height ){
			$menu_btn.removeClass('white-btn');
		}else{
			$menu_btn.addClass('white-btn');
		}
	}
	menu_btn_color();


	$(window).on('resize', function(){

		c_height = $('.main-section').outerHeight() - 40;

		setTimeout(function(){
			AOS.refreshHard();
		}, 800);

	}).on('load', function(){

		$body.addClass('loaded');

		$('.testimonials-slider').owlCarousel({
			items: 1
		});

		$('.project-slider').owlCarousel({
			items: 1,
			autoHeight: true
		});

		$('.portfolio-items').shuffle();

		AOS.init({
			offset: 40,
			disable: 'mobile',
			duration: 600
		});


	}).on('scroll', function(){

		menu_btn_color();

	});

	Waves.attach('.btn-custom, .menu li > a', 'waves-classic');
	Waves.init();

	$('.material-input > .form-control').blur(function() {
		if ($(this).val()){
			$(this).addClass('used');
		}else{
			$(this).removeClass('used');
		}
	});

	$('.portfolio-items > li > .inner').each(function(){
		var $this = $(this),
			_w = $this.outerWidth(),
			_h = $this.outerHeight(),
			_s = _w > _h ? _w : _h,
			_s = _s * 2.6;
		$this.append('<div class="ripple" ></div>');
		$this.find('.ripple').css({
			height: _s,
			width: _s
		});
	}).on('mouseenter', function(e){
		var $this = $(this),
			_s = parseInt($this.find('.ripple').css('height')),
			_offset = $this.offset(),
			_x = e.pageX - $this.offset().left,
			_y = e.pageY - $this.offset().top,
			_x = _x - (_s/2),
			_y = _y - (_s/2);
		$this.find('.ripple').css({
			'top': _y,
			'left': _x
		});
	});

	$menu_btn.on('click', function(e){
		e.preventDefault();
		$body.toggleClass('show-menu');
	});
	$('.menu li > a').on('click', function(e){
		$body.removeClass('show-menu');
	});


	$('#contact-form').validator().on('submit', function (e) {
		if (!e.isDefaultPrevented()) {
			e.preventDefault();
			var $this = $(this),
				//You can edit alerts here
				alerts = {
					success:
					"<div class='form-group' >\
						<div class='alert alert-success' role='alert'> \
							<strong>Message Received!</strong> I'll be in touch as soon as possible.\
						</div>\
					</div>",
					error:
					"<div class='form-group' >\
						<div class='alert alert-danger' role='alert'> \
							<strong>Oops!</strong> Sorry, an error occurred. Please try again.\
						</div>\
					</div>"
				};
			$.ajax({ 
				url: 'email.php',
		        data: {email: document.getElementById('email').value, name: document.getElementById('username').value, message: document.getElementById('message').value},
		        type: 'post',
		        success: function(output) {
		            if(output == 1){
                                $('#contact-form-result').html(alerts.success);
                            }
                            else{
                                $('#contact-form-result').html(alerts.error);
                            }
		        }
			});
			$('#contact-form').trigger('reset');
			$('#contact-form .used').removeClass('used');
		}
	});


	// Demo Code
	if( typeof Storage != 'undefined' ){

		var color = window.localStorage.getItem('color');

		if(color != null ){
			$body.addClass(color);
		}

	}
	$('.color-switch > a').on('click', function(e){

		e.preventDefault();

		color = this.className.replace('c-', '');

		if( typeof Storage != 'undefined' ){
			window.localStorage.setItem('color', color);
		}


		$body.removeClass('pink green blue teal blue-grey default purple');

		$body.addClass(color);

	});

});

