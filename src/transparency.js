/* */

chrome.runtime.onMessage.addListener(function(obj, cb) {
	if (!obj) {
		return;
	}
	if (!!obj && "windowState" === obj.action) {
    var state = obj.data,
        featured_image = '',
        content = '',
        advertisements = '',
				people = '',
				tags = '',
				categories = '',
				locations = '',
				organizations = '',
        ads = '',
        author = '',
        authorMouseOver = function() {
          window.document.getElementById('author-edit').style.display = 'inline';
        },
        authorMouseOut = function() {
          window.document.getElementById('author-edit').style.display = 'none';
        },
        contentMouseOver = function() {
          window.document.getElementById('content-edit').style.display = 'inline';
        },
        contentMouseOut = function() {
          window.document.getElementById('content-edit').style.display = 'none';
        },
        imageMouseOver = function() {
          window.document.getElementById('image-edit').style.display = 'inline';
        },
        imageMouseOut = function() {
          window.document.getElementById('image-edit').style.display = 'none';
        },
        hiddenstyle = {
          'margin-left': '10px',
          'display': 'none',
          'float': 'right'
        },
        linkstyle = {
          color: 'black',
          'text-decoration': 'none',
          'cursor': 'mouse'
        },
        getTag = function(k, v) {
          return
        },
				doTerm = function(bitem, domore) {
					var tagStyle = {},
						sep = '';
						if(true === domore) {
							sep = React.createElement("hr", null);
						}
					return	React.createElement("div", null, 
						React.createElement("table", null, 
										React.createElement("tr", null, 
										React.createElement("td", null, "Name"), 
										React.createElement("td", null, bitem.name)
										), 
										React.createElement("tr", null, 
										React.createElement("td", null, "URL"), 
										React.createElement("td", null, React.createElement("a", {target: "_blank", href: bitem.term_url}, bitem.term_url))
										), 
										React.createElement("tr", null, 
										React.createElement("td", null, "Slug"), 
										React.createElement("td", null, bitem.slug)
										), 
										React.createElement("tr", null, 
										React.createElement("td", null, "Term ID"), 
										React.createElement("td", null, bitem.term_id)
										), 
										React.createElement("tr", null, 
										React.createElement("td", null, "Taxonomy"), 
										React.createElement("td", null, bitem.taxonomy)
										), 
										React.createElement("tr", null, 
										React.createElement("td", null, "Taxonomy ID"), 
										React.createElement("td", null, bitem.term_taxonomy_id)
										), 
										React.createElement("tr", null, 
										React.createElement("td", null, "Count"), 
										React.createElement("td", null, bitem.count)
										)
									), 
									sep
					)
				},
        getAd = function(aitem) {
            return React.createElement("div", {class: "advertisement"}, 
              React.createElement("h2", null, aitem.slot), 
              React.createElement("table", {width: "100%"}, 
                React.createElement("tr", null, 
                  React.createElement("td", null, "Content URL"), 
                  React.createElement("td", null, React.createElement("a", {target: "_blank", href: aitem.src}, aitem.src))
                ), 
								React.createElement("tr", null, 
                  React.createElement("td", null, "Click URL"), 
                  React.createElement("td", null, React.createElement("a", {target: "_blank", href: aitem.click}, aitem.click))
                ), 
                React.createElement("tr", null, 
                  React.createElement("td", null, "Targeting"), 
                  React.createElement("td", null, React.createElement("table", null, Object.keys(aitem.targeting).map(
                    ((map) =>
                      ((key) =>
                        React.createElement("tr", null, 
                          React.createElement("td", null, key), 
                          React.createElement("td", null, map[key].join(", "))
                        )
                      )
                    )(aitem.targeting || {})
                  )))
                )
              )
            )
        };

    if (!!state.pageData && !!state.pageData.author) {
          author = React.createElement("div", {id: "author", onMouseOut: authorMouseOut, onMouseOver: authorMouseOver}, 
          React.createElement("h1", null, 
            React.createElement("span", null, "Author"), 
            React.createElement("span", {id: "author-edit", style: hiddenstyle}, React.createElement("a", {target: "_blank", style: linkstyle, href: state.pageData.site.url + "/wp-admin/user-edit.php?user_id=" + state.pageData.author.data.ID}, "Edit"))
          ), 
          React.createElement("table", {width: "100%"}, 
            React.createElement("tr", null, 
              React.createElement("td", null, "Display Name"), 
              React.createElement("td", null, state.pageData.author.data.display_name)
            ), 
            React.createElement("tr", null, 
              React.createElement("td", null, "ID"), 
              React.createElement("td", null, state.pageData.author.data.ID)
            ), 
            React.createElement("tr", null, 
              React.createElement("td", null, "Login"), 
              React.createElement("td", null, state.pageData.author.data.user_login)
            ), 
            React.createElement("tr", null, 
              React.createElement("td", null, "URL"), 
              React.createElement("td", null, React.createElement("a", {target: "_blank", href: state.pageData.author.data.user_url}, state.pageData.author.data.user_url))
            ), 
            React.createElement("tr", null, 
              React.createElement("td", null, "Slug"), 
              React.createElement("td", null, state.pageData.author.data.user_nicename)
            ), 
            React.createElement("tr", null, 
              React.createElement("td", null, "Registered"), 
              React.createElement("td", null, state.pageData.author.data.user_registered)
            )
          )
        )
    }

		if (!!state.pageData && !!state.pageData.categories && state.pageData.categories.length > 0) {
			categories = React.createElement("div", null, 
				React.createElement("h1", null, "Categories"), 
				React.createElement("table", null, state.pageData.categories.map(
					((len) =>
						(el, i) =>
							doTerm(el, i !== (len - 1))
					)(state.pageData.categories.length)
				))
			)
		}
		if (!!state.pageData && !!state.pageData.tags && state.pageData.tags.length > 0) {
			tags = React.createElement("div", null, 
				React.createElement("h1", null, "Tags"), 
				React.createElement("table", null, state.pageData.tags.map(
					((len) =>
						(el, i) =>
							doTerm(el, i !== (len - 1))
					)(state.pageData.tags.length)
				))
			)
		}
		if (!!state.pageData && !!state.pageData.people && state.pageData.people.length > 0) {
			people = React.createElement("div", null, 
				React.createElement("h1", null, "People"), 
				React.createElement("table", null, state.pageData.people.map(
					((len) =>
						(el, i) =>
							doTerm(el, i !== (len - 1))
					)(state.pageData.people.length)
				))
			)
		}
		if (!!state.pageData && !!state.pageData.locations && state.pageData.locations.length > 0) {
			locations = React.createElement("div", null, 
				React.createElement("h1", null, "Locations"), 
				React.createElement("table", null, state.pageData.locations.map(
					((len) =>
						(el, i) =>
							doTerm(el, i !== (len - 1))
					)(state.pageData.locations.length)
				))
			)
		}
		if (!!state.pageData && !!state.pageData.organizations && state.pageData.organizations.length > 0) {
			organizations = React.createElement("div", null, 
				React.createElement("h1", null, "Organizations"), 
				React.createElement("table", null, state.pageData.organizations.map(
					((len) =>
						(el, i) =>
							doTerm(el, i !== (len - 1))
					)(state.pageData.organizations.length)
				))
			)
		}

    if (!!state.pageData && !!state.pageData.data && !!state.pageData.data.ID) {
      content = React.createElement("div", {id: "content", onMouseOut: contentMouseOut, onMouseOver: contentMouseOver}, 
        React.createElement("h1", null, 
        React.createElement("span", null, "Content"), 
        React.createElement("span", {id: "content-edit", style: hiddenstyle}, React.createElement("a", {target: "_blank", style: linkstyle, href: state.pageData.site.url + "/wp-admin/post.php?action=edit&post=" + state.pageData.data.ID}, "Edit"))
        ), 
        React.createElement("table", {width: "100%"}, 
          React.createElement("tr", null, 
            React.createElement("td", null, "Title"), 
            React.createElement("td", null, state.pageData.data.post_title)
          ), 
          React.createElement("tr", null, 
            React.createElement("td", null, "Excerpt"), 
            React.createElement("td", null, state.pageData.data.post_excerpt)
          ), 
          React.createElement("tr", null, 
            React.createElement("td", null, "URL"), 
            React.createElement("td", null, React.createElement("a", {target: "_blank", href: state.pageData.data.post_url}, state.pageData.data.post_url))
          ), 
          React.createElement("tr", null, 
            React.createElement("td", null, "Author"), 
            React.createElement("td", null, state.pageData.data.post_author)
          ), 
          React.createElement("tr", null, 
            React.createElement("td", null, "Status"), 
            React.createElement("td", null, state.pageData.data.post_status)
          ), 
          React.createElement("tr", null, 
            React.createElement("td", null, "Published"), 
            React.createElement("td", null, state.pageData.data.post_date)
          ), 
          React.createElement("tr", null, 
            React.createElement("td", null, "Modified"), 
            React.createElement("td", null, state.pageData.data.post_modified)
          ), 
          React.createElement("tr", null, 
            React.createElement("td", null, "ID"), 
            React.createElement("td", null, state.pageData.data.ID)
          ), 
          React.createElement("tr", null, 
            React.createElement("td", null, "Slug"), 
            React.createElement("td", null, state.pageData.data.post_name)
          )
					)
      )
    }


    if (!!state.pageData && !!state.pageData.data && !!state.pageData.data.post_featured) {
      featured_image = React.createElement("div", {id: "featured-image", onMouseOut: imageMouseOut, onMouseOver: imageMouseOver}, 
      React.createElement("h1", null, 
        React.createElement("span", null, "Featured Image"), 
        React.createElement("span", {id: "image-edit", style: hiddenstyle}, React.createElement("a", {target: "_blank", style: linkstyle, href: state.pageData.site.url + "/wp-admin/post.php?action=edit&post=" + state.pageData.data.post_featured.ID}, "Edit"))
      ), 
      React.createElement("table", {width: "100%"}, 
        React.createElement("tr", null, 
          React.createElement("td", null, "Title"), 
          React.createElement("td", null, state.pageData.data.post_featured.post_title)
        ), 
        React.createElement("tr", null, 
          React.createElement("td", null, "Excerpt"), 
          React.createElement("td", null, state.pageData.data.post_featured.post_excerpt)
        ), 
        React.createElement("tr", null, 
          React.createElement("td", null, "URL"), 
          React.createElement("td", null, React.createElement("a", {target: "_blank", href: state.pageData.data.post_featured.media_url}, state.pageData.data.post_featured.media_url))
        ), 
        React.createElement("tr", null, 
          React.createElement("td", null, "Author"), 
          React.createElement("td", null, state.pageData.data.post_featured.post_author)
        ), 
        React.createElement("tr", null, 
          React.createElement("td", null, "Published"), 
          React.createElement("td", null, state.pageData.data.post_featured.post_date)
        ), 
        React.createElement("tr", null, 
          React.createElement("td", null, "Modified"), 
          React.createElement("td", null, state.pageData.data.post_featured.post_modified)
        ), 
        React.createElement("tr", null, 
          React.createElement("td", null, "ID"), 
          React.createElement("td", null, state.pageData.data.post_featured.ID)
        ), 
        React.createElement("tr", null, 
          React.createElement("td", null, "Slug"), 
          React.createElement("td", null, state.pageData.data.post_featured.post_name)
        ), 
        React.createElement("tr", null, 
          React.createElement("td", null, "Mime Type"), 
          React.createElement("td", null, state.pageData.data.post_featured.post_mime_type)
        )
      )
    )
    }

    React.render(
		React.createElement("div", {id: "subcontainer"}, 
			React.createElement("div", {id: "header"}, 
			React.createElement("div", {id: "header-image"}
			)
			), 
      React.createElement("div", {id: "tables"}, 
        React.createElement("h1", null, "Page"), 
        React.createElement("table", {width: "100%"}, 
          React.createElement("tr", null, 
            React.createElement("td", null, "Site Name"), 
            React.createElement("td", null, state.pageData.site.name)
          ), 
          React.createElement("tr", null, 
            React.createElement("td", null, "Site Url"), 
            React.createElement("td", null, React.createElement("a", {target: "_blank", href: state.pageData.site.url}, state.pageData.site.url))
          ), 
          React.createElement("tr", null, 
            React.createElement("td", null, "Type"), 
            React.createElement("td", null, state.pageData.type)
          )
        ), 

        author, 
        content, 

				categories, 
				tags, 
				people, 
				locations, 
				organizations, 

        featured_image, 

        
          (() => {
            if (!!state.adData) {
              return React.createElement("h1", null, "Advertisements")
            }
            return
          })(), 
        

        
        (() => {
          if (!!state.adData) {
            return state.adData.map(getAd)
          }
        })()
        
      )),
      document.getElementById('container')
    );
	}
});
