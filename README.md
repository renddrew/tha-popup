# Tha Popup

A simple WordPress plugin that loads the content from another WP page or post via ajax - on window load or click. Requires jQuery.

## Usage:

### Method 1: 
Add a link using shortcode:
```[tha_popup_link page_id="123" lazy_load="true|onclick" link_text="Click Me" bg="#fff" color="#000" classes="" show_title="1"] ```

### Method 2:
Add a "tha-popup-trigger" class and data attributes to whichever html element you'd like to have trigger the popup.
**Data attributes:**
- data-tha-popup-id="123" (required WP post id)
- data-tha-popup-lazy="true|onclick"
- data-tha-popup-color="#fff"
- data-tha-popup-bg="#000"
- data-tha-popup-title="1"



