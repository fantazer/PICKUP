$(document).ready(function () {



	//slider
	$('.type-slider').slick({
		slidesToShow: 6,
		autoplay: false,
		speed: 500,
		arrows:false,
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					arrows: false,
					centerMode: true,
					centerPadding: '40px',
					slidesToShow: 5
				}
			},
			{
				breakpoint: 768,
				settings: {
					arrows: false,
					centerMode: true,
					centerPadding: '40px',
					slidesToShow: 3
				}
			},
			{
				breakpoint: 480,
				settings: {
					arrows: false,
					centerMode: true,
					centerPadding: '40px',
					slidesToShow: 1
				}
			}
		]
	});

	$('.footer-slider').slick({
		slidesToShow:1,
		autoplay: false,
		speed: 500,
		arrows:false
	});
	//slider
	$('.slider-control--right').click(function(){
		$(this).closest(".slider-wrap").find(".slider-item").slick('slickNext');
	});

	$('.slider-control--left').click(function(){
		$(this).closest(".slider-wrap").find(".slider-item").slick('slickPrev');
	});
	//modals
	var modalState = {
		"isModalShow": false, //state show modal
		"scrollPos": 0
	};
	$('.modal-content').click(function (event) {
		event.stopPropagation();
	});

	var openModal = function () {
		if (!$('.modal-layer').hasClass('modal-layer-show')) {
			$('.modal-layer').addClass('modal-layer-show');
			modalState.scrollPos = $(window).scrollTop();
			$('body').css({
				overflow: 'hidden',
				position: 'fixed',
				overflowY: 'scroll',
				top: -modalState.scrollPos,
				width: '100%'
			});
		}
		modalState.isModalShow = true;
	};

	var closeModal = function () {
		$('.modal-layer').removeClass('modal-layer-show');
		$('body').css({
			overflow: '',
			position: '',
			top: modalState.scrollPos
		});
		$(window).scrollTop(modalState.scrollPos);
		$('.modal').removeClass('modal__show');
		modalState.isModalShow = false;
	};

	var initModal = function (el) {
		openModal();
		$('.modal').each(function () {
			if ($(this).data('modal') === el) {
				$(this).addClass('modal__show')
			} else {
				$(this).removeClass('modal__show')
			}
		});
		var modalHeightCont = $(window).height();
		$('.modal-filter').height(modalHeightCont);

	};

	$('.modal-get').click(function () {
		var currentModal = $(this).data("modal");
		initModal(currentModal);
	});

	$('.modal-layer , .modal-close').click(function () {
		closeModal();
		$('.nav-el-menu').removeClass('nav-el-menu--active');
		$('.nav-drop').slideUp();
	});
	//modals===end


	//header drop menu

	$('.nav-drop__list-el').click(function(){
		$('.nav-drop__list-el').removeClass('nav-drop__list-el--active');
		$(this).addClass('nav-drop__list-el--active');
		var current = $(this).index();
		$('.nav-drop__sub-wrap').removeClass('nav-drop__sub-wrap--active');
		$('.nav-drop__sub-wrap').each(function(){
			if($(this).index()==current){
				$(this).addClass('nav-drop__sub-wrap--active');
			}
		})
	});

	$('.nav-el-menu').click(function(){
		if (!$('.nav-el-menu').hasClass('nav-el-menu--active')) {
			openModal();
			$(this).addClass('nav-el-menu--active');
			$('.nav-drop').slideToggle();
		} else {
			$(this).removeClass('nav-el-menu--active');
			$('.nav-drop').slideUp();
			closeModal();
		}
	});

	//header drop menu === end

	//scrollbar
	$('.scroll-container').perfectScrollbar({
		wheelSpeed:.2
	});
	//scrollbar===end


	//animate header
	var shrinkHeader = 150;
	var heightHeader = $('.nav-wrap').height();
	$(window).scroll(function () {
		var scroll = $(this).scrollTop();
		if (scroll >= shrinkHeader) {
			$('body').css('paddingTop', heightHeader);
			$('.nav-wrap').addClass('shrink');
		}
		else {
			$('body').css('paddingTop', 0);
			$('.nav-wrap').removeClass('shrink');
		}

		if ($('.modal-layer').hasClass('modal-layer-show') && scroll === 0) {
			$('body').css('paddingTop', heightHeader);
			$('.nav-wrap').addClass('shrink');
		}

	});

	$(window).resize(function(){
		heightHeader=$('.nav-wrap').height();
	});
	//animate header === end

	//toggle category
	$('.category__el-toggle').click(function(){
		var parent = $(this).closest('.category__el-item');
		parent.toggleClass('category__el-item--active');
		parent.find('.category__el-sub-wrapper').slideToggle();
	});
	//toggle category===end

	//beauty select
	$('.select-beauty').niceSelect();
	//beauty select===end


	//dropdown sort
	$('.sort__el').click(function(e){
		$('.sort__el').not(this).find('.sort__el-sub').slideUp();
		$(this).find('.sort__el-sub').slideToggle();
		e.stopPropagation();
	});
	$('.sort__el-sub').click(function(e){
		e.stopPropagation();
	});
	$(document).on("click", function () {
		$('.sort__el-sub').slideUp();
	});
	//dropdown sort === end


	//drop options
	$('.card-option-toggle').click(function(){
		var maxHeight = $(this).closest('.card').find('.card-container').height();
		var container = $(this).closest('.card-option');
		container.toggleClass('card-option--active');
		if(container.hasClass("card-option--active")){
			$(this).closest('.card').find('.scroll-container').css('maxHeight',maxHeight - 150);
		}
		//parrent.find('.options').slideToggle(function(){});
	});
	//drop options===end

	//increment field

	$('.icr-btn').click(function(){
		$(this).addClass('hidden');
		$(this).next('.elements-icr-block').removeClass('hidden');
	});
	$('.incr__minus.incr--one').click(function () {
				var $input = $(this).parent().find('.incr__val span');
				var count = parseInt($input.html()) - 1;
				count = count < 1 ? 0 : count;
				$input.html(count);
				if(count < 1 ){
					$(this).closest('.elements-icr-block').addClass('hidden');
					$(this).closest('.incr__get-wrap').find('.icr-btn').removeClass('hidden');
					count = 1;
					$input.html(count);
				}
		});

	$('.incr__plus').click(function () {
			var $input = $(this).parent().find('.incr__val span');
			var count = parseInt($input.html()) + 1;
			count = count > 100 ? 100 : count;
			$input.html(count);
	});
	//increment field end


	//mobile toggle filters
	$('.mobile-toggle--filter').click(function(){
		$(this).toggleClass('mobile-toggle--active');
		$('.filter-wrap').slideToggle();
	});
	$('.mobile-toggle--cat').click(function(){
		$(this).toggleClass('mobile-toggle--active');
		$('.category-wrap').slideToggle();
	});
	//mobile toggle filters===end


	//mobile menu

	//Фиксируем скрол
	$('.head-toggle--open').click(function(){
		$('body').css({
			overflow: '',
			position: '',
			top: ''
		})
	});

	$('.head-toggle').click(function(event){
		event.stopPropagation();
		$(this).toggleClass('head-toggle--open');
		$('.slide-menu').toggleClass('slide-menu--open');
		$('body').toggleClass('body-fix')
	});

	$('.slide-menu').on("click", function (event) {
		event.stopPropagation();
	});

	$(document).on("click", function () {
			$('.head-wrap').removeClass('head--up');
			$('.head-toggle').removeClass('head-toggle--open');
			$('.slide-menu').removeClass('slide-menu--open');
			console.log(modalState.isModalShow);
			if(modalState.isModalShow == false){
				$('body').removeClass('body-fix')
		}
	});
	//mobile menu===end


	function detectIE() {
		var ua = window.navigator.userAgent;

		var msie = ua.indexOf('MSIE ');
		if (msie > 0) {
			// IE 10 or older => return version number
			return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
		}

		var trident = ua.indexOf('Trident/');
		if (trident > 0) {
			// IE 11 => return version number
			var rv = ua.indexOf('rv:');
			return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
		}

		var edge = ua.indexOf('Edge/');
		if (edge > 0) {
			// Edge (IE 12+) => return version number
			return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
		}

		// other browser
		return false;
	}

	if (detectIE() <= 14 && detectIE()) {
		$('body').empty();
		$('body').prepend('' +
			'<div class="old-browser">' +
			'<div class="old-browser-text"> Сайт не поддерживае Браузер Internet Explorer</div><br>' +
			'<div class="old-browser-text"> Установите <br><br> Chrome Firefox Opera </div><br>' +
			'</div>');
	}
	//for init SVG

	// ==== clear storage =====
	localStorage.clear();
	sessionStorage.clear();
	$(window).unload(function () {
		localStorage.clear();
	});
	// ==== clear storage end =====

})

//cash SVG

;(function (window, document) {
	'use strict';

	var file = 'img/pack.html',
		revision = 1;

	if (!document.createElementNS || !document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect)
		return true;

	var isLocalStorage = 'localStorage' in window && window['localStorage'] !== null,
		request,
		data,
		insertIT = function () {
			document.body.insertAdjacentHTML('afterbegin', data);
		},
		insert = function () {
			if (document.body) insertIT();
			else document.addEventListener('DOMContentLoaded', insertIT);
		};

	if (isLocalStorage && localStorage.getItem('inlineSVGrev') == revision) {
		data = localStorage.getItem('inlineSVGdata');
		if (data) {
			insert();
			return true;
		}
	}

	try {
		request = new XMLHttpRequest();
		request.open('GET', file, true);
		request.onload = function () {
			if (request.status >= 200 && request.status < 400) {
				data = request.responseText;
				insert();
				if (isLocalStorage) {
					localStorage.setItem('inlineSVGdata', data);
					localStorage.setItem('inlineSVGrev', revision);
				}
			}
		}
		request.send();
	}
	catch (e) {
	}

}(window, document));