/**
 * Created by a1 on 26/05/2017.
 */

$(function() {

	var album = $('.album')[0];
	imgPopup(album.getElementsByTagName('img'));

	imgPopup($('.feedback'));

	var popup = $('#empty');
	var container = popup[0].getElementsByClassName('modal-body')[0];


	popup.on('hidden.bs.modal', function(){
		container.getElementsByClassName('appended')[0].remove();
	});

	function imgPopup (array){
		for(var i=0;i<array.length;i++)
			$(array[i]).on('click', lol);
	}

	function lol(event){
		popup.modal("show");
		$(container).prepend('<img src="' + event.target.src + ' "class="appended">');
	}

	var images = album.getElementsByTagName('img');

	var allImg = [[]];
	for (var i=0;i<images.length;i++){
		if (allImg[0].length<4)
			allImg[0].push(images[i]);
		else{
			allImg.unshift([images[i]]);
		}
	}


	allImg = allImg.map(function(el){
		var holder = document.createElement('div');
		el.length < 3 ? holder.className = 'created small' : holder.className = 'created';
		for (var i=0; i<el.length;i++){
			$(el[i]).clone().appendTo($(holder));
		}
		return holder
	});


	var smallAlbum = document.getElementById('new-album');
	var imgSlider = newCarousel(allImg);
	smallAlbum.appendChild(imgSlider);
	$(imgSlider).carousel({
		interval: 5000
	});


	var events = $('.events-container');
	for (var ii=0;ii<events.length;ii++){
		var eventsList = events[ii].getElementsByClassName('event');
		var eventContainer = document.createElement('div');
		eventContainer.className = 'visible-xs slide-events';
		events[ii].appendChild(eventContainer);
		eventContainer.appendChild(newCarousel(eventsList, 'img/arrow_small_left.png', 'img/arrow_small_right.png'));
	}

	var sales = $('.sale');
	for (var ir=0;ir<sales.length;ir++){
		var saleItems = sales[ir].getElementsByClassName('holder');
		var saleContainer = document.createElement('div');
		saleContainer.className = 'row visible-xs sale';
		saleContainer.appendChild(newCarousel(saleItems, 'img/arrow_small_left.png', 'img/arrow_small_right.png'));
		sales[ir].parentNode.appendChild(saleContainer);
	}

	var reports = $('.records');
	for (var rep = 0; rep<reports.length; rep++){
		var repItems = reports[rep].getElementsByClassName('pic');
		var repContainer = document.createElement('div');
		repContainer.className = 'row visible-xs';
		repContainer.appendChild(
			newCarousel(repItems, 'img/arrow_small_left.png', 'img/arrow_small_right.png')
		);
		$(repContainer).insertAfter(reports[rep]);
	}

	var feedCarousel = $('#feedCarousel')[0];
	var feedContainer = document.createElement('div');
	feedContainer.className = 'visible-xs';
	feedContainer.appendChild(
		newCarousel(
			feedCarousel.getElementsByClassName('feedback'),
			'img/arrow_small_left.png',
			'img/arrow_small_right.png'
		)
	);
	$(feedContainer).insertAfter(feedCarousel);




	// list of youtube videos
	$('.autostart').on('show.bs.modal', function(e){
			var iframe = e.target.getElementsByTagName("iframe")[0].contentWindow;
			iframe.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}','*');
		})
		.on('hidden.bs.modal', function(e){
			var player = e.target.getElementsByTagName("iframe")[0].contentWindow;
			player.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}','*');
		});



	$('#myCarousel').carousel({
		interval: 5000
	});
//
	$('#carousel-text').html($('#slide-content-0').html());

//Handles the carousel thumbnails
	$('[id^=carousel-selector-]').click( function(){
		var id = this.id.substr(this.id.lastIndexOf("-") + 1);
		var id = parseInt(id);
		$('#myCarousel').carousel(id);
	});


// When the carousel slides, auto update the text
	$('#myCarousel').on('slid.bs.carousel', function (e) {
		var id = $('.item.active').data('slide-number');
		$('#carousel-text').html($('#slide-content-'+id).html());
	});

// Instantiate the Bootstrap carousel
	$('.multi-item-carousel').carousel({
		interval: false
	});

// for every slide in carousel, copy the next slide's item in the slide.
// Do the same for the next, next item.
	$('.multi-item-carousel .item').each(function(){
		var next = $(this).next();
		if (!next.length) {
			next = $(this).siblings(':first');
		}
		next.children(':first-child').clone().appendTo($(this));

		if (next.next().length>0) {
			next.next().children(':first-child').clone().appendTo($(this));
		} else {
			$(this).siblings(':first').children(':first-child').clone().appendTo($(this));
		}
	});
});
