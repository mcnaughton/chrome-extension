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
										<td>{bitem.term_url}</td>
										</tr>
										<tr>
										<td>Slug</td>
										<td>{bitem.slug}</td>
										</tr>
										<tr>
										<td>Term ID</td>
										<td>{bitem.term_id}</td>
										</tr>
										<tr>
										<td>Taxonomy</td>
										<td>{bitem.taxonomy}</td>
										</tr>
										<tr>
										<td>Taxonomy ID</td>
										<td>{bitem.term_taxonomy_id}</td>
										</tr>
										<tr>
										<td>Count</td>
										<td>{bitem.count}</td>
										</tr>
									</table>
									{sep}
									</div>
				},
        getAd = function(aitem) {
            return <div class="advertisement">
              <h2>{aitem.slot}</h2>
              <table width="100%">
                <tr>
                  <td>URL</td>
                  <td><a href={aitem.src}>{aitem.src}</a></td>
                </tr>
                <tr>
                  <td>Unit Targeting</td>
                  <td><table>{Object.keys(aitem.targeting.unit).map(
                    ((map) =>
                      ((key) =>
                        <tr>
                          <td>{key}</td>
                          <td>{map[key].join(", ")}</td>
                        </tr>
                      )
                    )(aitem.targeting.unit)
                  )}</table></td>
                </tr>
                <tr>
                  <td>Page Targeting</td>
                  <td><table>{Object.keys(aitem.targeting.page).map(
                    ((map) =>
                      ((key) =>
                        <tr>
                          <td>{key}</td>
                          <td>{map[key].join(", ")}</td>
                        </tr>
                      )
                    )(aitem.targeting.page)
                  )}</table></td>
                </tr>
              </table>
            </div>
        };

    if (!!state.pageData && !!state.pageData.author) {
          author = <div id="author" onMouseOut={authorMouseOut} onMouseOver={authorMouseOver}>
          <h1>
            <span>Author</span>
            <span id="author-edit" style={hiddenstyle}><a target="_blank" style={linkstyle} href="{state.pageData.site.url}/wp-admin/user-edit.php?user_id={state.pageData.author.data.ID}">Edit</a></span>
          </h1>
          <table width="100%">
            <tr>
              <td>Display Name</td>
              <td>{state.pageData.author.data.display_name}</td>
            </tr>
            <tr>
              <td>ID</td>
              <td>{state.pageData.author.data.ID}</td>
            </tr>
            <tr>
              <td>Login</td>
              <td>{state.pageData.author.data.user_login}</td>
            </tr>
            <tr>
              <td>URL</td>
              <td><a href={state.pageData.author.data.user_url}>{state.pageData.author.data.user_url}</a></td>
            </tr>
            <tr>
              <td>Slug</td>
              <td>{state.pageData.author.data.user_nicename}</td>
            </tr>
            <tr>
              <td>Registered</td>
              <td>{state.pageData.author.data.user_registered}</td>
            </tr>
          </table>
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
            <td><a href={state.pageData.data.post_url}>{state.pageData.data.post_url}</a></td>
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
					<h2>Categories</h2>
					<table>{state.pageData.categories.map(
						((len) =>
							(el, i) =>
								doTerm(el, i !== (len - 1))
						)(state.pageData.categories.length)
					)}</table>
					<h2>Tags</h2>
					<table>{state.pageData.tags.map(
						((len) =>
							(el, i) =>
								doTerm(el, i !== (len - 1))
						)(state.pageData.tags.length)
					)}</table>
{people}
{locations}
{organizations}
      </div>
    }


    if (!!state.pageData && !!state.pageData.data && !!state.pageData.data.post_featured) {
      featured_image = <div id="featured-image" onMouseOut={imageMouseOut} onMouseOver={imageMouseOver}>
      <h1>
        <span>Featured Image</span>
        <span id="image-edit" style={hiddenstyle}><a target="_blank" style={linkstyle} href="{state.pageData.site.url}/wp-admin/post.php?action=edit&post={state.pageData.data.post_featured.ID}">Edit</a></span>
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
          <td><a href={state.pageData.data.post_featured.media_url}>{state.pageData.data.post_featured.media_url}</a></td>
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
            <td><a href={state.pageData.site.url}>{state.pageData.site.url}</a></td>
          </tr>
          <tr>
            <td>Type</td>
            <td>{state.pageData.type}</td>
          </tr>
        </table>

        {author}
        {content}
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
