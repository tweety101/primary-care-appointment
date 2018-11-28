var acc = document.querySelectorAll(".content__age-header");
var panels = document.querySelectorAll(".content__age-panel");

var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    var panel = this.nextElementSibling;
   
    if (panel.style.maxHeight){
      panel.style.maxHeight = null;
      this.classList.remove("active");
      
    } else {
        for (i =0; i < panels.length; i++ ) {
            panels[i].style.maxHeight = null;
            
        }
        for (i = 0; i < acc.length; i++ ) {
            acc[i].classList.remove("active");
        }
      panel.style.maxHeight = panel.scrollHeight + "px";
      this.classList.toggle("active");
    } 
  });
}