"use strict";
/**
 * Grid params class
 */
var GridParamsClass = (function () {
    function GridParamsClass() {
        this.gridID = "";
        this.gridSize = 8;
        this.tileMargin = 8;
        this.tilePadding = 8;
        this.tileContent = {
            type: "none"
        };
        this.adaptiveMedia = {
            "imac": "2560-",
            "desktops-huge": "1920-2560",
            "desktops-big": "1600-1920",
            "desktops": "1440-1600",
            "base": "1280-1440",
            "tablet-landscape": "1024-1280",
            "tablet": "768-1024",
            "phone-landscape": "480-768",
            "phone": "320-480",
            "small": "-320"
        };
        this.gridAdaptiveSize = {
            "imac": 10,
            "desktops-huge": 10,
            "desktops-big": 10,
            "desktops": 8,
            "base": 6,
            "tablet-landscape": 6,
            "tablet": 4,
            "phone-landscape": 3,
            "phone": 2,
            "small": 1
        };
        this.tileAdaptiveMargin = {};
        this.tileAdaptivePadding = {};
    }
    return GridParamsClass;
}());
/**
 * Tile params class
 */
var TileParamsClass = (function () {
    function TileParamsClass() {
        this.tileID = "";
        this.tileSize = [2, 2];
        this.tilePosition = [];
        this.tileMargin = 0;
        this.tilePadding = 0;
        this.tileContent = {
            type: "none"
        };
        this.tileWrapID = "";
        this.tileContentID = "";
        this.tileAdaptiveSize = {
            "imac": [2, 2],
            "desktops-huge": [2, 2],
            "desktops-big": [2, 2],
            "desktops": [2, 2],
            "base": [2, 2],
            "tablet-landscape": [3, 3],
            "tablet": [2, 2],
            "phone-landscape": [1, 1],
            "phone": [1, 1],
            "small": [1, 1]
        };
        this.tileAdaptivePosition = {};
        this.tileAdaptiveMargin = {};
        this.tileAdaptivePadding = {};
    }
    return TileParamsClass;
}());
/**
 * CSTiles class
 */
var CSTiles = (function () {
    /**
     * CSTiles tile constructor
     * @param domParentNode
     * @param objGridParams
     * @param arrTiles
     */
    function CSTiles(domParentNode, objGridParams, arrTiles) {
        /**
         * Assign default params
         */
        objGridParams = this.assignDefaultGridParams(objGridParams);
        var _a = this.assignDefaultTileParams(objGridParams, arrTiles), _arrTiles = _a._arrTiles, grid = _a.grid, adaptiveGrid = _a.adaptiveGrid;
        arrTiles = _arrTiles;
        /**
         * Parameter validation errors
         */
        if (!this.checkInnerParamsForErrors(domParentNode, objGridParams, arrTiles)) {
            var arrCss = {};
            arrCss[""] = {};
            /**
             * Create grid DOM
             */
            var domGrid = document.createElement("div");
            domGrid.id = objGridParams.gridID;
            /**
             * Write grid styles
             */
            arrCss[""][domGrid.id] = {};
            arrCss[""][domGrid.id]["display"] = "block";
            arrCss[""][domGrid.id]["position"] = "relative";
            arrCss[""][domGrid.id]["width"] = "100%";
            arrCss[""][domGrid.id]["height"] = "auto";
            /**
             * Loop tiles
             */
            for (var _i = 0, arrTiles_1 = arrTiles; _i < arrTiles_1.length; _i++) {
                var objTile = arrTiles_1[_i];
                /**
                 * Create tile DOM
                 */
                var domTile = document.createElement("div");
                domTile.id = objTile.tileID;
                domGrid.appendChild(domTile);
                /**
                 * Write tile styles
                 */
                arrCss[""][objTile.tileID] = {};
                arrCss[""][objTile.tileID]["width"] = "0";
                arrCss[""][objTile.tileID]["height"] = "0";
                arrCss[""][objTile.tileID]["display"] = "block";
                arrCss[""][objTile.tileID]["position"] = "absolute";
                arrCss[""][objTile.tileID]["padding"] = objTile.tileSize[0] / objGridParams.gridSize * 50 + "% " + objTile.tileSize[1] / objGridParams.gridSize * 50 + "%";
                arrCss[""][objTile.tileID]["margin"] = objTile.tilePosition[1] / objGridParams.gridSize * 100 + "% 0 0 " + objTile.tilePosition[0] / objGridParams.gridSize * 100 + "%";
                /**
                 * Create tile wrap DOM
                 */
                var domTileWrap = document.createElement("div");
                domTileWrap.id = this.getUUID();
                objTile.tileWrapID = domTileWrap.id;
                domTile.appendChild(domTileWrap);
                /**
                 * Write tile wrap style
                 */
                arrCss[""][domTileWrap.id] = {};
                arrCss[""][domTileWrap.id]["padding"] = objTile.tileMargin * 0.5 + "px";
                arrCss[""][domTileWrap.id]["left"] = "0";
                arrCss[""][domTileWrap.id]["top"] = "0";
                arrCss[""][domTileWrap.id]["width"] = "100%";
                arrCss[""][domTileWrap.id]["height"] = "100%";
                arrCss[""][domTileWrap.id]["box-sizing"] = "border-box";
                arrCss[""][domTileWrap.id]["display"] = "block";
                arrCss[""][domTileWrap.id]["position"] = "absolute";
                /**
                 * Create tile content DOM
                 */
                var domTileContent = document.createElement("div");
                domTileContent.id = this.getUUID();
                objTile.tileContentID = domTileWrap.id;
                domTileWrap.appendChild(domTileContent);
                /**
                 * Write tile content style
                 */
                arrCss[""][domTileContent.id] = {};
                arrCss[""][domTileContent.id]["z-index"] = "1";
                arrCss[""][domTileContent.id]["width"] = "100%";
                arrCss[""][domTileContent.id]["height"] = "100%";
                arrCss[""][domTileContent.id]["box-sizing"] = "border-box";
                arrCss[""][domTileContent.id]["overflow"] = "hidden";
                /**
                 * Add tile content
                 */
                this.insertContent(domTileContent, objTile.tileContent, arrCss);
            }
            /**
             * Create fix clean DOM
             */
            var domFix = document.createElement("div");
            domFix.id = this.getUUID();
            domGrid.appendChild(domFix);
            /**
             * Write fix style
             */
            arrCss[""][domFix.id] = {};
            arrCss[""][domFix.id]["position"] = "relative";
            arrCss[""][domFix.id]["width"] = "0";
            arrCss[""][domFix.id]["height"] = "0";
            arrCss[""][domFix.id]["padding"] = (grid.length - 1) / objGridParams.gridSize[0] * 100 + "% 0 0 0;";
            arrCss[""][domFix.id]["z-index"] = "0";
            /**
             * Write adaptive styles
             */
            for (var strMediaName in objGridParams.adaptiveMedia) {
                var strMediaRange = objGridParams.adaptiveMedia[strMediaName];
                var grid_1 = [];
                arrCss[strMediaRange] = {};
                for (var _b = 0, arrTiles_2 = arrTiles; _b < arrTiles_2.length; _b++) {
                    var objTile = arrTiles_2[_b];
                    arrCss[strMediaRange][objTile.tileID] = {};
                    arrCss[strMediaRange][objTile.tileID]["padding"] = objTile.tileAdaptiveSize[strMediaName][0] / objGridParams.gridAdaptiveSize[strMediaName] * 50 + "% " + objTile.tileAdaptiveSize[strMediaName][1] / objGridParams.gridAdaptiveSize[strMediaName] * 50 + "%";
                    arrCss[strMediaRange][objTile.tileID]["margin"] = objTile.tileAdaptivePosition[strMediaName][1] / objGridParams.gridAdaptiveSize[strMediaName] * 100 + "% 0 0 " + objTile.tileAdaptivePosition[strMediaName][0] / objGridParams.gridAdaptiveSize[strMediaName] * 100 + "%";
                    arrCss[strMediaRange][objTile.tileWrapID] = {};
                    arrCss[strMediaRange][objTile.tileWrapID]["padding"] = objTile.tileAdaptiveMargin[strMediaName] * 0.5 + "px";
                    arrCss[strMediaRange][objTile.tileContentID] = {};
                    arrCss[strMediaRange][objTile.tileContentID]["padding"] = objTile.tileAdaptivePadding[strMediaName] + "px";
                }
                arrCss[strMediaRange][domFix.id] = {};
                arrCss[strMediaRange][domFix.id]["position"] = "relative";
                arrCss[strMediaRange][domFix.id]["width"] = "0";
                arrCss[strMediaRange][domFix.id]["height"] = "0";
                arrCss[strMediaRange][domFix.id]["padding"] = (adaptiveGrid[strMediaName].length - 1) / objGridParams.gridAdaptiveSize[strMediaName] * 100 + "% 0 0 0";
                arrCss[strMediaRange][domFix.id]["z-index"] = "0";
            }
            /**
             * Create style DOM
             * @type {HTMLStyleElement|HTMLElement}
             */
            var domStyle = document.createElement("style");
            domStyle.innerHTML = this.convertCss(arrCss);
            domGrid.appendChild(domStyle);
            /**
             * Add grid in DOM
             */
            domParentNode.appendChild(domGrid);
        }
    }
    /**
     * Convert css object to css
     * @param arrCss
     * @returns {string}
     */
    CSTiles.prototype.convertCss = function (arrCss) {
        var strCss = "";
        for (var strMedia in arrCss) {
            if (strMedia) {
                var strMediaRange = strMedia.split("-");
                strMediaRange[0] = strMediaRange[0] ? "and (min-width: " + strMediaRange[0] + "px)" : "";
                strMediaRange[1] = strMediaRange[1] ? "and (max-width: " + strMediaRange[1] + "px)" : "";
                strCss += "@media screen " + strMediaRange[0] + " " + strMediaRange[1] + " {";
            }
            if (arrCss[strMedia]) {
                for (var strBlockID in arrCss[strMedia]) {
                    strCss += "#" + strBlockID + " {";
                    for (var strCssProperty in arrCss[strMedia][strBlockID]) {
                        strCss += strCssProperty + ": " + arrCss[strMedia][strBlockID][strCssProperty] + ";";
                    }
                    strCss += "}";
                }
            }
            if (strMedia) {
                strCss += "}";
            }
        }
        return strCss;
    };
    /**
     * Insert tile content
     * @param domParentNode
     * @param objContent
     * @param arrCss
     */
    CSTiles.prototype.insertContent = function (domParentNode, objContent, arrCss) {
        switch (objContent.type) {
            case "none":
                break;
            case "image":
                this.insertContentImage(domParentNode, objContent, arrCss);
                break;
            case "video":
                this.insertContentVideo(domParentNode, objContent, arrCss);
                break;
            case "audio":
                this.insertContentAudio(domParentNode, objContent, arrCss);
                break;
            case "iframe":
                this.insertContentiFrame(domParentNode, objContent, arrCss);
                break;
            case "tiles":
                this.insertContentTiles(domParentNode, objContent, arrCss);
                break;
            case "html":
                this.insertContentHtml(domParentNode, objContent, arrCss);
                break;
            case "dom":
                this.insertContentDom(domParentNode, objContent, arrCss);
                break;
            default:
                console.log(objContent.type);
        }
    };
    /**
     * Insert tile dom content
     * @param domParentNode
     * @param objContent
     * @param arrCss
     */
    CSTiles.prototype.insertContentDom = function (domParentNode, objContent, arrCss) {
        if (objContent.query) {
            var dom = document.querySelector(objContent.query);
            if (dom) {
                domParentNode.appendChild(dom);
            }
        }
        if (objContent.poster) {
            arrCss[""][domParentNode.id]["background-image"] = "url(\"" + objContent.poster + "\")";
            arrCss[""][domParentNode.id]["background-position"] = "center center";
            arrCss[""][domParentNode.id]["background-repeat"] = "no-repeat";
            arrCss[""][domParentNode.id]["background-size"] = "cover";
        }
    };
    /**
     * Insert tile html content
     * @param domParentNode
     * @param objContent
     * @param arrCss
     */
    CSTiles.prototype.insertContentHtml = function (domParentNode, objContent, arrCss) {
        if (objContent.html) {
            domParentNode.innerHTML = objContent.html;
        }
        if (objContent.poster) {
            arrCss[""][domParentNode.id]["background-image"] = "url(\"" + objContent.poster + "\")";
            arrCss[""][domParentNode.id]["background-position"] = "center center";
            arrCss[""][domParentNode.id]["background-repeat"] = "no-repeat";
            arrCss[""][domParentNode.id]["background-size"] = "cover";
        }
    };
    /**
     * Insert tile tiles content
     * @param domParentNode
     * @param objContent
     * @param arrCss
     */
    CSTiles.prototype.insertContentTiles = function (domParentNode, objContent, arrCss) {
        if (objContent.params &&
            objContent.params.grid &&
            objContent.params.tiles) {
            new CSTiles(domParentNode, objContent.params.grid, objContent.params.tiles);
        }
    };
    /**
     * Insert tile iframe content
     * @param domParentNode
     * @param objContent
     * @param arrCss
     */
    CSTiles.prototype.insertContentiFrame = function (domParentNode, objContent, arrCss) {
        if (objContent.src) {
            var domTileiFrame = document.createElement("iframe");
            domTileiFrame.src = objContent.src;
            domTileiFrame.width = "100%";
            domTileiFrame.height = "100%";
            domTileiFrame.frameBorder = "no";
            domParentNode.appendChild(domTileiFrame);
        }
    };
    /**
     * Insert tile audio content
     * @param domParentNode
     * @param objContent
     * @param arrCss
     */
    CSTiles.prototype.insertContentAudio = function (domParentNode, objContent, arrCss) {
        var domTileVideo = document.createElement("audio");
        domTileVideo.id = this.getUUID();
        domTileVideo.controls = true;
        domTileVideo.preload = 'auto';
        if (objContent.src) {
            for (var _i = 0, _a = objContent.src; _i < _a.length; _i++) {
                var strVideo = _a[_i];
                var domTileSource = document.createElement("source");
                domTileSource.src = strVideo;
                if (strVideo.indexOf(".ogv") != -1) {
                    domTileSource.type = 'audio/ogg; codecs=vorbis';
                }
                else if (strVideo.indexOf(".mp3") != -1) {
                    domTileSource.type = 'audio/mpeg';
                }
                domTileVideo.appendChild(domTileSource);
            }
            for (var _b = 0, _c = objContent.src; _b < _c.length; _b++) {
                var strVideo = _c[_b];
                var domTileA = document.createElement("a");
                domTileA.href = strVideo;
                strVideo = strVideo.split(".");
                domTileA.text = "Скачайте аудио ." + (strVideo[strVideo.length - 1]);
                domTileVideo.appendChild(domTileA);
            }
        }
        domParentNode.appendChild(domTileVideo);
        arrCss[""] = arrCss[""] || {};
        arrCss[""][domTileVideo.id] = arrCss[""][domTileVideo.id] || {};
        arrCss[""][domTileVideo.id]["width"] = "100%";
        arrCss[""][domTileVideo.id]["height"] = "100%";
        if (objContent.poster) {
            arrCss[""][domParentNode.id]["background-image"] = "url(\"" + objContent.poster + "\")";
            arrCss[""][domParentNode.id]["background-position"] = "center center";
            arrCss[""][domParentNode.id]["background-repeat"] = "no-repeat";
            arrCss[""][domParentNode.id]["background-size"] = "cover";
        }
    };
    /**
     * Insert tile video content
     * @param domParentNode
     * @param objContent
     * @param arrCss
     */
    CSTiles.prototype.insertContentVideo = function (domParentNode, objContent, arrCss) {
        var domTileVideo = document.createElement("video");
        domTileVideo.id = this.getUUID();
        domTileVideo.controls = true;
        domTileVideo.preload = 'auto';
        domTileVideo.poster = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyppVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5N0Q5REIwMzczMjUxMUU2OTkxQkQ2MDg4MENCNDAxMSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5N0Q5REIwNDczMjUxMUU2OTkxQkQ2MDg4MENCNDAxMSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjk3RDlEQjAxNzMyNTExRTY5OTFCRDYwODgwQ0I0MDExIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjk3RDlEQjAyNzMyNTExRTY5OTFCRDYwODgwQ0I0MDExIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+JfZwGwAAABBJREFUeNpi+P//PwNAgAEACPwC/tuiTRYAAAAASUVORK5CYII=";
        if (objContent.src) {
            for (var _i = 0, _a = objContent.src; _i < _a.length; _i++) {
                var strVideo = _a[_i];
                var domTileSource = document.createElement("source");
                domTileSource.src = strVideo;
                if (strVideo.indexOf(".ogv") != -1) {
                    domTileSource.type = 'video/ogg; codecs="theora, vorbis"';
                }
                else if (strVideo.indexOf(".mp4") != -1) {
                    domTileSource.type = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';
                }
                else if (strVideo.indexOf(".webm") != -1) {
                    domTileSource.type = 'video/webm; codecs="vp8, vorbis"';
                }
                domTileVideo.appendChild(domTileSource);
            }
            for (var _b = 0, _c = objContent.src; _b < _c.length; _b++) {
                var strVideo = _c[_b];
                var domTileA = document.createElement("a");
                domTileA.href = strVideo;
                strVideo = strVideo.split(".");
                domTileA.text = "Скачайте видео ." + (strVideo[strVideo.length - 1]);
                domTileVideo.appendChild(domTileA);
            }
        }
        domParentNode.appendChild(domTileVideo);
        arrCss[""] = arrCss[""] || {};
        arrCss[""][domTileVideo.id] = arrCss[""][domTileVideo.id] || {};
        arrCss[""][domTileVideo.id]["width"] = "100%";
        arrCss[""][domTileVideo.id]["height"] = "100%";
        if (objContent.poster) {
            arrCss[""][domParentNode.id]["background-image"] = "url(\"" + objContent.poster + "\")";
            arrCss[""][domParentNode.id]["background-position"] = "center center";
            arrCss[""][domParentNode.id]["background-repeat"] = "no-repeat";
            arrCss[""][domParentNode.id]["background-size"] = "cover";
        }
    };
    /**
     * Insert tile image content
     * @param domParentNode
     * @param objContent
     * @param arrCss
     */
    CSTiles.prototype.insertContentImage = function (domParentNode, objContent, arrCss) {
        if (objContent.src) {
            arrCss[""] = arrCss[""] || {};
            arrCss[""][domParentNode.id] = arrCss[""][domParentNode.id] || {};
            arrCss[""][domParentNode.id]["background-image"] = "url(\"" + objContent.src + "\")";
            arrCss[""][domParentNode.id]["background-position"] = "center center";
            arrCss[""][domParentNode.id]["background-repeat"] = "no-repeat";
            arrCss[""][domParentNode.id]["background-size"] = "cover";
        }
    };
    /**
     * Get unique ID
     * @returns {string}
     */
    CSTiles.prototype.getUUID = function () {
        var s = "";
        do {
            s += Math.round(Math.random() * 1e6).toString(36);
        } while (s.length < 32);
        return "x" + s.substr(1, 7) + "-" + s.substr(8, 4) + "-" + s.substr(12, 4) + "-" + s.substr(16, 4) + "-" + s.substr(20, 12);
    };
    /**
     * Assign default grid params
     * @param objGridParams
     * @returns {Object}
     */
    CSTiles.prototype.assignDefaultGridParams = function (objGridParams) {
        /**
         * Field empty grid parameters from default settings
         */
        objGridParams = this.assignEmpty(objGridParams, new GridParamsClass(), GridParamsClass);
        objGridParams.gridID = this.getUUID();
        /**
         * Field empty grid adaptive settings from base settings
         */
        objGridParams = this.assignAdaptives(objGridParams, objGridParams.adaptiveMedia, ["gridSize", "tileMargin", "tilePadding"], ["gridAdaptiveSize", "tileAdaptiveMargin", "tileAdaptivePadding"]);
        return objGridParams;
    };
    /**
     * Assign default tile params
     * @param objGridParams
     * @param arrTiles
     * @returns any
     */
    CSTiles.prototype.assignDefaultTileParams = function (objGridParams, arrTiles) {
        /**
         * The enumeration of all tiles
         */
        var grid = [];
        for (var objTileID in arrTiles) {
            /**
             * Get params from default grid
             */
            arrTiles[objTileID].tileMargin = arrTiles[objTileID].tileMargin || objGridParams.tileMargin;
            arrTiles[objTileID].tilePadding = arrTiles[objTileID].tilePadding || objGridParams.tilePadding;
            arrTiles[objTileID].tileContent = arrTiles[objTileID].tileContent || objGridParams.tileContent;
            /**
             * Field empty tile parameters from default settings
             */
            arrTiles[objTileID] = this.assignEmpty(arrTiles[objTileID], new TileParamsClass(), TileParamsClass);
            arrTiles[objTileID].tileID = this.getUUID();
            /**
             * Get tile parameters from grid? if it is empty
             * @type {any}
             */
            arrTiles[objTileID] = this.assignEmpty(arrTiles[objTileID], objGridParams, TileParamsClass);
            /**
             * Field empty tile adaptive settings from base settings
             */
            arrTiles[objTileID] = this.assignAdaptives(arrTiles[objTileID], objGridParams.adaptiveMedia, ["tileSize", "tilePosition", "tileMargin", "tilePadding"], ["tileAdaptiveSize", "tileAdaptivePosition", "tileAdaptiveMargin", "tileAdaptivePadding"]);
            /**
             * Set grid position
             */
            var r = this.findPosition(grid, objGridParams.gridSize, arrTiles[objTileID].tileSize, arrTiles[objTileID].tilePosition);
            grid = r.grid;
            arrTiles[objTileID].tilePosition = [r.x, r.y];
        }
        /**
         * Set adaptive position
         */
        var adaptiveGrid = {};
        for (var strMediaName in objGridParams.adaptiveMedia) {
            adaptiveGrid[strMediaName] = [];
            for (var objTileID in arrTiles) {
                var r = this.findPosition(adaptiveGrid[strMediaName], objGridParams.gridAdaptiveSize[strMediaName], arrTiles[objTileID].tileAdaptiveSize[strMediaName], arrTiles[objTileID].tileAdaptivePosition[strMediaName]);
                adaptiveGrid[strMediaName] = r.grid;
                arrTiles[objTileID].tileAdaptivePosition[strMediaName] = [r.x, r.y];
            }
        }
        return {
            _arrTiles: arrTiles,
            grid: grid,
            adaptiveGrid: adaptiveGrid
        };
    };
    /**
     * Find free position for tile
     * @param grid
     * @param gridSize
     * @param tileSize
     * @param tilePosition
     * @returns {any}
     */
    CSTiles.prototype.findPosition = function (grid, gridSize, tileSize, tilePosition) {
        if (tilePosition &&
            tilePosition.length == 2) {
            var x = void 0, y = void 0, z = void 0, i = void 0, j = void 0;
            x = tilePosition[0];
            y = tilePosition[1];
            do {
                grid = this.addLineToGrid(grid, gridSize);
            } while (grid.length < y + tileSize[1]);
            for (i = y; i < y + tileSize[1]; i++) {
                for (j = x; j < x + tileSize[0]; j++) {
                    grid[i][j] = true;
                }
            }
            return {
                x: x,
                y: y,
                grid: grid
            };
        }
        else {
            var x = void 0, y = void 0, z = void 0, i = void 0, j = void 0;
            var isFunded = false;
            z = 0;
            do {
                isFunded = false;
                if ((grid.length - tileSize[1]) > 0) {
                    for (y = 0; y <= grid.length - tileSize[1]; y++) {
                        for (x = 0; x <= grid[y].length - tileSize[0]; x++) {
                            var ifGap = true;
                            for (i = y; i < y + tileSize[1]; i++) {
                                for (j = x; j < x + tileSize[0]; j++) {
                                    if (grid[i][j]) {
                                        ifGap = false;
                                        break;
                                    }
                                }
                                if (!ifGap) {
                                    break;
                                }
                            }
                            if (ifGap) {
                                isFunded = true;
                                break;
                            }
                        }
                        if (isFunded) {
                            break;
                        }
                    }
                }
                if (!isFunded) {
                    grid = this.addLineToGrid(grid, gridSize);
                }
                z++;
            } while (!isFunded && z < 10);
            if (isFunded) {
                for (i = y; i < y + tileSize[1]; i++) {
                    for (j = x; j < x + tileSize[0]; j++) {
                        grid[i][j] = true;
                    }
                }
                return {
                    x: x,
                    y: y,
                    grid: grid
                };
            }
            else {
                return false;
            }
        }
    };
    /**
     * Add another line to grid
     * @param grid
     * @param gridSize
     * @returns {Array<Array<boolean>>}
     */
    CSTiles.prototype.addLineToGrid = function (grid, gridSize) {
        grid.push([]);
        for (var i = 0; i < gridSize; i++) {
            grid[grid.length - 1][i] = false;
        }
        return grid;
    };
    /**
     * Assign adaptive settings
     * @param objObject
     * @param arrAdaptiveMedia
     * @param strPropertyFrom
     * @param strPropertyTo
     * @returns {Object}
     */
    CSTiles.prototype.assignAdaptives = function (objObject, arrAdaptiveMedia, strPropertyFrom, strPropertyTo) {
        for (var i in strPropertyFrom) {
            objObject = this.assignAdaptive(objObject, arrAdaptiveMedia, strPropertyFrom[i], strPropertyTo[i]);
        }
        return objObject;
    };
    /**
     * Assign adaptive settings
     * @param objObject
     * @param arrAdaptiveMedia
     * @param strPropertyFrom
     * @param strPropertyTo
     * @returns {Object}
     */
    CSTiles.prototype.assignAdaptive = function (objObject, arrAdaptiveMedia, strPropertyFrom, strPropertyTo) {
        objObject = objObject || {};
        for (var i in arrAdaptiveMedia) {
            objObject[strPropertyTo] = objObject[strPropertyTo] || {};
            if (this.isEmpty(objObject[strPropertyTo][i]) && !this.isEmpty(objObject[strPropertyFrom])) {
                objObject[strPropertyTo][i] = objObject[strPropertyFrom];
            }
        }
        return objObject;
    };
    /**
     * Assign empty parameters with default
     * @param objFirstObject
     * @param objSecondObject
     * @param claObjectClass
     * @returns {Object}
     */
    CSTiles.prototype.assignEmpty = function (objFirstObject, objSecondObject, claObjectClass) {
        objFirstObject = objFirstObject || {};
        var objInterface = this.getInterface(new claObjectClass());
        for (var key in objInterface) {
            if (this.isEmpty(objFirstObject[key]) && !this.isEmpty(objSecondObject[key]) &&
                typeof objSecondObject[key] == objInterface[key]) {
                objFirstObject[key] = objSecondObject[key];
            }
        }
        return objFirstObject;
    };
    /**
     * Get class interface
     * @param objObject
     * @returns {{}}
     */
    CSTiles.prototype.getInterface = function (objObject) {
        var objInterface = {};
        for (var i in objObject) {
            objInterface[i] = typeof (objObject[i]);
        }
        return objInterface;
    };
    /**
     * Check if variable is empty
     * @param variable
     * @returns {boolean}
     */
    CSTiles.prototype.isEmpty = function (variable) {
        if (Array.isArray(variable)) {
            return variable.length == 0;
        }
        else if (typeof variable == "object") {
            return Object.keys(variable).length == 0;
        }
        else if (typeof variable == "string") {
            return false;
        }
        else {
            return typeof variable == "undefined";
        }
    };
    /**
     * Get object dump
     * @param objObject
     * @returns {string}
     */
    CSTiles.prototype.getObjectToDump = function (objObject) {
        var strDump = "";
        for (var i in objObject) {
            strDump += "\t" + i + ":" + objObject[i] + "\r\n";
        }
        return strDump;
    };
    /**
     * Check is instance of
     * @param objFirstObject
     * @param objSecondObject
     * @returns {boolean}
     */
    CSTiles.prototype.isInstanceOf = function (objFirstObject, objSecondObject) {
        if (!(typeof objFirstObject == "object" &&
            objFirstObject &&
            typeof objSecondObject == "object" &&
            objSecondObject)) {
            return false;
        }
        for (var i in objFirstObject) {
            if (!objSecondObject.hasOwnProperty(i)) {
                return false;
            }
        }
        for (var i in objSecondObject) {
            if (!objFirstObject.hasOwnProperty(i)) {
                return false;
            }
        }
        return true;
    };
    /**
     * Check input parameters for correctness
     * @param domParentNode
     * @param objGridParams
     * @param arrTiles
     * @returns {boolean}
     */
    CSTiles.prototype.checkInnerParamsForErrors = function (domParentNode, objGridParams, arrTiles) {
        var isError = false;
        if (!isError && !(typeof domParentNode == "object" &&
            domParentNode instanceof HTMLElement &&
            typeof domParentNode.parentNode == "object" &&
            domParentNode.parentNode instanceof HTMLElement)) {
            console.warn("The first parameter should be a DOM element.");
            isError = true;
        }
        if (!isError && !(typeof domParentNode.parentNode == "object" &&
            domParentNode.parentNode instanceof HTMLElement)) {
            console.warn("The first parameter must be an existing DOM element.");
            isError = true;
        }
        if (!isError && !(typeof objGridParams == "object")) {
            console.warn("The second parameter must be an object.");
            isError = true;
        }
        if (!isError && !(this.isInstanceOf(objGridParams, new GridParamsClass()))) {
            console.warn("The object with the parameters of the tile needs to implement the interface:" + "\r\n" + this.getObjectToDump(this.getInterface(new GridParamsClass())));
            isError = true;
        }
        if (!isError && !(Array.isArray(arrTiles))) {
            console.warn("The third parameter must be an array with the tiles.");
            isError = true;
        }
        if (!isError && !(arrTiles.length > 0)) {
            console.warn("An array of tiles must contain at least one element.");
            isError = true;
        }
        for (var objTileID in arrTiles) {
            if (!isError && !(this.isInstanceOf(arrTiles[objTileID], new TileParamsClass()))) {
                console.warn("Tile number " + objTileID + " must implement the interface:" + "\r\n" + this.getObjectToDump(this.getInterface(new TileParamsClass())));
                isError = true;
            }
        }
        return isError;
    };
    return CSTiles;
}());
exports.__esModule = true;
exports["default"] = CSTiles;
/**
 * Export CSTiles to global
 */
window["CSTiles"] = CSTiles;
//# sourceMappingURL=CSTiles.js.map