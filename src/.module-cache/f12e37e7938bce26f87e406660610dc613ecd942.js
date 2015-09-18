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
		console.log("DATA",eventData);
		msg = JSON.stringify(eventData);
		window.document.getElementById("container").innerHTML = msg;
	}
});
