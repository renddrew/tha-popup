# tha-popup
A simple WP plugin for popups that show the content from another WP page. Requires jQuery.

## Usage:

1. Add the shortcode to the page that will have the popup, the pgid shortcode parameter is the WP page to pull the content from. 
```[tha_popup pgid="123" bg="#fff" color="#000"] ```

2. Add a link within the page that will show the popup. Can be anything with a data-popup-id attribute. The id is the WP page id to pull the content from.
```<a data-popup-id="123">Show Popup</a> ```

