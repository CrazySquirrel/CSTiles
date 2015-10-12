# CSTiles
jQuery plugin for making tiles.
This plugin allows you to create multipurpose tiles.
You can look at other plugins and utilities for web development on the website [CrazySquirrel.ru](http://crazysquirrel.ru/).
## Parameters
### Parameters description
* size - This parameter determines the size of the default grid.
			 Can be an array, a number or "auto".
			 The array sizes may also consist of one or two numbers or one or two words "auto".
			 The value "auto" will be automatically replaced by a number such that one grid cell was not less than 200 pixels.
			 The second value in array while not being used.
* autoMove - The flag determines whether you are allowed to rearrange the tile to fill the spaces.
* autoClone - The flag determines whether to allow to clone tile to fill the spaces.
* animate - Object flags define the animation.
* margin - Margin between tiles.
* adaptivSize - Object with mesh sizes under adaptive resolution.
					As keys uses the names adaptive resolution, and the values in type are a gridSize.
* adaptivMedia - The object with adaptive media queries.
				 As keys are adaptive permissions.
* shareTile - The flag determines whether to allow share of tiles. [Requered CSShare].
* shareTypes - An array with the names of views share.
			   May include the following values.
			   ["facebook","twitter","vkontakte","odnoklassniki","google","yahoo","misterwong","moimir","friendfeed","yandex","webmoney","vkrugu","juick","pinterest","myspace","googlebookmark","stumbleupon","instapaper","email","springpad","print","linkedin","readability","pinme","surfingbird","webdiscover","memori","livejournal","blogger","liveinternet","evernote","bobrdobr","moemesto","formspring","yazakladki","moikrug","bookmark","digg","tumblr","delicious"]
* imagePosition - An array of two or one element, Ivo a string that specifies the position of the image.
				  May include the values ["left|center|right","top|center|bottom"].		  
				  While not being used
* imageSrc - Src to tile bg image.
* tiles - The array with parameters for each tile.
		  As keys used tile id, and the value is an object with parameters.
	* id - A unique number identifies this tile.	
	* order - The number determines the order of tile or approximate order if you enable autoperimeter.
	* size - Number or array of numbers defining how many cells will be occupied by the corresponding tile.
	* adaptivSize - Array with adaptive tile size by analogy with adaptivGridSize.
	* adaptivOrder - Array with adaptive paradime sort. Used if different permissions need to change the tile in some places.
	* autoClone - Flag for excluding tile from autoperimeter.
	* autoMove - Flag for excluding tile from cloning.
	* animate - Object with the animation settings. To override for a specific tile.
	* margin - Margin between tiles.
	* shareTile - Flag to override the share options.
	* shareTypes - Array types share.
	* imagePosition	- The object or number to preobragenia image position in a particular tile.
	* imageSrc - Src to tile bg image.

### Setting
The options for tiles and a particular tile can be specified when invoking the plugin or via data - attributes.
When you call peredaetsa structured object as the default parameters.
If you specify options via data, you can use the following values.
* For tiles
	* data-cstiles-size - Sets gridSize value separet by ,
	* data-cstiles-size-... - Sets adaptivGridSize where ... replaced by name and value separet by ,
	* data-cstiles-media-... - Sets adaptivMedia where ... replaced by name
	* data-cstiles-move - Sets autoMove
	* data-cstiles-clone - Sets autoClone
	* data-cstiles-animate-... - Sets animate where ... replaced by name
	* data-cstiles-share - Sets shareTile
	* data-cstiles-share_types - Sets shareTypes where value separet by ,
	* data-cstiles-image_position - Sets imagePosition where value separet by ,
	* data-cstiles-image_src - Sets imageSrc
* For tile
	* data-cstiles-size - Sets size value separet by ,
	* data-cstiles-size-... - Sets adaptivSize where ... replaced by name and value separet by ,
	* data-cstiles-order - Sets order
	* data-cstiles-order-... - Sets adaptivOrder where ... replaced by name
	* data-cstiles-move - Sets autoMove
	* data-cstiles-clone - Sets autoClone
	* data-cstiles-id - Sets id
	* data-cstiles-animate-... - Sets animate where ... replaced by name
	* data-cstiles-share - Sets shareTile
	* data-cstiles-share_types - Sets shareTypes where value separet by ,
	* data-cstiles-image_position - Sets imagePosition where value separet by ,
	* data-cstiles-image_src - Sets imageSrc

### Default parameters
```javascript
size: [4,"auto"],
autoMove: true,
autoClone: true,
margin: 0,
animate: {
},
adaptivSize: {
	"big-desktop": [6,"auto"],
	"desktop": [4,"auto"],
	"tablet": [3,"auto"],
	"phone-landscape": [2,"auto"],
	"phone": [1,"auto"]
},
adaptivMedia: {
	"big-desktop":"screen and (min-width: 1279px)",
	"desktop":"screen and (max-width: 1279px)",
	"tablet":"screen and (max-width: 1023px)",
	"phone-landscape":"screen and (max-width: 767px)",
	"phone":"screen and (max-width: 479px)"
},
shareTile: true,
shareTypes: ["twitter","facebook","vkontakte","print"],
imagePosition: ["center","center"] 
```
## Example
### HTML
```html
<!doctype html>
<html>
<head>
<meta charset="UTF-8">
<title>CSTiles</title>
<link rel="stylesheet" data-template-style="true" type="text/css" href="css/CSTiles-1.1.0.css">
</head>

<body>
<div class="cstiles" data-cstiles-size="4,auto" data-cstiles-margin="5">
    <div class="cstiles__item" data-cstiles-size="2">
        <iframe class="cstiles__item-video" width="500" height="500" src="https://www.youtube.com/embed/w1I-HWAP6N8?controls=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>
    </div>
    <div class="cstiles__item" data-cstiles-size="1" data-cstiles-image_src="images/2.jpg">
    </div>
    <div class="cstiles__item" data-cstiles-size="1,2">
        <img class="cstiles__item-image" src="images/3.jpg" alt=" ">
    </div>
    <div class="cstiles__item" data-cstiles-size="1" data-cstiles-order="1" data-cstiles-order-tablet="1">
         <img class="cstiles__item-image" src="images/4.jpg" alt=" ">
    </div>
    <div class="cstiles__item" data-cstiles-size="2,1" data-cstiles-order="2" data-cstiles-order-tablet="2" data-cstiles-image_position="left,bottom">
        <img class="cstiles__item-image" src="images/5.jpg" alt=" ">
    </div>
    <div class="cstiles__item" data-cstiles-size="1">
         <img class="cstiles__item-image" src="images/6.jpg" alt=" ">
    </div>
    <div class="cstiles__item" data-cstiles-size="1">
        <img class="cstiles__item-image" src="images/7.jpg" alt=" ">
    </div>
    <div class="cstiles__item" data-cstiles-size="2,1">
         <img class="cstiles__item-image" src="images/8.jpg" alt=" ">
    </div>
    <div class="cstiles__item" data-cstiles-size="1">
        <img class="cstiles__item-image" src="images/9.jpg" alt=" ">
    </div>
    <div class="cstiles__item" data-cstiles-size="1">
      <img class="cstiles__item-image" src="images/10.jpg" alt=" ">
    </div>
</div>
<script src="js/jquery-1.11.3.min.js"></script>
<script src="js/jquery.CSTiles-1.1.0.min.js"></script>
<script src="js/index.js"></script>
</body>
</html>
```
### JavaScript
```javascript
$(function(){
    $(".cstiles").CSTiles({
		shareTile: false	
	});
});
```