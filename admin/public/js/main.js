$(document).ready(function(){
    $('.owl-carousel').owlCarousel({
        loop:true,
        margin:10,
        autoplay:true,
        autoplayTimeout:6000,
        autoplayHoverPause:true,
        nav:false,
        dots:false,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:3
            },
            1000:{
                items:1
            }
        }
    });
});

function calcRate(r) {
    const f = ~~r,//Tương tự Math.floor(r)
    id = 'star' + f + (r % f ? 'half' : '')
    id && (document.getElementById(id).checked = !0)
   }


