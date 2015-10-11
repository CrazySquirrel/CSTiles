/**
 * CrazySquirrel
 * http://crazysquirrel.ru/
 *
 * @author Yastrebov Sergey
 * @version 1.0.0
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
		base.getGridSize = function(optionSize,defaultSize){
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
			var i,x,y;
			var attrs = that.attributes;
			var data;
			if(typeof attrs !== "undefined"){
				for(i = 0; i < attrs.length; i++){
					x = attrs[i].nodeName.toString();
					y = attrs[i].nodeValue.toString();
					
					if(x.indexOf("data-tiles") !== -1){
						$(that).removeAttr(x);
						x = x.substr(11);
						
						if(x.indexOf("grid-size") !== -1){
							x = x.substr(9);
							if(x.indexOf("-") !== -1){
								x = x.substr(1);
								if(typeof data === "undefined"){data={};}
								if(typeof data.adaptivGridSize === "undefined"){data.adaptivGridSize={};}
								data.adaptivGridSize[x] = base.getGridSize(y.split(","),["auto","auto"]);
							}else{
								if(typeof data === "undefined"){data={};}
								data.gridSize = base.getGridSize(y.split(","),["auto","auto"]);
							}
						}else if(x.indexOf("media") !== -1){
							x = x.substr(5);
							if(x.indexOf("-") !== -1){
								x = x.substr(1);
								if(typeof data === "undefined"){data={};}
								if(typeof data.adaptivMedia === "undefined"){data.adaptivMedia={};}
								data.adaptivMedia[x] = y;
							}
						}else if(x.indexOf("move") !== -1){
							x = x.substr(4);
							if(x===""){
								if(typeof data === "undefined"){data={};}
								data.autoMove = y;
							}
						}else if(x.indexOf("clone") !== -1){
							x = x.substr(5);
							if(x===""){
								if(typeof data === "undefined"){data={};}
								data.autoClone = y;
							}
						}else if(x.indexOf("animate") !== -1){
							x = x.substr(7);
							if(x.indexOf("-") !== -1){
								x = x.substr(1);
								if(typeof data === "undefined"){data={};}
								if(typeof data.animate === "undefined"){data.animate={};}
								data.animate[x] = y;
							}
						}else if(x.indexOf("share") !== -1){
							x = x.substr(4);
							if(x===""){
								if(typeof data === "undefined"){data={};}
								data.shareTile = y;
							}
						}else if(x.indexOf("share-types") !== -1){
							x = x.substr(11);
							if(x===""){
								if(typeof data === "undefined"){data={};}
								data.shareTypes = y.split(",");
							}
						}else if(x.indexOf("image-position") !== -1){
							x = x.substr(14);
							if(x===""){
								if(typeof data === "undefined"){data={};}
								data.imagePosition = y.split(",");
							}
						}
					}else if(x.indexOf("data-tile") !== -1){
						$(that).removeAttr(x);
						x = x.substr(10);
						if(x.indexOf("size") !== -1){
							x = x.substr(4);
							if(x.indexOf("-") !== -1){
								x = x.substr(1);
								if(typeof data === "undefined"){data={};}
								if(typeof data.adaptivSize === "undefined"){data.adaptivSize={};}
								data.adaptivSize[x] = base.getGridSize(y.split(","),["auto","auto"]);
							}else{
								if(typeof data === "undefined"){data={};}
								data.size = base.getGridSize(y.split(","),["auto","auto"]);
							}
						}else if(x.indexOf("order") !== -1){
							x = x.substr(5);
							if(x.indexOf("-") !== -1){
								x = x.substr(1);
								if(typeof data === "undefined"){data={};}
								if(typeof data.adaptivOrder === "undefined"){data.adaptivOrder={};}
								data.adaptivOrder[x] = y;
							}else{
								if(typeof data === "undefined"){data={};}
								data.order = y;
							}
						}else if(x.indexOf("move") !== -1){
							x = x.substr(4);
							if(x===""){
								if(typeof data === "undefined"){data={};}
								data.autoMove = y;
							}
						}else if(x.indexOf("clone") !== -1){
							x = x.substr(5);
							if(x===""){
								if(typeof data === "undefined"){data={};}
								data.autoClone = y;
							}
						}else if(x.indexOf("id") !== -1){
							x = x.substr(4);
							if(x===""){
								if(typeof data === "undefined"){data={};}
								data.id = y;
							}
						}else if(x.indexOf("animate") !== -1){
							x = x.substr(7);
							if(x.indexOf("-") !== -1){
								x = x.substr(1);
								if(typeof data === "undefined"){data={};}
								if(typeof data.animate === "undefined"){data.animate={};}
								data.animate[x] = y;
							}
						}else if(x.indexOf("share") !== -1){
							x = x.substr(4);
							if(x===""){
								if(typeof data === "undefined"){data={};}
								data.shareTile = y;
							}
						}else if(x.indexOf("share-types") !== -1){
							x = x.substr(11);
							if(x===""){
								if(typeof data === "undefined"){data={};}
								data.shareTypes = y.split(",");
							}
						}else if(x.indexOf("image-position") !== -1){
							x = x.substr(14);
							if(x===""){
								if(typeof data === "undefined"){data={};}
								data.imagePosition = y.split(",");
							}
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
			$(base.that).data("tiles-id",id);
			base.settings.id = id;
			
			for(i in $.CrazySquirrel.Tiles.defaultSettings){
				if($.CrazySquirrel.Tiles.defaultSettings.hasOwnProperty(i)){
					switch(i){
						case"gridSize":
							if(typeof settings !== "undefined" && typeof settings[i] !== "undefined"){
								base.settings[i] = base.getGridSize(settings[i],$.CrazySquirrel.Tiles.defaultSettings[i]);
							}else if(typeof data !== "undefined" && typeof data[i] !== "undefined"){
								base.settings[i] = base.getGridSize(data[i],$.CrazySquirrel.Tiles.defaultSettings[i]);
							}else{
								base.settings[i] = $.CrazySquirrel.Tiles.defaultSettings[i];
							}
						break;
						case"adaptivGridSize":
							
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
						case"adaptivGridSize":
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
										base.settings[i][j] = base.getGridSize(settings[i][j],x);
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
										base.settings[i][j] = base.getGridSize(data[i][j],x);
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
			
			$(base.that).find(".tiles__item").each(
				function(){
					var i;
					
					var id = (new Date()).getTime().toString()+(Math.round(Math.random()*1000)+"000").substr(0,3);
					$(this).data("tile-id",id);
					
					base.settings.tiles[id] = {
						adaptivSize: {},
						adaptivOrder: {},
						element : $(this).clone()
					};
					
					var data = base.getSettingsFromData(this);
					
					if(typeof data === "undefined"){
						data = {};	
					}
					if(typeof data.id === "undefined"){
						data.id = $(this).index();	
					}
					if(typeof data.order === "undefined"){
						data.order = $(this).index();	
					}
					if(typeof data.size === "undefined"){
						data.size = [1,1];	
					}
					if(typeof data.adaptivSize === "undefined"){
						data.adaptivSize = {};	
					}
					if(typeof data.adaptivOrder === "undefined"){
						data.adaptivOrder = {};	
					}
					if(typeof data.autoClone === "undefined"){
						data.autoClone = base.settings.autoClone;	
					}
					if(typeof data.autoMove === "undefined"){
						data.autoMove = base.settings.autoMove;	
					}
					if(typeof data.animate === "undefined"){
						data.animate = base.settings.animate;	
					}
					if(typeof data.shareTile === "undefined"){
						data.shareTile = base.settings.shareTile;	
					}
					if(typeof data.shareTypes === "undefined"){
						data.shareTypes = base.settings.shareTypes;	
					}
					if(typeof data.imagePosition === "undefined"){
						data.imagePosition = base.settings.imagePosition;	
					}
					
					if(typeof settings !== "undefined" && typeof settings.tiles !== "undefined"){
						if(typeof settings.tiles[data.id] !== "undefined"){
							for(i in settings.tiles[data.id]){
								if(settings.tiles[data.id].hasOwnProperty(i)){
									switch(i){
										case "adaptivSize":
											if(typeof settings.tiles[data.id][i] !== "undefined"){
												for(j in settings.tiles[data.id][i]){
													if(settings.tiles[data.id][i].hasOwnProperty(j)){
														data[i][j] = base.getGridSize(settings.tiles[data.id][i][j],data[i][j]||data.size);
													}	
												}
											}
										break;
										case "size":
											if(typeof settings.tiles[data.id][i] !== "undefined"){
												data[i] = base.getGridSize(settings.tiles[data.id][i],data[i]);
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
				return {
					x:x,
					y:y,
					grid:grid	
				};
			}else{
				return false;	
			}
		};
		
		/**
		 * Function of build the grid
		 */
		base.Build = function(){
			var i,j,k,h,g,x,y,z,e,media,gridSize,tiles,height,grid,size,padding,margin,_height,fainder,html;
			
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
				
				$(base.that).find(".tiles__item").remove();
				if(media){
					gridSize = base.settings.adaptivGridSize[media]||base.settings.gridSize;
				}else{
					gridSize = base.settings.gridSize;
				}
				if(gridSize[0] === "auto"){
					gridSize[0] = Math.ceil(base.width()/200);		
				}
				
				tiles = {};
				for(i in base.settings.tiles){
					if(base.settings.tiles.hasOwnProperty(i)){
						tiles[i] = {
							element:base.settings.tiles[i].element.clone(),
							order:base.settings.tiles[i].adaptivOrder[media]||base.settings.tiles[i].order,
							size:base.settings.tiles[i].adaptivSize[media]||base.settings.tiles[i].size,
							autoMove:base.settings.tiles[i].autoMove,
							autoClone:base.settings.tiles[i].autoMove,
							animate:base.settings.tiles[i].animate,
							shareTile:base.settings.tiles[i].shareTile,
							shareTypes:base.settings.tiles[i].shareTypes,
							imagePosition:base.settings.tiles[i].imagePosition
						};
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
						
						size = [Math.min(tiles[i].size[0],gridSize[0]),Math.min(tiles[i].size[1],gridSize[0])];
						padding = [(50/gridSize[0]*size[0]),(50/gridSize[0]*size[1])];
						_height = padding[1]*2;
						
						if(
							e.find("img").get(0).naturalHeight/padding[1] < e.find("img").get(0).naturalWidth/padding[0]
						){
							e.find("img").addClass("is-horizontal");
						}else{
							e.find("img").addClass("is-vertical");
						}
						
						if(padding[0] === padding[1]){
							padding = padding[0]+"%";	
						}else{
							padding = padding[1]+"% "+padding[0]+"%";	
						}
						
						if(typeof tiles[i].animate !== "undefined"){
							for(j in tiles[i].animate){
								if(
									tiles[i].animate.hasOwnProperty(j) &&
									tiles[i].animate[j]
								){
									e.addClass("is-animate-"+j);	
								}
							}	
						}
						
						if(tiles[i].shareTile && tiles[i].shareTypes.length>0){
							x="";
							for(j=0;j<tiles[i].shareTypes.length;j++){
								x+="<div class='tiles__item-share-item is-"+tiles[i].shareTypes[j]+"' data-share-type='"+tiles[i].shareTypes[j]+"'></div>";
							}
							e.append("<div class='tiles__item-share'>"+x+"</div>");
						}
						
						if(base.settings.autoMove && tiles[i].autoMove){
							fainder = base.findGridPlace(size,grid,true);
							if(fainder){
								grid = fainder.grid;
								
								margin = [(100/gridSize[0]*fainder.x),(100/gridSize[0]*fainder.y)];
								
								_height += margin[1];
								
								if(_height>height){height = _height;}
								
								if(margin[0] === margin[1]){
									margin = margin[0]+"% 0 0 "+margin[0]+"%";	
								}else{
									margin = margin[1]+"% 0 0 "+margin[0]+"%";
								}
								
								e.css({
									"padding":padding,
									"margin":margin
								});
								that.append(e);
							}
						}else{
							e.css({
								"padding":padding	
							});
							that.append(e);
						}
					}
				}
				if(base.settings.autoClone){
					i=0;
					k=0;
					do{
						z = false;
						for(y=0;y<=grid.length-size[1];y++){
							for(x=0;x<=grid[y].length-size[0];x++){
								if(grid[y][x]){
									z = true;
									break;	
								}
							}
							if(z){
								break;	
							}
						}
						if(z){
							for(x=gridSize[0];x>0;x--){
								for(y=gridSize[0];y>0;y--){
									fainder = base.findGridPlace([x,y],grid,false);
									if(fainder){
										size = [x,y];
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
										
										if(typeof tiles[j].animate !== "undefined"){
											for(g in tiles[j].animate){
												if(
													tiles[j].animate.hasOwnProperty(g) &&
													tiles[j].animate[g]
												){
													e.addClass("is-animate-"+g);	
												}
											}	
										}
										
										if(tiles[j].shareTile && tiles[j].shareTypes.length>0){
											html="";
											for(g=0;g<tiles[j].shareTypes.length;g++){
												html+="<div class='tiles__item-share-item is-"+tiles[j].shareTypes[g]+"' data-share-type='"+tiles[j].shareTypes[g]+"'></div>";
											}
											e.append("<div class='tiles__item-share'>"+html+"</div>");
										}
										
										if(
											e.find("img").get(0).naturalHeight/padding[1] < e.find("img").get(0).naturalWidth/padding[0]
										){
											e.find("img").addClass("is-horizontal");
										}else{
											e.find("img").addClass("is-vertical");
										}
										
										if(padding[0] === padding[1]){
											padding = padding[0]+"%";	
										}else{
											padding = padding[1]+"% "+padding[0]+"%";	
										}
										if(margin[0] === margin[1]){
											margin = margin[0]+"% 0 0 "+margin[0]+"%";	
										}else{
											margin = margin[1]+"% 0 0 "+margin[0]+"%";
										}
										
										e.css({
											"padding":padding,
											"margin":margin
										});
										that.append(e);
										j++;
										if(j === tiles.length){
											j=0;	
										}
										grid = fainder.grid;
										break;	
									}
								}
								if(fainder){
									break;	
								}
							}
						}
						i++;
					}while(z && i!== 1000);
				}
				if(base.settings.autoMove){
					that.append("<div class='tiles__item is-fixer' style='padding:"+height+"% 0 0 0;'></div>");
				}
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
	
	/**
	 * Attache share event
	 */
	$(document).on("click",".tiles__item-share-item",
		function(){
			var type = $(this).attr('data-share-type');
			var title;
			var description;
			var img;
			var u;
			var url;
			var chars;
			var k;
			
			if($(this).closest('.tiles__item').attr('data-tile-title')){
				title = $(this).closest('.tiles__item').attr('data-tile-title');
			}else if($("meta[type='og:title']").size()>0){
				title = $("meta[type='og:title']").attr("content");
			}else if($(".og-title").size()>0){
				title = $(".og-title").attr("data-title");
			}else{
				title = $("title").text();
			}
			
			if($(this).closest('.tiles__item').attr('data-tile-description')){
				description = $(this).closest('.tiles__item').attr('data-tile-description');
			}else if($("meta[type='og:description']").size()>0){
				description = $("meta[type='og:description']").attr("content");
			}else if($("meta[type='description']").size()>0){
				description = $("meta[type='description']").attr("content");
			}else if($(".og-description").size()>0){
				description = $(".og-description").attr("data-description");
			}else{
				description = "";
			}
			
			if($(this).closest('.tiles__item').attr('data-tile-image')){
				img = $(this).closest('.tiles__item').attr('data-tile-image');
			}else if($("meta[type='og:image']").size()>0){
				img = $("meta[type='og:image']").attr("content");
			}else if($(".og-image").size()>0){
				img = $(".og-image").attr("data-image");
			}else if($(".logo img").size()>0){
				img = 'http://'+location.host+$(".logo img").attr("src");
			}
			
			if($(this).closest('.tiles__item').attr('data-tile-url')){
				u = $(this).closest('.tiles__item').attr('data-tile-url');
			}else{
				u = location.href;
			}
			
			if(type === "print"){
				print();
			}else if(type === "email"){
				location.href="mailto:?subject="+title+"&body="+description+"\r\n"+u;
			}else{
				url = '';
				chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
				k = '';
				for( var i=0; i < 5; i++ ){
					k += chars.charAt(Math.floor(Math.random() * chars.length));
				}
			
				url = '';
				url += 'http://share.pluso.ru/process?';
				url += 'act=share';
				url += '&u='+encodeURIComponent(u);
				url += '&w='+screen.width;
				url += '&h='+screen.height;
				url += '&ref=';
				url += '&uid=1364166423835';
				url += '&k='+k;
				url += '&type='+type;
				url += '&t='+encodeURIComponent(title);
				url += '&s='+encodeURIComponent(description);
				url += '&img='+encodeURIComponent(img);
			
				window.open(url,type, 'toolbar=0,status=0,width=626,height=436');
				
			}
			
			return false;
		}
	);
	
})( jQuery );