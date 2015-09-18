window.updateExtension = function() {
	var customEvent = document.createEvent('Event');
	customEvent.initEvent('updateState', true, true);
	customEvent.data = window.mcnaughton;
	hiddenDiv = document.getElementById('state-container');
	if (!hiddenDiv) {
		hiddenDiv = document.createElement('div');
		hiddenDiv.id = "state-container";
		hiddenDiv.style.display = "none";
		document.body.appendChild(hiddenDiv);
	}
    hiddenDiv.innerText = JSON.stringify(customEvent.data);
    document.dispatchEvent(customEvent);
};

setInterval(function() {
	window.updateExtension();
}, 1000);
