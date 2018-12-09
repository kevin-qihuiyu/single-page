/**
 * Scroll-back-to-top button.
 * 1) It appears only when the page is already scrolled down a bit;
 * 2) After a click it scroll up the page with gradually slown down speed;
 * 3) Pause scrolling if user scroll manually during the scroll.
 */
var timer = null;
var fab = document.getElementById("up_button");

// Displya "GO UP" button only when page is already scrolled down a bit.
// Now this value is set to the window height.
function goUpButtonDisplay() {
    if ( window.scrollY > window.innerHeight) {
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

/* Navbar list items on the Navigation bar
// 1) Click on navbar, will scroll to the corrsponding section smoothly.
// TODO: fix header offset is not considered. */
function scrollToElement(id) {
    document.getElementById(id).scrollIntoView({
        block: "start", inline: "nearest", behavior: 'smooth'
    });
}

/**  
 *   2) Navbar list items will be highligted when the corresponding section is within range.
 *   The idea is to check window.scroll and see which interval its value falls.
 *   Cost: added class="sec" to all section divs, and added class="sectionN" to all li. 
 */
window.onscroll = function(){
    goUpButtonDisplay()

    if (window.scrollY > 0){
        var sections = document.querySelectorAll('.sec');
        var currIndex = 0;
        var pageTop = window.scrollY;
    
        var OFFSET = 100;  // value to make the highlight effect comes earlier that calculated
    
        // loop all section everytime to update currIndex
        for (var i = 1; i <= sections.length; i++) {
            if (pageTop + OFFSET > sections[i-1].offsetTop) {
                currIndex = i-1;
            }
        }
        // In the menu, a is the one corresponding to the current section
        var id = sections[currIndex].id;
        var a = document.querySelector('.'+id);
    
        // find siblings of a and remove style
        var aSibs = a.parentNode.children;
        for (var i = 0; i < aSibs.length; i++) {
            aSibs[i].classList.remove('active');
        }
        // add style to a
        a.classList.add('active');
    }
}
