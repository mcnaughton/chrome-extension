window.addEventListener("load", function() {
  /* loaded */
});

window.addEventListener("unload", function() {
  /* unloaded */
});

function parseObj(obj) {
	var msg = "",
		attr;
	for (attr in obj) {
		if (obj.hasOwnProperty(attr)) {
			msg += attr + " => " + (("string" === typeof obj[attr]) ? obj[attr] : parseObj(obj[attr])) + "<br/>";
		}
	}
	return msg;
}
chrome.runtime.onMessage.addListener(function(obj, cb) {
	if (!obj) {
		return;
	}
	if (!!obj && "windowState" === obj.action) {
		var msg = "";
		if (!!obj && !!obj.data) {
			msg += parseObj(obj.data);
		} else {
			msg = "Something is awry!";
		}
		window.document.getElementById("container").innerHTML = msg;
	}
});