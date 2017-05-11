# tha-popup

A simple WordPress plugin that loads the content from another WP page via ajax - on window load or click. Requires jQuery.

## Usage:

### Method 1: 
Add a link using shortcode:
```[tha_popup_link page_id="123" lazy_load="true|onclick" link_text="Click Me" bg="#fff" color="#000" classes=""] ```

### Method 2:
Add a "tha-popup-trigger" class and data attributes to whatever html element you'd like to have load and trigger the popup.
	Data attributes:
	 - data-tha-popup-id="123"
	 - data-tha-popup-lazy="true|onclick"
	 - data-tha-popup-color="#fff"
	 - data-tha-popup-bg="#000"



