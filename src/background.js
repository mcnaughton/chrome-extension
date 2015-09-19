var state;
chrome.runtime.onMessage.addListener(function(obj, data, cb) {
	if (!!obj && "windowState" === obj.action) {
		state = data;
	}
});

/*
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
	    });
	},1000);
  });
}); */

chrome.tabs.onUpdated.addListener(function checkForValidUrl(tabId, changeInfo, tab) {
	if (null !== tab.url.match(/dailyrepublic/)) {
		chrome.pageAction.show(tabId);
	} else if (null !== tab.url.match(/davisenterprise/)) {
		chrome.pageAction.show(tabId);
	} else if (null !== tab.url.match(/mcnaughton/)) {
		chrome.pageAction.show(tabId);
	} else if (null !== tab.url.match(/mtdemocrat/)) {
		chrome.pageAction.show(tabId);
	} else if (null !== tab.url.match(/wintersexpress/)) {
		chrome.pageAction.show(tabId);
	} else if (null !== tab.url.match(/villagelife/)) {
		chrome.pageAction.show(tabId);
	} else if (null !== tab.url.match(/gtgazette/)) {
		chrome.pageAction.show(tabId);
	} else if (null !== tab.url.match(/edcadventures/)) {
		chrome.pageAction.show(tabId);
	} else if (null !== tab.url.match(/solanolife/)) {
		chrome.pageAction.show(tabId);
	}
});
