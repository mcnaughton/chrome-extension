window.updateExtension = function() {
	var customEvent = document.createEvent('Event');
	customEvent.initEvent('updateState', true, true);
	customEvent.data =  {
			pageData: window.mcnaughton,
			adData:	(function(pubads) {
    if (!pubads) {
        return;
    }
		try {
			var ads = pubads.aa,
					x, xlen = ads.length,
					xitem, items = [],
					xsizes, sizes, y, ylen,
					yitem;
			for (x = 0; x < xlen; x += 1) {
					xitem = ads[x];
					sizes = [];
					xsizes = xitem.getSizes()
					ylen = xsizes.length;
					for (y = 0; y < ylen; y +=
							1) {
							yitem = xsizes[y];
							sizes.push(yitem.l +
									"x" + yitem.j);
					}

					items.push({
							targeting: xitem.getTargeting(),
							slot: xitem.getName(),
							sizes: xitem.getSizes(),
							src: xitem.getContentUrl(),
							url: xitem.getClickUrl(),
							exclusions: xitem.getCategoryExclusions()
					});
			}
		} catch (e) {
			/* no bueno */
		}

    return items;
}(googletag && googletag.pubads() ||
    false))
	};
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
