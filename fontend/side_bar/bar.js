// hightlight the bar of the current page is on
document.querySelectorAll('.navi li a').forEach(link => {
    if (link.href === window.location.href) {
        link.parentElement.classList.add('active');
    }
});