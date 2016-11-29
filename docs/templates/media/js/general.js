$(document).ready(function () {


    
    //Smooth Scroll
    
    $('a[href*="#"]:not([href="#"])').click(function(){
       
       if(location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname){
           var target = $(this.hash);
           target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
           
           if(target.length){
               $('html, body').animate({
                   scrollTop: target.offset().top - 50
               }, 1000);
               return false;
           }
       } 
    });
    
    $(window).scroll(function(){
        scroll = $(window).scrollTop();
        console.log(scroll);
        if(scroll >= $('#telecamere').position().top - 150 && scroll < $('#allarmi').position().top - 150){
            $('#telecamere .animated').css('opacity','1');
            $('#telecamere .animated').addClass('slideInRight');
        }
         if(scroll >= $('#allarmi').position().top - 150){
            $('#allarmi .animated').css('opacity','1');
            $('#allarmi .animated').addClass('slideInRight');
        }
         if(scroll >= $('#remoto').position().top - 150){
            $('#remoto .animated').css('opacity','1');
            $('#remoto .animated').addClass('lightSpeedIn');
        }

         if(scroll >= $('#garanzia').position().top - 150){
            $('#garanzia .animated').css('opacity','1');
            $('#garanzia .animated').addClass('bounceIn');
        }
            
        // console.log('windows Scrolled to '+scroll)
    })

    // console.log($('#telecamere').position().top);

});