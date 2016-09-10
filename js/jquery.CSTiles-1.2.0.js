/**
 * CrazySquirrel
 * http://crazysquirrel.ru/
 *
 * @author Yastrebov Sergey
 * @version 1.2.0
 * @copyright 2015 CrazySquirrel
 */

;(function ( $ ) {
	"use strict";
	
	if(typeof $.CrazySquirrel === "undefined"){
		$.CrazySquirrel = {};
	}

	/**
	 * Class of tiles viewer
	 * 
	 * @namespace CrazySquirrel
	 * @class Tiles
	 * @param {JQuery object} that [JQuery object]
	 * @param {object} settings [object with tiles setings]
	 */
	$.CrazySquirrel.Tiles = function(that, settings){
		/**
		 * Pointer to this object
		 * @type {object}
		 */
		var base = this;
		base.that = that.get(0);
		
		/**
		 * Search for more suitable parameters for the grid
		 * @param  {array} optionSize  [array with size]
		 * @param  {array} defaultSize [default sizes]
		 * @return {array} size        [result sizes]
		 */
		base.getsize = function(optionSize,defaultSize){
			var size = [];
			if(optionSize){
				if(Array.isArray(optionSize)){
					if(optionSize.length === 0){
						size =  defaultSize;
					}else{
						if(optionSize[0]*1 && optionSize[0]*1 > 0){
							size[0] = optionSize[0]*1;
						}else{
							size[0] = defaultSize[0];
						}
						if(optionSize.length > 1){
							if(optionSize[1]*1 && optionSize[1]*1 > 0){
								size[1] = optionSize[1]*1;
							}else{
								size[1] = defaultSize[1];
							}
						}else{
							size[1] = size[0];
						}
					}
				}else{
					if(optionSize*1 && optionSize*1 > 0){
						size = [optionSize*1,optionSize*1];
					}else{
						size = defaultSize;
					}
				}
			}else{
				size =  defaultSize;
			}
			return size;
		};
		
		/**
		 * Get data attributes which belong to tiles
		 * @param  {JQuery object} that [tiles or tile]
		 * @return {object} data [object with settings from data attributes]
		 */
		base.getSettingsFromData = function(that){
			var i,j,k,x,y,z;
			var attrs = that.attributes;
			var data;
			if(typeof attrs !== "undefined"){
				for(i = 0; i < attrs.length; i++){
					x = attrs[i].nodeName.toString();
					y = attrs[i].nodeValue.toString();
					y = y.split(",");
					for(j=0;j<y.length;j++){
						if(y[j] === "Y" || y[j] === "true"){y[j] = true;} else 
						if(y[j] === "N" || y[j] === "false"){y[j] = false;} else 
						if(!isNaN(parseFloat(y[j])) && isFinite(y[j])){y[j] = parseInt(y[j]);}
					}
					if(y.length === 1){
						y = y[0];
					}
					
					if(x.indexOf("data-cstiles") !== -1){
						x = x.split("-");
						for(j=1;j<x.length;j++){
							z = x[j].split("_");
							if(z.length>1){
								for(k=1;k<z.length;k++){
									z[k] = z[k].slice(0,1).toUpperCase() + z[k].slice(1).toLowerCase();
								}
							}
							z = z.join("");
							x[j] = z;
						}
						switch(x[2]){
							case "size":
								if(typeof data === "undefined"){data={};}
								data.size = base.getsize(y,["auto","auto"]);
							break;
							case "adaptivSize":
								if(typeof data === "undefined"){data={};}
								if(typeof data.adaptivSize === "undefined"){data.adaptivSize={};}
								data.adaptivSize[z] = base.getsize(y,["auto","auto"]);
							break;
							case "adaptivMedia":
								if(typeof data === "undefined"){data={};}
								if(typeof data.adaptivMedia === "undefined"){data.adaptivMedia={};}
								data.adaptivMedia[z] = y;
							break;
							default:
								if(typeof data === "undefined"){data={};}
								data[x[2]] = y;
						}
					}
				}
			}
			return data;
		};
		
		/**
		 * Initial function
		 */
		base.Init = function(){
			var i,j,x;
			
			var data = base.getSettingsFromData(base.that);
	
			base.settings = {};
			
			var id = (new Date()).getTime().toString()+(Math.round(Math.random()*1000)+"000").substr(0,3);
			$(base.that).data("cstiles-id",id);
			base.settings.id = id;
			
			for(i in $.CrazySquirrel.Tiles.defaultSettings){
				if($.CrazySquirrel.Tiles.defaultSettings.hasOwnProperty(i)){
					switch(i){
						case"size":
							if(typeof settings !== "undefined" && typeof settings[i] !== "undefined"){
								base.settings[i] = base.getsize(settings[i],$.CrazySquirrel.Tiles.defaultSettings[i]);
							}else if(typeof data !== "undefined" && typeof data[i] !== "undefined"){
								base.settings[i] = base.getsize(data[i],$.CrazySquirrel.Tiles.defaultSettings[i]);
							}else{
								base.settings[i] = $.CrazySquirrel.Tiles.defaultSettings[i];
							}
						break;
						case"adaptivSize":
							
						break;
						default:
							if(typeof settings !== "undefined" && typeof settings[i] !== "undefined"){
								base.settings[i] = settings[i];
							}else if(typeof data !== "undefined" && typeof data[i] !== "undefined"){
								base.settings[i] = data[i];
							}else{
								base.settings[i] = $.CrazySquirrel.Tiles.defaultSettings[i];
							}
						break;
					}
				}
			}
			for(i in $.CrazySquirrel.Tiles.defaultSettings){
				if($.CrazySquirrel.Tiles.defaultSettings.hasOwnProperty(i)){
					switch(i){
						case"adaptivSize":
							base.settings[i] = {};
							if(typeof settings !== "undefined" && typeof settings[i] !== "undefined"){
								for(j in settings[i]){
									if(
										settings[i].hasOwnProperty(j) &&
										base.settings.adaptivMedia.hasOwnProperty(j)
									) {
										if($.CrazySquirrel.Tiles.defaultSettings[i].hasOwnProperty(j)){
											x = 	$.CrazySquirrel.Tiles.defaultSettings[i][j];
										}else{
											x = 	["auto","auto"];
										}
										base.settings[i][j] = base.getsize(settings[i][j],x);
									}
								}
							}else if(typeof data !== "undefined" && typeof data[i] !== "undefined"){
								for(j in data[i]){
									if(
										data[i].hasOwnProperty(j) &&
										base.settings.adaptivMedia.hasOwnProperty(j)
									) {
										if($.CrazySquirrel.Tiles.defaultSettings[i].hasOwnProperty(j)){
											x = 	$.CrazySquirrel.Tiles.defaultSettings[i][j];
										}else{
											x = 	["auto","auto"];
										}
										base.settings[i][j] = base.getsize(data[i][j],x);
									}
								}
							}else{
								base.settings[i] = $.CrazySquirrel.Tiles.defaultSettings[i];
							}
						break;
					}
				}
			}
			
			base.settings.tiles = {};
			
			$(base.that).children(".cstiles__item").each(
				function(){
					var i;
					
					var id = (new Date()).getTime().toString()+(Math.round(Math.random()*1000)+"000").substr(0,3);
					$(this).data("cstiles-id",id);
					
					base.settings.tiles[id] = {
						adaptivSize: {},
						adaptivOrder: {},
						element : $(this).clone()
					};
					
					var data = base.getSettingsFromData(this)||{};
					var defaultdata = {
						id:$(this).index(),	
						order:$(this).index(),	
						size:[1,1],		
						margin:base.settings.margin,
						padding:base.settings.padding,
						hoverOut:base.settings.hoverOut,
						hoverBlockColor:base.settings.hoverBlockColor,
						adaptivSize:{},
						adaptivOrder:{},	
						autoClone:base.settings.autoClone,
						autoMove:base.settings.autoMove,	
						animate:base.settings.animate,	
						shareTile:base.settings.shareTile,
						shareTypes:base.settings.shareTypes,	
						imagePosition:base.settings.imagePosition,
						imageSrc:false
					};
					data = $.extend({}, defaultdata, data);
					
					if(typeof settings !== "undefined" && typeof settings.tiles !== "undefined"){
						if(typeof settings.tiles[data.id] !== "undefined"){
							for(i in settings.tiles[data.id]){
								if(settings.tiles[data.id].hasOwnProperty(i)){
									switch(i){
										case "adaptivSize":
											if(typeof settings.tiles[data.id][i] !== "undefined"){
												for(j in settings.tiles[data.id][i]){
													if(settings.tiles[data.id][i].hasOwnProperty(j)){
														data[i][j] = base.getsize(settings.tiles[data.id][i][j],data[i][j]||data.size);
													}	
												}
											}
										break;
										case "size":
											if(typeof settings.tiles[data.id][i] !== "undefined"){
												data[i] = base.getsize(settings.tiles[data.id][i],data[i]);
											}
										break;
										default:
											if(typeof settings.tiles[data.id][i] !== "undefined"){
												data[i] = settings.tiles[data.id][i];
											}
										break;
									}
								}	
							}	
						}
					}
					
					for(i in base.settings.adaptivMedia){
						if(base.settings.adaptivMedia.hasOwnProperty(i)){
							if(typeof data.adaptivSize[i] === "undefined"){
								data.adaptivSize[i] = data.size;
							}
							if(typeof data.adaptivOrder[i] === "undefined"){
								data.adaptivOrder[i] = data.order;
							}
						}		
					}
					
					for(i in data){
						if(data.hasOwnProperty(i)){
							base.settings.tiles[id][i] = data[i];
						}
					}
				}
			);
			
			$(base).on("cstiles:build",base.settings.events.build);
		};
		
		/**
		 * Search function is free space in the grid
		 * @param  {array} size  [array with tile size]
		 * @param  {array} grid  [array of array with free ceils of grid]
		 * @param  {boolean} scale [flag to scale grid or not]
		 * @return {object} result [object with new grid and position of tile]
		 */
		base.findGridPlace = function(size,grid,scale){
			var x,y,z,i,j,f,g,a;
			z = 0;
			do{
				z++;
				f = false;
				if(grid.length-size[1]>0){
					for(y=0;y<=grid.length-size[1];y++){
						for(x=0;x<=grid[y].length-size[0];x++){
							g = true;
							for(i=y;i<y+size[1];i++){
								for(j=x;j<x+size[0];j++){
									if(grid[i][j]){
										g = false;
										break;
									}
								}	
								if(!g){
									break;	
								}
							}
							if(g){
								f = true;
								break;	
							}	
						}
						if(f){
							break;	
						}
					}
				}
				if(!f && scale){
					a = [];
					for(i=0;i<grid[0].length;i++){
						a[i] = false;
					}
					grid.push(a);
					
				}
			}while(f === false && scale && z !== 1000);
			if(f){
				for(i=y;i<y+size[1];i++){
					for(j=x;j<x+size[0];j++){
						grid[i][j] = true;
					}
				}
				return {x:x,y:y,grid:grid};
			}else{
				return false;	
			}
		};
		
		/**
		 * Detect is the grid has free place
		 * @param  {array}  grid [grid]
		 * @return {Boolean} result [has or not]
		 */
		base.isGridHasPlace = function(grid){
			var x,y,z;
			z = false;
			for(y=0;y<grid.length;y++){
				for(x=0;x<grid[y].length;x++){
					if(!grid[y][x]){
						z = true;
						break;	
					}
				}
				if(z){
					break;	
				}
			}
			return z;
		};
		
		/**
		 * Cal padding value
		 * @param  {array} padding [array with padding values]
		 * @return {string} result [css padding]
		 */
		base.preparePadding = function(padding){
			
			if(padding[0] === padding[1]){
				padding = padding[0]+"%";	
			}else{
				padding = padding[1]+"% "+padding[0]+"%";	
			}
			
			return padding;
		};
		
		/**
		 * Cal margin value
		 * @param  {array} margin [array with margin values]
		 * @return {string} result [css margin]
		 */
		base.prepareMargin = function(margin){
			
			if(margin[0] === margin[1]){
				margin = margin[0]+"% 0 0 "+margin[0]+"%";	
			}else{
				margin = margin[1]+"% 0 0 "+margin[0]+"%";
			}
			
			return margin;
		};
		
		/**
		 * Create tile code
		 * @param  {jQuery object} e [tile jquery object]
		 * @param  {object} setting [object with tile settings]
		 * @param  {array} grid [grid array]
		 * @param  {boolian} gridscale [grid scale flag]
		 * @param  {array} gridSize  [array with grid size]
		 * @return {object} result [result object]
		 */
		base.makeTile = function(e,setting,grid,gridscale,gridSize){
			var i,j,x,image,video,audio,size,padding,height,finder,margin,hoverBlock,contentBg/*,movedBlock*/;
			
			if(e.children(".cstiles__item-content-outer").children(".cstiles__item-content").size() == 0){
				e.html([
					"<div class='cstiles__item-content-outer' style='padding:"+setting.margin+"px;'>",
						"<div class='cstiles__item-content' style='padding:"+setting.padding+"px;'>",
							"<div class='cstiles__item-content-inner'>",
								e.html(),
							"</div>",
						"</div>",
					"</div>"
				].join(""));
			}else{
				e.children(".cstiles__item-content-outer").css({
					"padding":setting.margin+"px"	
				});
				e.children(".cstiles__item-content-outer").children(".cstiles__item-content").css({
					"padding":setting.padding+"px"	
				});
			}
			
			x = e.children(".cstiles__item-content-outer").children(".cstiles__item-content").children(".cstiles__item-content-inner");
			
			image = x.children(".cstiles__item-image:first");
			if(image.size()>0||setting.imageSrc){
				contentBg =$("<div class='cstiles__item-content-bg'></div>");
				contentBg.css({
					"background-image":"url("+(setting.imageSrc||image.attr("src"))+")",
					"background-position":setting.imagePosition.join(" "),
					"background-size":"cover"
				});	
				x.parent(".cstiles__item-content").prepend(contentBg);
				image.remove();
			}
			
			video = x.children(".cstiles__item-video:first");
			if(video.size()>0){
				x.before(video);
			}
			
			audio = x.children(".cstiles__item-audio:first");
			if(audio.size()>0){
				x.before(audio);
			}
			
			hoverBlock = x.children(".cstiles__item-hover-block:first");
			if(hoverBlock.size()>0){
				hoverBlock.css({
					"background":setting.hoverBlockColor				
				});
				if(setting.hoverOut){
					hoverBlock.css({
						"margin": -1*setting.padding+"px",
						"padding": setting.padding+"px"	
					});
					hoverBlock.children("*").wrapAll("<div class='cstiles__item-content-inner'></div>");
				}
			}
				
			if(setting.size[0] === "auto"){setting.size[0] = 1;}
			if(setting.size[1] === "auto"){setting.size[1] = 1;}
			size = [Math.min(setting.size[0],gridSize[0]),Math.min(setting.size[1],gridSize[0])];
			
			padding = [(50/gridSize[0]*size[0]),(50/gridSize[0]*size[1])];
			height = padding[1]*2;
				
			padding = base.preparePadding(padding);
			
			if(typeof setting.animate !== "undefined"){
				for(j in setting.animate){
					if(
						setting.animate.hasOwnProperty(j) &&
						setting.animate[j]
					){
						e.addClass("is-animate-"+j);	
					}
				}	
			}
	
			if(setting.shareTile){
				e.children(".cstiles__item-content").CSShare({
					types:setting.shareTypes||[]	
				});
			}
			
			if(base.settings.autoMove && setting.autoMove){
				finder = base.findGridPlace(size,grid,gridscale);
				if(finder){
					grid = finder.grid;
					margin = [(100/gridSize[0]*finder.x),(100/gridSize[0]*finder.y)];
					
					height += margin[1];
					
					margin = base.prepareMargin(margin);
	
					e.css({
						"padding":padding,
						"margin":margin
					});
				}
			}else{
				e.css({
					"padding":padding	
				});
			}
			
			return {
				e:e,
				grid:grid,
				height:height	
			};	
		};
		
		/**
		 * Function of build the grid
		 */
		base.Build = function(){
			var i,j,k,h,g,x,y,z,e,image,media,gridSize,tiles,height,grid,size,padding,margin,_height,fainder,html,make;
			
			for(i in base.settings.adaptivMedia){
				if(base.settings.adaptivMedia.hasOwnProperty(i)){
					if(window.matchMedia(base.settings.adaptivMedia[i]).matches){
						media = i;
					}
				}	
			}
			if(!base.lastmedia || base.lastmedia !== media){
				base.lastmedia = media;
				
				if(base.settings.autoMove){
					$(base.that).addClass("is-auto-fix");	
				}else{
					$(base.that).removeClass("is-auto-fix");
				}
				
				$(base.that).find(".cstiles__item").remove();
				if(media){
					gridSize = base.settings.adaptivSize[media]||base.settings.size;
				}else{
					gridSize = base.settings.size;
				}
				if(gridSize[0] === "auto"){
					gridSize[0] = Math.ceil(base.width()/200);		
				}
				
				tiles = {};
				for(i in base.settings.tiles){
					if(base.settings.tiles.hasOwnProperty(i)){
						tiles[i] = $.extend(
							{},
							base.settings.tiles[i],
							{
								order:base.settings.tiles[i].adaptivOrder[media],
								size:base.settings.tiles[i].adaptivSize[media]	
							}
						);
					}
				}
				
				height = 0;
				grid = [[]];
				for(i=0;i<gridSize[0];i++){
					grid[0][i] = false;
				}
				for(i in tiles){
					if(tiles.hasOwnProperty(i)){
						e = tiles[i].element.clone();
						make = base.makeTile(e,tiles[i],grid,true,gridSize);
						e = make.e;
						grid = make.grid;
						if(make.height>height){height = make.height;}
						that.append(e);
					}
				}
				if(base.settings.autoClone){
					i=0;
					k=0;
					do{
						z = base.isGridHasPlace(grid);
						if(z){
							for(x=gridSize[0];x>0;x--){
								for(y=gridSize[0];y>0;y--){
									size = [x,y];
									fainder = base.findGridPlace(size,grid,false);
									if(fainder){
										padding = [(50/gridSize[0]*size[0]),(50/gridSize[0]*size[1])];
										margin = [(100/gridSize[0]*fainder.x),(100/gridSize[0]*fainder.y)];
										k++;
										e = false;
										h = 0;
										for(j in tiles){
											if(tiles.hasOwnProperty(j)){
												if(h===k){
													e = tiles[j].element.clone();
													break;
												}
												h++;
											}
										}
										if(!e){
											k=0;
											h = 0;
											for(j in tiles){
												if(tiles.hasOwnProperty(j)){
													if(h===k){
														e = tiles[j].element.clone();
														break;
													}
													h++;
												}
											}
										}
										
										e = tiles[j].element.clone();
										make = base.makeTile(e,tiles[j],[],false,gridSize);
										e = make.e;
										padding = base.preparePadding(padding);
										margin = base.prepareMargin(margin);
										e.css({
											"padding":padding,
											"margin":margin
										});
										
										that.append(e);
								
										j++;
										if(j === tiles.length){
											j=0;	
										}
										break;	
									}
								}
								if(fainder){
									break;	
								}
							}
						}
						i++;
					}while(z && i!== 100);
				}
				if(base.settings.autoMove){
					that.append("<div class='cstiles__item is-fixer' style='padding:"+height+"% 0 0 0;'></div>");
				}
				$(base).trigger("cstiles:build");
			}
		};
		
		/**
		 * Calling initial function
		 */
		base.Init();
		
		/**
		 * Calling build function
		 */
		base.Build();
	
		/**
		 * Attache resize event
		 */
		$(window).resize(base.Build);
	};
	
	/**
	 * Default tiles settings
	 * @type {Object}
	 */
	$.CrazySquirrel.Tiles.defaultSettings = {
		size: [4,"auto"],
		autoMove: true,
		autoClone: true,
		margin: 0,
		padding: 0,
		hoverOut: true,
		hoverBlockColor: "rgba(0,0,0,0.5)",
		animate: {
			"zoom":true,
			"share":false,
			"hover-block":false
		},
		adaptivSize: {
			"big-desktop": [8,"auto"],
			"desktop": [8,"auto"],
			"tablet": [4,"auto"],
			"phone-landscape": [4,"auto"],
			"phone": [2,"auto"]
		},
		adaptivMedia: {
			"big-desktop":"screen and (min-width: 1279px)",
			"desktop":"screen and (max-width: 1279px)",
			"tablet":"screen and (max-width: 1023px)",
			"phone-landscape":"screen and (max-width: 767px)",
			"phone":"screen and (max-width: 479px)"
		},
		shareTile: false,
		shareTypes: ["twitter","facebook","vkontakte","print"],
		imagePosition: ["center","center"],
		events:{
			build: function(){
				
			}	
		}
	};
	
	/**
	 * CSTiles plugin registration
	 *
	 * @namespace fn
	 * @param {object} options [object with tile settings]
	 */
	$.fn.CSTiles = function (options) {
		return this.each(function () {
			(new $.CrazySquirrel.Tiles($(this), options));
		});
	};

})( jQuery );