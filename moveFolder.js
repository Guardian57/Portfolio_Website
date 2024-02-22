const tab_box = $(".tab_box");

console.log(tab_box.height());

var persentageMove = tab_box.height() * 0.20; 

const folderFront = document.querySelector('#folder_front');
const folderBackTab = document.querySelector('#tab');
const folderBack = document.querySelector('#folder');

var landingHeight = $("#landing").height();
var landingPlusTab = landingHeight + tab_box.height();


$(window).on('resize', function() {
    landingHeight = $("#landing").height();
    landingPlusTab = landingHeight + tab_box.height();
})

const animation = folderFront.animate([
    {transform: `translateY(0) scaleY(1)`},
    {transform: `translateY(${100}px) scaleY(0.8)`},
    {transform: `translateY(${landingPlusTab}px) scaleY(0.4)`}
    
], {
    duration: 2000,
    easing: 'linear', 
    fill: "both"

});

const animation01 = folderBackTab.animate([
    {fill: '#007ACB'},
    {fill: '#007ACB'},
    {fill: '#00A6E9'}
], {
    duration: 2000,
    easing: 'linear', 
    fill: "both"

});

const animation02 = folderBack.animate([
    {backgroundColor: '#007ACB'},
    {backgroundColor: '#007ACB'},
    {backgroundColor: '#00A6E9'}
], {
    duration: 2000,
    easing: 'linear', 
    fill: "both"

});

animation.cancel();
animation01.cancel();
animation02.cancel();

function setAnimationProgress (progress) {
    animation.cancel();
    animation01.cancel();
    animation02.cancel();
    animation.currentTime = progress * animation.effect.getComputedTiming().duration;
    animation01.currentTime = progress * animation01.effect.getComputedTiming().duration;
    animation02.currentTime = progress * animation02.effect.getComputedTiming().duration;

}



activateFolderHover();

$(window).on('resize', function() {
    persentageMove = tab_box.height() * 0.20; 

})



function activateFolderHover () {
    
    //resets translation on elements
    $('.tab_box').css("transform", `translateY(${33}%)`);
    $('#folder_front').css("transform",'translateY(0px)'); 
    $('.tab_box > h2').css("color", '#00A6E9');
    
    //$('#folder_front').addClass('add-transition');

    $('.tab_box').hover(function(e){
    
        
    $(this).css("transform",e.type === "mouseenter"? `translateY(${0.7}%)` :`translateY(${33}%)`);
    
    
    $('.tab_box > h2').css("color",e.type === "mouseenter"? `#FAFAF5` : `#00A6E9`);
    $('#front-transform-container').css("transform",e.type === "mouseenter"? `translateY(${persentageMove}px)` :`translateY(${0}px)` );
    
    
    
})
}

$(window).on('scroll', function(e) {
    console.log($('#folder').offset());
    console.log($(document).scrollTop());

    var windowTop = $(this).scrollTop();
    

    if($(this).scrollTop() > 50) { //if the scroll has left the top make sure the folder stays in the open state
        $('.tab_box').unbind('mouseenter mouseleave');
        $('.tab_box').css("transform", `translateY(${1}%)`);
        $('#front-transform-container').css("transform", `translateY(${persentageMove}%)`);
        //$('#folder_front').css("transform", `translateY(${persentageMove}px)`)
        //$('#folder_front').removeClass('add-transition');
        $('.tab_box > h2').css("color", '#FAFAF5');
        
    
    
    } else {
        activateFolderHover(); //resets folder hover if it is at 0 again
    }

    

    var folderEleTopPos = $('#landing').offset().top;


    var folderScrollPercentage = (windowTop - folderEleTopPos) / ($('#landing').height()) ;
    
    if(folderScrollPercentage > 1.0) {
        $('#folder_front').css("display", 'none');

    } 
    else {
        $('#folder_front').css("display", 'block');

    }

    console.log(folderScrollPercentage);

    var folderTopPosition = (($('#landing').height() + $('.tab_box').height()) * (folderScrollPercentage));
    //$('#folder_front').css("top", `${Math.round(folderTopPosition)}px`);
    setAnimationProgress(folderScrollPercentage);

    console.log(folderTopPosition);



    

})





