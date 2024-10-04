function includeHTML() {
    var z, i, element, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
      element = z[i];
      /*search for elements with a certain atrribute:*/
      file = element.getAttribute("includeHTML");
      if (file) {
        /* Make an HTTP request using the attribute value as the file name: */
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4) {

            console.log("inc")
            
            if (this.status == 200) {element.innerHTML = this.responseText;}
            if (this.status == 404) {element.innerHTML = "Page not found.";}

            /* Add class active in the bar corresponds to the current page */
            document.querySelectorAll('.navi li a').forEach(link => {
                console.log("link: " + link.href);
                console.log("window: " + window.location.href);
                if (link.href === window.location.href) {
                  link.classList.add('active');
                }
              });
            /* Remove the attribute, and call this function once more: */
            element.removeAttribute("includeHTML");
            includeHTML();
          }
        }
        xhttp.open("GET", file, true);
        xhttp.send();

        return;
      }
    }
  };