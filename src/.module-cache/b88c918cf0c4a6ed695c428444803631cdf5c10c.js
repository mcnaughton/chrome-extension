document.addEventListener('updateState', function() {
    var el = document.getElementById('state-container'),
    	eventData;
    try {
    	eventData = (!!el && !!el.innerText) ? JSON.parse(el.innerText) : {};
      chrome.runtime.sendMessage(chrome.runtime.id, {action: "windowState", data: eventData || {} })
    } catch (e) {
    	//do nothing
    }
});

function injectScript(file, node) {
    var th = document.getElementsByTagName(node)[0];
    var s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('src', file);
    th.appendChild(s);
}
injectScript( chrome.extension.getURL('/injected.js'), 'body');
