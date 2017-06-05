$("#features_animation1").hover(function(){
    $("#feature1").addClass("wow bounce infinite animated");
    $("#feature1").attr("style","visibility: visible; animation-name: bounce;");
});

$("#features_animation1").mouseleave(function(){
    $("#feature1").removeClass("wow bounce animated");
});

$("#features_animation2").hover(function(){
    $("#feature2").addClass("wow zoomIn infinite animated");
    $("#feature2").attr("style","visibility: visible; animation-name: zoomIn;-webkit-animation-duration: 4s; -moz-animation-duration: 4s;");
});

$("#features_animation2").mouseleave(function(){
    $("#feature2").removeClass("wow zoomIn animated");
});

$("#features_animation3").hover(function(){
    $("#feature3").addClass("wow wobble infinite animated");
    $("#feature3").attr("style","visibility: visible; animation-name: wobble;-webkit-animation-duration: 4s; -moz-animation-duration: 4s;");
});

$("#features_animation3").mouseleave(function(){
    $("#feature3").removeClass("wow wobble animated");
});