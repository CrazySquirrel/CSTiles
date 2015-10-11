# CSTiles
jQuery plugin for making tiles.
This plugin allows you to create multipurpose tiles.
You can look at other plugins and utilities for web development on the website [CrazySquirrel.ru](http://crazysquirrel.ru/).
## Parameters
### Parameters description
* gridSize - This parameter determines the size of the default grid
			 Can be an array, a number or "auto"
			 The array sizes may also consist of one or two numbers or one or two words "auto"
			 The value "auto" will be automatically replaced by a number such that one grid cell was not less than 200 pixels
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