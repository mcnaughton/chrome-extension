window.updateExtension = function() {
	var customEvent = document.createEvent('Event'),
		googletag = window.googletag,
		incoming;
	customEvent.initEvent('updateState', true, true);
	customEvent.data =  {
			pageData: window.mcnaughton,
			adData:	(function(pubads) {
	    if (!pubads) {
	        return;
	    }
		try {
			var ads = [], x, attr, xlen, 
					xitem, items = [],
					xsizes, sizes, y, ylen,
					yitem;
			for(attr in pubads) {
				if (pubads.hasOwnProperty(attr)) {
					xitem = pubads[attr];
					if (xitem.length > ads.length) {
						ads = xitem;
					}
				}
			}
			xlen = ads.length;
			for (x = 0; x < xlen; x += 1) {
					xitem = ads[x];
					sizes = [];
					xsizes = xitem.getSizes()
					ylen = xsizes.length;
					for (y = 0; y < ylen; y += 1) {
							yitem = xsizes[y];
							sizes.push(yitem.l + "x" + yitem.j);
					}

					items.push({
							targeting: xitem.getTargeting(),
							slot: xitem.getName(),
							sizes: xitem.getSizes(),
							path: xitem.getAdUnitPath(),
							response: xitem.getResponseInformation(),
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
	incoming = customEvent.data;
	delete incoming.offsets;
    delete incoming.limits;
    delete incoming.profiles;
    delete incoming.auth;
    delete incoming.stars;
    delete incoming.geolocation;
    delete incoming.nearby;
    delete incoming.programming;
    delete incoming.hearts;
    delete incoming.queries;
    delete incoming.sticky;
    delete incoming.stickies;
    delete incoming.user;
    delete incoming.surround;
    delete incoming.comments;
    delete incoming.stream;
    delete incoming.comments_html;
    delete incoming.blocks;
    delete incoming.builtMenus;
    delete incoming.related;
    delete incoming.attachments;
    delete incoming.query;
    delete incoming.ads;
    delete incoming.issues;
    delete incoming.menus;
    delete incoming.components;
    delete incoming.component;
    delete incoming.canStar;
    delete incoming.canHeart;
    hiddenDiv.innerText = JSON.stringify(incoming);
    document.dispatchEvent(customEvent);
};

setInterval(function() {
	window.updateExtension();
}, 10000);
