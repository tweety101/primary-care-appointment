

var completelinks = document.querySelectorAll('.content__complete-link');


var i;

for ( i = 0; i < completelinks.length; i++) {
	completelinks[i].addEventListener("click", focusField)
}

function focusField() {

	document.querySelector('#firstname').focus({ preventScroll: true });
	document.querySelector("#formtop").scrollIntoView({ behavior: "smooth", block: "start" });
}