

$(document).ready(function () {
    
       //Header Fixed
    $(window).scroll(function(){
       var header = $('.scrollFixed'),
       scroll = $(window).scrollTop();
       
       if(scroll >= 40){
        header.addClass('ad-fixed');
        $('.logo1').css('display','none');
        $('.logo2').css('display','block');
       }
        else {
            header.removeClass('ad-fixed');
            $('.logo1').css('display','block');
        $('.logo2').css('display','none');
        }
    });
    
    //smoothScrolling
        
    $('a[href*="#"]:not([href="#"])').click(function(){
       
       if(location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname){
           var target = $(this.hash);
           target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
           
           if(target.length){
               $('.right').animate({
                   scrollTop: target.offset().top
               }, 1000);
               return false;
           }
       } 
    });
    

    // //Select * .ad-input and append <hr> to it  

    // var adInput = $('.ad-input');
    // adInput.append('<u></u>');

    // var line = $('.ad-input u');
    // var input = $(".ad-input input");



    //User Component

    var userComp = $('.ad-user[ad-count]');
    userComp.append('<span>' + userComp.attr('ad-count') + '</span>');
    var userCount = $('.ad-user[ad-count] span');
    console.log(userComp.width());

    userCount.css('margin-left', userComp.width())

    //Video Player

    var play = $('button.play');
    var loop = $('button.loop');
    var mute = $('button.mute');
    var autoplay = $('.autoplay');
    var expandVideo = $('.expand');

    //seekBars
    var seekBar = $('input.seekRange');
    var volumeBar = $('input.volumeRange');

    var playing;


    //initialize media players()

    function initPlayer() {
        auto = checkAutoPlay('.ad-video', 1);
        console.log('init video ' + auto);
        $(this).playing = auto;



    }

    initPlayer();

    function checkAutoPlay(player, element) {
        element = element ? 'video' : 'audio';
        player = $(player).find(element);
        auto = player.attr('autoplay');
        if (auto) {
            $(element + ' ~ .play ').find('i').attr('class', 'fa fa-pause');
        }

        return auto != null ? true : false;
    }

    //Play
    play.click(function () {
        var adVideo = $(this).parents('.ad-video');

        if (!playing) {
            $(this).find('i').attr('class', 'fa fa-pause fa-lg');
            adVideo.find('video')[0].play();
            playing = true;


        } else {
            $(this).find('i').attr('class', 'fa fa-play fa-lg');
            adVideo.find('video')[0].pause();
            playing = false;

        }


    });

    //Expand
    expandVideo.click(function () {
        var adVideo = $(this).parents('.ad-video');

        if (adVideo[0].requwstFullscreen) {
            adVideo[0].Fullscreen();
        } else if (adVideo[0].mozRequestFullScreen) {
            adVideo[0].mozRequestFullScreen();
        } else if (adVideo[0].webkitRequestFullscreen) {
            adVideo[0].webkitRequestFullscreen();
        }

        adVideo.css('width', '100%');

    });


    //autoplay btn click

    autoplay.click(function () {
        autoPlay('.ad-video', 1, $(this));
    });
    //loop btn click

    loop.click(function () {
        loopPlayer('.ad-video', 1, $(this));

    });

    //mute btn click
    mute.click(function () {
        var muted = $(this).parents('.ad-video').find('video')[0].muted;
        mutePlayer('.ad-video', 1, $(this));

        if (!muted) {
            $(this).find('i').attr('class', ' fa fa-volume-off fa-lg');

        } else {
            $(this).find('i').attr('class', ' fa fa-volume-up fa-lg');

        }

    });

    //volume

    volumeBar.change(function () {
        var video = $(this).parents('.ad-video').find('video');
        video[0].volume = volumeBar[0].value;
    });

    //SeekBar
    //when seeked
    seekBar.change(function () {
        //calculate the new time

        var video = $(this).parents('.ad-video').find('video');
        var time = video[0].duration * (seekBar[0].value / 100);

        //update the video time

        video[0].currentTime = time;
    });


    seekBar.mousedown(function () {
        var adVideo = $(this).parents('.ad-video');

        var video = adVideo.find("video[ id ^= 'adMedia']")[0].pause();
    });



    seekBar.mouseup(function () {
        var adVideo = $(this).parents('.ad-video');

        adVideo.find('video[id^="adMedia"]')[0].play();
        playing = true;
        if (adVideo.find('.play i').hasClass('fa-play')) {
            adVideo.find('.play i').attr('class', 'fa fa-pause fa-lg');

        }
    });



    //update seekBar as video plays




    //Loop Player Function
    function loopPlayer(player, element, playthis) {

        var mediaElement = element ? 'video' : 'audio';
        var player = playthis.parents(player);

        var loopExist = player.find(mediaElement).attr('loop');
        var looping = (loopExist != null) ? true : false;

        if (!looping) {
            player.find(mediaElement).attr('loop', '');
        } else {
            player.find(mediaElement).removeAttr('loop');
        }
    }

    //Mute Player
    function mutePlayer(player, element, playthis) {

        var mediaElement = element ? 'video' : 'audio';
        var player = playthis.parents(player);
        var muteExist = player.find(mediaElement).attr('muted');

        var muted = (muteExist != null) ? true : false;

        if (!player.find(mediaElement)[0].muted) {
            player.find(mediaElement)[0].muted = true;
            player.find(mediaElement).attr('muted', '');

        } else {
            player.find(mediaElement)[0].muted = false;
            // player.find(mediaElement).removeAttr('muted');

        }
    }


    //Autoplay Player
    function autoPlay(player, element, playthis) {

        var mediaElement = element ? 'video' : 'audio';
        var player = playthis.parents(player);
        var autoplay = player.find(mediaElement).attr('autoplay');

        var autoplay = (autoplay != null) ? true : false;

        if (!autoplay) {
            player.find(mediaElement).attr('autoplay', '');
        } else {
            player.find(mediaElement).removeAttr('autoplay');

        }
    }



//ad-modal popUp

$('.ad-modal-trigger[ad-modal]').click(function(e){
   var $this = $(this);
//    $('.ad-modal#'+$this.attr('ad-modal')).css({'left': e.pageX},{'top': e.pageX});
   $('.ad-modal#'+$this.attr('ad-modal')).addClass('ad-show');
    console.log('x value is: '+ e.pageX + '; Y value is: '+ e.pageY);
});

$('.close-modal').click(function(){
   $('.ad-modal').removeClass('ad-show'); 
});


//ad-accordian

$('.ad-accordian .ad-head').click(function(){
    var $this = $(this);
    $this.toggleClass('ad-show');    
})

    //TEMPLATE

    var leftDiv = $('.ad-left');
    var rightDiv = $('.ad-right');
    var middleDiv = $('.ad-right .ad-middle');
    var workspaceDiv = $('.ad-right .ad-workspace');
    var closed = true;
    var middleOut = false;

    function reshapeTemplate() {
        leftDiv.click(function () {
            if (closed) {
                $(this).removeClass('ad-closed');
                rightDiv.removeClass('ad-closed');
                closed = false;
            } else {
                $(this).addClass('ad-closed');
                rightDiv.addClass('ad-closed');
                closed = true;
            }
        });



        //Update the workspace width
        function updateWidth() {
            
            workspaceDiv.css('left', middleDiv.width());
           
        }

        leftDiv.find('.menu .ad-item').click(function (e) {
            e.stopPropagation();

            var width = middleDiv.width();




            if ($(this).attr('class') != 'ad-item middle') {
               

                if (middleOut) {
                    middleDiv.css('width', 0);
                    middleOut = false;
                    width = 0;

                }

                //close the left and right divs
                if (!closed) {
                    leftDiv.addClass('ad-closed');
                    rightDiv.addClass('ad-closed');
                    closed = true;
                }

            }
            else {

                middleDiv.css('width', '300px');
                middleOut = true;

            }

            setTimeout(updateWidth, 500);





        });


        //middleDiv Clicked
        middleDiv.click(function () {
            //close the left and right divs
            if (!closed) {
                leftDiv.addClass('ad-closed');
                rightDiv.addClass('ad-closed');
                closed = true;
            }
        });



    }

    reshapeTemplate();



    //Design the media player
    var adVideo = $('.ad-video');
    var leftSideOfCtrl = $('.ad-video .rFloat');
    var time = $('.ad-video .timer');
    var seekBarWidth = ((- leftSideOfCtrl.width() + adVideo.width()) - time.width() - 100);

    seekBar.css('width', seekBarWidth);

    //SideMenu Menu-Bar trigger
    ////Responsive
    // Optimalisation: Store the references outside the event handler:
    var $window = $(window);



    //Toggle List View
    

    //ad-cardView Toggle
    
    $('.ad-cardView .ad-data').click(function($e){

        $(this).find('.ad-front').toggleClass('ad-slideUp');
      
    })



    function checkWidth() {
        var windowsize = $window.width();
        


        var seekBarWidth = ((- leftSideOfCtrl.width() + adVideo.width()) - time.width() - 100);
        seekBar.css('width', seekBarWidth);
    }
    // Execute on load
    checkWidth();
    // Bind event listener
    $(window).resize(checkWidth);

});

window.onload = function () {
    var mediaPlayer = document.getElementById('adMedia_1');
    var mediaSeeker = document.getElementById('adSeekBar_1')
    if (document.getElementById('adMedia_1')) {
        mediaPlayer.addEventListener("timeupdate", function () {
            value = (100 / mediaPlayer.duration) * mediaPlayer.currentTime;
            mediaSeeker.value = value;
        });
    }

}






// Sequencial animation of elements
// $(".row .image").each(function(i,el) {
//     var $this = $(this);
//     setTimeout(function() {
//             $this.addClass('active');
//         }, i*1000); // milliseconds
// });