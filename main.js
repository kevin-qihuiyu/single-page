/**
 * Scroll-back-to-top button.
 * 1) It appears only when the page is already scrolled down a bit;
 * 2) After a click it scroll up the page with gradually slown down speed;
 * 3) Pause scrolling if user scroll manually during the scroll.
 */
var timer = null;
var fab = document.getElementById("up_button");

// Show Go up button when page is already scrolled down a bit.
window.onscroll = function() {
    var clientHeight = document.documentElement.clientHeight;
    var pageTop = window.scrollY;

    if ( pageTop >= clientHeight/3) {
        fab.style.display = 'block';
    } else {
        fab.style.display = 'none';
    }
}

fab.addEventListener("click", function(){
    timer = setInterval(function(){
        var pageTop = window.scrollY;
        // Scroll speed gets slower as closer to top. 
        var speed = pageTop * 0.2;
        document.documentElement.scrollTop -= speed;

        if (pageTop == 0){
            clearInterval(timer);
        }
    }, 30); 
});
