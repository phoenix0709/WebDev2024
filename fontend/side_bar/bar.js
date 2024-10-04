console.log("here");
document.querySelectorAll('.navi li a').forEach(link => {
    console.log("link: " + link.href)
    console.log("window: " + window.location.href)
    if (link.href === window.location.href) {
        link.classList.add('active');
    }
});
