var state;
chrome.runtime.onMessage.addListener(function(obj, data, cb) {
	if (!!obj && "windowState" === obj.action) {
		state = data;
	}
});

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.windows.create({
  	url: "transparency.html?v=1",
  	type: "panel",
  	width: 800,
  	height: 600
  }, function() {
  	setTimeout(function() {
	    chrome.tabs.sendMessage(tab.id, {
	        action: 'relayState',
	        data: state
	    }, function(r) {
	        /* */
	    });
	},1000);
  });
});
