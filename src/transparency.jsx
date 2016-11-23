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
        authorObject = (!!state.pageData.data ? state.pageData.data.post_author_object : (!!state.pageData.author ? state.pageData.author : {})),
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
          'marginLeft': '10px',
          'display': 'none',
          'float': 'right'
        },
        linkstyle = {
          color: 'black',
          'textDecoration': 'none',
          'cursor': 'mouse'
        },
        getTag = function(k, v) {
          return
        },
				doTerm = function(bitem, domore) {
					var tagStyle = {},
						sep = '';
						if(true === domore) {
							sep = <hr/>;
						}
					return	<div>
						<table>
										<tr>
										<td>Name</td>
										<td>{bitem.name}</td>
										</tr>
										<tr>
										<td>URL</td>
										<td><a target="_blank" href={bitem.term_url}>{bitem.term_url}</a></td>
										</tr>
										<tr>
										<td>Slug</td>
										<td>{bitem.slug}</td>
										</tr>
                    <tr>
										<td>Taxonomy</td>
										<td>{bitem.taxonomy}</td>
										</tr>
                    <tr>
                    <td>Term ID</td>
                    <td>{bitem.term_id}</td>
                    </tr>
									</table>
									{sep}
					</div>
				},
        getAd = function(aitem) {
            return <div className="advertisement">
              <h2>{aitem.slot}</h2>
              <table width="100%">
                <tr>
                  <td>Content URL</td>
                  <td><a target="_blank" href={aitem.src}>{aitem.src}</a></td>
                </tr>
								<tr>
                  <td>Click URL</td>
                  <td><a target="_blank" href={aitem.url}>{aitem.url}</a></td>
                </tr>
                <tr>
                  <td>Targeting</td>
                  <td><table>{Object.keys(aitem.targeting).map(
                    ((map) =>
                      ((key) =>
                        <tr>
                          <td>{key}</td>
                          <td>{map[key].join(", ")}</td>
                        </tr>
                      )
                    )(aitem.targeting || {})
                  )}</table></td>
                </tr>
              </table>
            </div>
        };

    if (!!state.pageData && !!authorObject) {
          author = <div id="author" onMouseOut={authorMouseOut} onMouseOver={authorMouseOver}>
          <h1>
            <span>Author</span>
            <span id="author-edit" style={hiddenstyle}><a target="_blank" style={linkstyle} href={state.pageData.site.url + "/wp-admin/user-edit.php?user_id=" + ((!!authorObject && !!authorObject.data) ? authorObject.data.ID : '') }>Edit</a></span>
          </h1>
          <table width="100%">
            <tr>
              <td>User Display Name</td>
              <td>{((!!authorObject && !!authorObject.data) ? authorObject.data.display_name : '')}</td>
            </tr>
            <tr>
              <td>User ID</td>
              <td>{!!authorObject && !!authorObject.data ? authorObject.data.ID : ''}</td>
            </tr>
            <tr>
              <td>User Login</td>
              <td>{!!authorObject && !!authorObject.data ? authorObject.data.user_login : ''}</td>
            </tr>
            <tr>
              <td>Profile URL</td>
              <td><a target="_blank" href={!!authorObject && !!authorObject.data ? authorObject.data.profile_url : ''}>{!!authorObject && !!authorObject.data ? authorObject.data.profile_url : ''}</a></td>
            </tr>
            <tr>
              <td>User URL</td>
              <td><a target="_blank" href={!!authorObject && !!authorObject.data ? authorObject.data.user_url : ''}>{!!authorObject && !!authorObject.data ? authorObject.data.user_url : ''}</a></td>
            </tr>
            <tr>
              <td>User Registered</td>
              <td>{!!authorObject && !!authorObject.data ? authorObject.data.user_registered : ''}</td>
            </tr>
          </table>
        </div>
    }

		if (!!state.pageData && !!state.pageData.data && !!state.pageData.data.post_categories && state.pageData.data.post_categories.length > 0) {
      categories = <div>
        <h1>Categories</h1>
        <table>{state.pageData.categories.map(
          ((len) =>
            (el, i) =>
              doTerm(el, i !== (len - 1))
          )(state.pageData.categories.length)
        )}</table>
      </div>
    }

		if (!!state.pageData && !!state.pageData.data && !!state.pageData.data.post_tags && state.pageData.data.post_tags.length > 0) {
      tags = <div>
        <h1>Tags</h1>
        <table>{state.pageData.data.post_tags.map(
          ((len) =>
            (el, i) =>
              doTerm(el, i !== (len - 1))
          )(state.pageData.data.post_tags.length)
        )}</table>
      </div>
    }

		if (!!state.pageData && !!state.pageData.data && !!state.pageData.data.post_people && state.pageData.data.post_people.length > 0) {
      people = <div>
        <h1>People</h1>
        <table>{state.pageData.data.post_people.map(
          ((len) =>
            (el, i) =>
              doTerm(el, i !== (len - 1))
          )(state.pageData.data.post_people.length)
        )}</table>
      </div>
    }

		if (!!state.pageData && !!state.pageData.data && !!state.pageData.data.post_locations && state.pageData.data.post_locations.length > 0) {
      locations = <div>
        <h1>Locations</h1>
        <table>{state.pageData.data.post_locations.map(
          ((len) =>
            (el, i) =>
              doTerm(el, i !== (len - 1))
          )(state.pageData.data.post_locations.length)
        )}</table>
      </div>
    }

		if (!!state.pageData && !!state.pageData.data && !!state.pageData.data.post_organizations && state.pageData.data.post_organizations.length > 0) {
      locations = <div>
        <h1>Organizations</h1>
        <table>{state.pageData.data.post_organizations.map(
          ((len) =>
            (el, i) =>
              doTerm(el, i !== (len - 1))
          )(state.pageData.data.post_organizations.length)
        )}</table>
      </div>
    }

    if (!!state.pageData && !!state.pageData.data && !!state.pageData.data.ID) {
      content = <div id="content" onMouseOut={contentMouseOut} onMouseOver={contentMouseOver}>
        <h1>
        <span>Content</span>
        <span id="content-edit" style={hiddenstyle}><a target="_blank" style={linkstyle} href={state.pageData.site.url + "/wp-admin/post.php?action=edit&post=" + state.pageData.data.ID}>Edit</a></span>
        </h1>
        <table width="100%">
          <tr>
            <td>Title</td>
            <td>{state.pageData.data.post_title}</td>
          </tr>
          <tr>
            <td>Excerpt</td>
            <td>{state.pageData.data.post_excerpt}</td>
          </tr>
          <tr>
            <td>URL</td>
            <td><a target="_blank" href={state.pageData.data.post_url}>{state.pageData.data.post_url}</a></td>
          </tr>
          <tr>
            <td>Author</td>
            <td>{state.pageData.data.post_author}</td>
          </tr>
          <tr>
            <td>Status</td>
            <td>{state.pageData.data.post_status}</td>
          </tr>
          <tr>
            <td>Published</td>
            <td>{state.pageData.data.post_date}</td>
          </tr>
          <tr>
            <td>Modified</td>
            <td>{state.pageData.data.post_modified}</td>
          </tr>
          <tr>
            <td>ID</td>
            <td>{state.pageData.data.ID}</td>
          </tr>
          <tr>
            <td>Slug</td>
            <td>{state.pageData.data.post_name}</td>
          </tr>
					</table>
      </div>
    }


    if (!!state.pageData && !!state.pageData.data && !!state.pageData.data.post_featured) {
      featured_image = <div id="featured-image" onMouseOut={imageMouseOut} onMouseOver={imageMouseOver}>
      <h1>
        <span>Featured Image</span>
        <span id="image-edit" style={hiddenstyle}><a target="_blank" style={linkstyle} href={state.pageData.site.url + "/wp-admin/post.php?action=edit&post=" + state.pageData.data.post_featured.ID}>Edit</a></span>
      </h1>
      <table width="100%">
        <tr>
          <td>Title</td>
          <td>{state.pageData.data.post_featured.post_title}</td>
        </tr>
        <tr>
          <td>Excerpt</td>
          <td>{state.pageData.data.post_featured.post_excerpt}</td>
        </tr>
        <tr>
          <td>URL</td>
          <td><a target="_blank" href={state.pageData.data.post_featured.media_url}>{state.pageData.data.post_featured.media_url}</a></td>
        </tr>
        <tr>
          <td>Author</td>
          <td>{state.pageData.data.post_featured.post_author}</td>
        </tr>
        <tr>
          <td>Published</td>
          <td>{state.pageData.data.post_featured.post_date}</td>
        </tr>
        <tr>
          <td>Modified</td>
          <td>{state.pageData.data.post_featured.post_modified}</td>
        </tr>
        <tr>
          <td>ID</td>
          <td>{state.pageData.data.post_featured.ID}</td>
        </tr>
        <tr>
          <td>Slug</td>
          <td>{state.pageData.data.post_featured.post_name}</td>
        </tr>
        <tr>
          <td>Mime Type</td>
          <td>{state.pageData.data.post_featured.post_mime_type}</td>
        </tr>
      </table>
    </div>
    }

    React.render(
		<div id="subcontainer">
			<div id="header">
			<div id="header-image">
			</div>
			</div>
      <div id="tables">
        <h1>Page</h1>
        <table width="100%">
          <tr>
            <td>Site Name</td>
            <td>{state.pageData.site.name}</td>
          </tr>
          <tr>
            <td>Site Url</td>
            <td><a target="_blank" href={state.pageData.site.url}>{state.pageData.site.url}</a></td>
          </tr>
          <tr>
            <td>Type</td>
            <td>{state.pageData.type}</td>
          </tr>
        </table>

        {author}
        {content}

				{categories}
				{tags}
				{people}
				{locations}
				{organizations}

        {featured_image}

        {
          (() => {
            if (!!state.adData) {
              return <h1>Advertisements</h1>
            }
            return
          })()
        }

        {
        (() => {
          if (!!state.adData) {
            return state.adData.map(getAd)
          }
        })()
        }
      </div></div>,
      document.getElementById('container')
    );
	}
});
