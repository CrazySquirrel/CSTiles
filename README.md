# CSTiles
jQuery plugin for making tiles.
This plugin allows you to create multipurpose tiles.
You can look at other plugins and utilities for web development on the website [CrazySquirrel.ru](http://crazysquirrel.ru/).
## Parameters
### Parameters description
* gridSize - This parameter determines the size of the default grid.
			 Can be an array, a number or "auto".
			 The array sizes may also consist of one or two numbers or one or two words "auto".
			 The value "auto" will be automatically replaced by a number such that one grid cell was not less than 200 pixels.
			 The second value in array while not being used.
* autoMove - The flag determines whether you are allowed to rearrange the tile to fill the spaces.
* autoClone - The flag determines whether to allow to clone tile to fill the spaces.
* animate - Object flags define the animation.
	* zoom - The flag allows or prohibits the animation of images when hovered.
	* share - The flag allows or prohibits the animation shered block when when hovered.
* adaptivGridSize - Object with mesh sizes under adaptive resolution.
					As keys uses the names adaptive resolution, and the values in type are a gridSize.
* adaptivMedia - The object with adaptive media queries.
				 As keys are adaptive permissions.
* shareTile - The flag determines whether to allow share of tiles.
* shareTypes - An array with the names of views share.
			   May include the following values.
			   ["facebook","twitter","vkontakte","odnoklassniki","google","yahoo","misterwong","moimir","friendfeed","yandex","webmoney","vkrugu","juick","pinterest","myspace","googlebookmark","stumbleupon","instapaper","email","springpad","print","linkedin","readability","pinme","surfingbird","webdiscover","memori","livejournal","blogger","liveinternet","evernote","bobrdobr","moemesto","formspring","yazakladki","moikrug","bookmark","digg","tumblr","delicious"]
* imagePosition - An array of two or one element, Ivo a string that specifies the position of the image.
				  May include the values ["left|center|right","top|center|bottom"].		  
				  While not being used
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
	* shareTile - Flag to override the share options.
	* shareTypes - Array types share.
	* imagePosition	- The object or number to preobragenia image position in a particular tile.

### Setting
The options for tiles and a particular tile can be specified when invoking the plugin or via data - attributes.
When you call peredaetsa structured object as the default parameters.
If you specify options via data, you can use the following values.
### Default parameters
```javascript
gridSize: [4,"auto"],
autoMove: true,
autoClone: true,
animate: {
	"zoom":true,
	"share":true
},
adaptivGridSize: {
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
<div class="tiles" data-tiles-grid-size="4,auto">
	<a class="tiles__item" data-tile-size="2" href="http://crazysquirrel.ru/" rel="prefetch" title=" ">
    	<img src="http://ru.crazysquirrel.ru/bitrix/templates/crazysquirrel/images/logotype-share.png" alt=" ">
    </a>
    <a class="tiles__item" data-tile-size="1" href="http://crazysquirrel.ru/" rel="prefetch" title=" ">
    	<img src="http://ru.crazysquirrel.ru/bitrix/templates/crazysquirrel/images/logotype-share.png" alt=" ">
    </a>
    <a class="tiles__item" data-tile-size="1,2" href="http://crazysquirrel.ru/" rel="prefetch" title=" ">
    	<img src="http://ru.crazysquirrel.ru/bitrix/templates/crazysquirrel/images/logotype-share.png" alt=" ">
    </a>
    <a class="tiles__item" data-tile-size="1" href="http://crazysquirrel.ru/" rel="prefetch" title=" ">
    	<img src="http://ru.crazysquirrel.ru/bitrix/templates/crazysquirrel/images/logotype-share.png" alt=" ">
    </a>
    <a class="tiles__item" data-tile-size="2,1" href="http://crazysquirrel.ru/" rel="prefetch" title=" ">
    	<img src="http://ru.crazysquirrel.ru/bitrix/templates/crazysquirrel/images/logotype-share.png" alt=" ">
    </a>
    <a class="tiles__item" data-tile-size="1" href="http://crazysquirrel.ru/" rel="prefetch" title=" ">
    	<img src="http://ru.crazysquirrel.ru/bitrix/templates/crazysquirrel/images/logotype-share.png" alt=" ">
    </a>
    <a class="tiles__item" data-tile-size="1" href="hhttp://crazysquirrel.ru/" rel="prefetch" title=" ">
    	<img src="http://ru.crazysquirrel.ru/bitrix/templates/crazysquirrel/images/logotype-share.png" alt=" ">
    </a>
    <a class="tiles__item" data-tile-size="2,1" href="http://crazysquirrel.ru/" rel="prefetch" title=" ">
    	<img src="http://ru.crazysquirrel.ru/bitrix/templates/crazysquirrel/images/logotype-share.png" alt=" ">
    </a>
    <a class="tiles__item" data-tile-size="1" href="http://crazysquirrel.ru/" rel="prefetch" title=" ">
    	<img src="http://ru.crazysquirrel.ru/bitrix/templates/crazysquirrel/images/logotype-share.png" alt=" ">
    </a>
    <a class="tiles__item" data-tile-size="1" href="http://crazysquirrel.ru/" rel="prefetch" title=" ">
    	<img src="http://ru.crazysquirrel.ru/bitrix/templates/crazysquirrel/images/logotype-share.png" alt=" ">
    </a>
</div>
```
### JavaScript
```javascript
$(function(){
	$(".tiles").CSTiles();
});
```