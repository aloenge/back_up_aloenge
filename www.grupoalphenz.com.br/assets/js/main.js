(function($){

    function resizeThings() {
        $('#main-content').css('margin-top', $('#masthead').outerHeight());

        $('.ayylmao').height($(window).height() - $('#masthead').outerHeight());
    }

    resizeThings();

    $(window).on('resize', resizeThings);

	
	if ( $('html').hasClass('ie9') ) {
		$('input, textarea').placeholder();
	}

	$('#top-links .hover, .social-medias img').hover(function() {
		$(this).attr('src', $(this).attr('src').replace(".png", "-hover.html"));
	}, function() {
		$(this).attr('src', $(this).attr('src').replace("-hover.html", ".png"));
	});

	$('#slider').flexslider({
		controlNav : false
	});

    $('.popup').magnificPopup({
        type : 'ajax',
        disableOn: 991,
        gallery: {
            enabled : true
        }
    });

    $('.lang-popup').magnificPopup({
        delegate : "a",
        type : 'image'
    });

    $('.serv-popup').magnificPopup({
        delegate : "a",
        type : 'image',
        gallery: {
            enabled : true
        }
    });

    $('.iframe-popup').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });

    if ( $(window).innerWidth() <= 991 ) {
        $('.popup').click(function(event) {
            event.preventDefault();
        });
    }

    function getGridSize() {
        var window_width = $(window).innerWidth();

        if (window_width >= 1200) {
            return 6;
        }
        else if (window_width <= 1999 && window_width > 992) {
            return 3;
        }

        else if (window_width <= 991 && window_width > 768) {
            return 1;
        }
        else {
            return 1;
        }
    }

	$('#slider-clientes').flexslider({
		itemWidth  : 190,
		animation  : "slide",
		maxItems   : getGridSize(),
		controlNav : false
	});

    $('.form-download').submit(function(e) {
        $.post('emails.php', { email: $(this).find('#email').val() }, function(data) {
            if (data == 0) {
                $('.form-download').find('.help-block').removeClass('hide');
            }
            else if (data == 1) {
                document.location.href="http://online.fliphtml5.com/pljf/gpnn/";
            }
        });

        e.preventDefault();
    });

    $('.form-monitore').submit(function(e) {
        $.post('emails.php', { email: $(this).find('#email').val() }, function(data) {
            if (data == 0) {
                $('.form-monitore').find('.help-block').removeClass('hide');
            }
            else if (data == 1) {
                document.location.href="https://www.hazelrisk.com/login_alphenz";
            }
        });

        e.preventDefault();
    });

    $('.form-news').submit(function(e) {
        $.post('novidades.php', { nome: $(this).find('.news_nome').val(), email: $(this).find('.news_email').val() }, function(data) {
            if (data == 0) {
                $('.form-news').find('.error').removeClass('hide');
            }
            else if (data == 1) {
                $('.form-news').find('.success').removeClass('hide');
            }

            $('.form-news')[0].reset();
        });

        e.preventDefault();
    });

    if ($('#prod_slider').length) {

        $('#carousel').flexslider({
            animation: "slide",
            controlNav: false,
            directionNav: false,
            animationLoop: false,
            slideshow: false,
            itemWidth: 131,
            itemMargin: 15,
            asNavFor: '#prod_slider'
        });

        $('#prod_slider').flexslider({
            animation: "slide",
            controlNav: false,
            animationLoop: false,
            slideshow: false,
            sync: "#carousel",
            start: function(slider) {
                if (slider.pagingCount <= 10) slider.addClass('flex-centered');
            }
        });

        $('.sublist-toggle').click(function(e) {
            $('.sublist-toggle').parent('li').removeClass('open');

            if ($(this).parent('li').hasClass('open')) {
                $(this).parent('li').removeClass('open');
            }
            else {
                $(this).parent('li').addClass('open');
            }

            e.preventDefault();
        });
    }

    $.getJSON('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&amp;playlistId=UUKqVX8EvWZf9eBVAzhVaHWQ&amp;fields=items&amp;key=AIzaSyChzeeviaHMjDvu8FMP3AzWDRRvdJ6PR04&amp;maxResults=50', function(json) {
    	if ($(document).width() > 768) {
            $('<iframe width="100%" height="550" src="https://www.youtube.com/embed/'+json.items[0].snippet.resourceId.videoId+'" frameborder="0" id="main-video" allowfullscreen></iframe>').prependTo('#videos .container');
        }

        var $videos = [];
        
        $.each(json, function(index, videos) {

            var row = 1,
                col = 1;

            $.each(videos, function(index, video) {
                var $video = $('<div>').addClass('col-md-4 video').attr('data-id', video.snippet.resourceId.videoId);

                if ($(document).width() > 768) {
                    $('<img>').addClass('img-responsive center-block').attr('src', video.snippet.thumbnails.high.url).appendTo($video);
                }
                else {
                    $('<iframe width="100%" height="550" src="https://www.youtube.com/embed/'+video.snippet.resourceId.videoId+'" frameborder="0" id="main-video" allowfullscreen></iframe>').appendTo($video);
                }

                $('<p><b>'+video.snippet.title+'</b></p>').appendTo($video);

                $('<iframe src="https://www.facebook.com/plugins/like.php?href=https://www.youtube.com/watch?v='+video.snippet.resourceId.videoId+'&width=176&layout=button_count&action=like&size=small&show_faces=false&share=true&height=46&appId" width="176" height="46" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true"></iframe>').appendTo($video);
                
                // Vamos usar no VEJA TAMBÉM da página de produtos
                $videos.push(video.snippet.resourceId.videoId);

                $video.appendTo('#videos-container .list .row:last-child');

                if (col == 3) {
                    $('<div>').addClass('row').appendTo('#videos-container .list');
                    col = 1;
                }
                else {
                    col++;
                }
            });
        });

        while ($('#videos-container .list > .row').length > 0) {
            var $pg = $('<div>').addClass('pg');

            $('#videos-container .list > .row:nth-of-type(1)').appendTo($pg);
            $('#videos-container .list > .row:nth-of-type(1)').appendTo($pg);

            $($pg).appendTo('#videos-container .list');
        }

        var c=1;

        $('.pg').each(function() {
            var $li = $('<li>');
            var $a = $('<a href="#">').text(c).appendTo($li);

            $( $li ).appendTo('#videos .pagination')
            c++;
        });

        $('#videos .pagination li:first-child').addClass('active');

        var list_pos = $('#videos .list').offset();

        $('body').on('click', '#videos .pagination a', function(e){
            var pg = $(this).text();

            $('#videos .pagination li.active').removeClass('active');

            $(this).parent('li').addClass('active');

            $('#videos-container .pg').hide();

            $('#videos-container .pg:nth-of-type('+pg+')').show();

            $('html,body').scrollTop(list_pos.top);

            e.preventDefault();
        });

        if ( $('#veja-tambem').length ) {
            
            function getRandomInt(min, max) {
                return Math.floor(Math.random() * (max - min)) + min;
            }

            var video_index = getRandomInt(0, $videos.length);
 
            $('<a>').attr('href', "videos/index.html").appendTo('#veja-tambem .video');
            $('<div>').addClass('name').text(json.items[video_index].snippet.title.toUpperCase()).appendTo('#veja-tambem .video');
            $('<img>').addClass('img-responsive').attr('src', json.items[video_index].snippet.thumbnails.high.url).appendTo('#veja-tambem .video a');
        }
    });

    $('body').on('click', '.video', function() {
    	var video_id  = $(this).data('id'),
    		video_pos = $('#main-video').offset();

    	$('#main-video').attr('src', 'https://www.youtube.com/embed/'+video_id);

    	$('html,body').animate({
    		scrollTop : video_pos.top - 30
    	}, 500);
    });

    $('.small.open').click(function() {
        $('#produto aside > ul, .move-it').toggleClass('active');
    });

    // $(window).scroll(function() {
    //     if ( $(window).scrollTop() > 0 ) {
    //         $('#masthead, #main-content').addClass('active');
    //     }
    //     else {
    //         $('#masthead, #main-content').removeClass('active');
    //     }
    // });

})(window.jQuery);
