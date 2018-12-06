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

/* Navbar list items 
// 1) Click on navbar, will scroll to the corrsponding section smoothly.
// TODO: fix header offset is not considered. */
function scrollToElement(id) {
    document.getElementById(id).scrollIntoView({
        block: "start", inline: "nearest", behavior: 'smooth'
    });
}

// 2) Navbar list items will be highligted when the corresponding section is within range.
// Cost: added class="sec" to all section divs, and added class="sectionN" to all li.
window.onscroll = function(){
    if (window.scrollY > 0){
       findCloset();
    }
}

// TODO: Rethink the find closet algorithm.
function findCloset() {
    var sections = document.querySelectorAll('.sec');
    var minIndex = 0;
    var minDist = Math.abs(sections[0].offsetTop - window.scrollY);

    for (var i = 1; i < sections.length; i++) {
        var dist = Math.abs(sections[i].offsetTop - window.scrollY);
        if (dist < minDist) {
            minIndex = i;
            minDist = dist;
        }
    }
    // a is the one corresponding to the current section
    var id = sections[minIndex].id;
    var a = document.querySelector('.'+id);

    // find siblings of a and remove style
    var aSibs = a.parentNode.children;
    for (var i = 0; i < aSibs.length; i++) {
        aSibs[i].classList.remove('active');
    }
    // add style to a
    a.classList.add('active');
}