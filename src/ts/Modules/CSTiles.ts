"use strict";
/**
 * Import interfaces
 */
import IWindow from "../Interfaces/IWindow";

/**
 * Import classes
 */
import CGridParams from "../Classes/CGridParams";
import CTileParams from "../Classes/CTileParams";

declare let window: IWindow;
declare let require: any;

/**
 * CSTiles class
 */
export default class CSTiles {
    /**
     * Convert css object to css
     * @param arrCss
     * @returns {string}
     */
    public static convertCss(arrCss: Object) {
        for (let strMedia in arrCss) {
            if (arrCss.hasOwnProperty(strMedia)) {
                for (let strBlockID in arrCss[strMedia]) {
                    if (arrCss[strMedia].hasOwnProperty(strBlockID)) {
                        for (let strCssProperty in arrCss[strMedia][strBlockID]) {
                            if (arrCss[strMedia][strBlockID].hasOwnProperty(strCssProperty)) {
                                arrCss[strMedia][strBlockID][strCssProperty] = CSTiles.optimizeCssProperty(strCssProperty, arrCss[strMedia][strBlockID][strCssProperty]);
                            }
                        }
                        arrCss[strMedia][strBlockID] = CSTiles.compiledCssProperties(arrCss[strMedia][strBlockID]);
                    }
                }
            }
        }
        let strCss = "";
        for (let strMedia in arrCss) {
            if (arrCss.hasOwnProperty(strMedia)) {
                if (strMedia) {
                    let strMediaRange = strMedia.split("-");
                    strMediaRange[0] = strMediaRange[0] ? `and (min-width: ${strMediaRange[0]}px)` : ``;
                    strMediaRange[1] = strMediaRange[1] ? `and (max-width: ${strMediaRange[1]}px)` : ``;
                    strCss += `@media screen ${strMediaRange[0]} ${strMediaRange[1]} {`;
                }
                if (arrCss[strMedia]) {
                    for (let strBlockID in arrCss[strMedia]) {
                        if (arrCss[strMedia].hasOwnProperty(strBlockID)) {
                            strCss += `#${strBlockID} {`;
                            for (let strCssProperty in arrCss[strMedia][strBlockID]) {
                                if (arrCss[strMedia][strBlockID].hasOwnProperty(strCssProperty)) {
                                    strCss += `${strCssProperty}: ${arrCss[strMedia][strBlockID][strCssProperty]} !important;`;
                                }
                            }
                            strCss += `}`;
                        }
                    }
                }
                if (strMedia) {
                    strCss += `}`;
                }
            }
        }
        return strCss;
    }

    /**
     * Optimize css property
     * @param strCssPropertyName
     * @param strCssPropertyValue
     * @returns {string}
     */
    public static optimizeCssProperty(strCssPropertyName, strCssPropertyValue): string {
        strCssPropertyValue = (" " + strCssPropertyValue + " ")
            .replace(/\s0%/ig, " 0")
            .replace(/[\r\n\t]/ig, " ")
            .replace(/\s+/ig, " ")
            .replace(/^\s/ig, "")
            .replace(/\s$/ig, "");
        if (
            strCssPropertyName === "padding" ||
            strCssPropertyName === "margin") {
            strCssPropertyValue = strCssPropertyValue.split(" ");
            if (strCssPropertyValue.length === 2) {
                if (strCssPropertyValue[0] === strCssPropertyValue[1]) {
                    strCssPropertyValue = [strCssPropertyValue[0]];
                }
            } else if (strCssPropertyValue.length === 3) {
                if (
                    strCssPropertyValue[0] === strCssPropertyValue[2] &&
                    strCssPropertyValue[0] === strCssPropertyValue[2]
                ) {
                    strCssPropertyValue = [strCssPropertyValue[0]];
                } else if (
                    strCssPropertyValue[0] === strCssPropertyValue[2]
                ) {
                    strCssPropertyValue = [strCssPropertyValue[0]];
                }
            } else if (strCssPropertyValue.length === 4) {
                if (
                    strCssPropertyValue[0] === strCssPropertyValue[1] &&
                    strCssPropertyValue[1] === strCssPropertyValue[2] &&
                    strCssPropertyValue[2] === strCssPropertyValue[3]
                ) {
                    strCssPropertyValue = [strCssPropertyValue[0]];
                } else if (
                    strCssPropertyValue[0] === strCssPropertyValue[2] &&
                    strCssPropertyValue[1] === strCssPropertyValue[3]
                ) {
                    strCssPropertyValue = [strCssPropertyValue[0], strCssPropertyValue[1]];
                } else if (
                    strCssPropertyValue[1] === strCssPropertyValue[3]
                ) {
                    strCssPropertyValue = [strCssPropertyValue[0], strCssPropertyValue[1], strCssPropertyValue[2]];
                }
            }
            strCssPropertyValue = strCssPropertyValue.join(" ");
        }
        return strCssPropertyValue;
    }

    /**
     * Compiled complex css properties
     * @param objCssProperties
     * @returns {Object}
     */
    public static compiledCssProperties(objCssProperties: Object): Object {
        let objCompiledRules = {
            background: [
                "background-image",
                "background-position/background-size",
                "background-repeat",
                "background-attachment",
                "background-origin",
                "background-clip",
                "background-color",
            ],
            "border-top": [
                "border-top-width",
                "border-top-style",
                "border-top-color",
            ],
            "border-right": [
                "border-right-width",
                "border-right-style",
                "border-right-color",
            ],
            "border-bottom": [
                "border-bottom-width",
                "border-bottom-style",
                "border-bottom-color",
            ],
            "border-left": [
                "border-right-width",
                "border-right-style",
                "border-right-color",
            ],
            border: [
                "border-width",
                "border-style",
                "border-color",
            ],
            font: [
                "font-style",
                "font-variant",
                "font-weight",
                "font-size",
                "line-height",
                "font-family",
            ],
            "list-style": [
                "list-style-type",
                "list-style-position",
                "list-style-image",
            ],
            margin: [
                "margin-top",
                "margin-right",
                "margin-bottom",
                "margin-left",
            ],
            padding: [
                "padding-top",
                "padding-right",
                "padding-bottom",
                "padding-left",
            ],
            outline: [
                "outline-color",
                "outline-style",
                "outline-width",
            ],
        };
        for (let strCompiledRule in objCompiledRules) {
            if (
                objCssProperties.hasOwnProperty(strCompiledRule) && !objCssProperties[strCompiledRule]
            ) {
                objCssProperties[strCompiledRule] = [];
                for (let strRule in objCompiledRules[strCompiledRule]) {
                    if (objCompiledRules[strCompiledRule].hasOwnProperty(strRule)) {
                        let arrRules = objCompiledRules[strCompiledRule][strRule].split("/");
                        let arrCompiledRules = [];
                        for (let _strRule of arrRules) {
                            if (objCssProperties[_strRule]) {
                                arrCompiledRules.push(objCssProperties[_strRule]);
                                delete objCssProperties[_strRule];
                            }
                        }
                        let strCompiledRules = arrCompiledRules.join("/");
                        if (strCompiledRules) {
                            objCssProperties[strCompiledRule].push(strCompiledRules);
                        }
                    }
                }
                if (objCssProperties[strCompiledRule].length > 0) {
                    objCssProperties[strCompiledRule] = objCssProperties[strCompiledRule].join(" ");
                } else {
                    delete objCssProperties[strCompiledRule];
                }
            }
        }
        return objCssProperties;
    }

    /**
     * Insert tile content
     * @param domParentNode
     * @param objContent
     * @param arrCss
     */
    public static insertContent(domParentNode: HTMLElement,
                                objContent: any,
                                arrCss: Object) {
        switch (objContent.type) {
            case "none":
                break;
            case "image":
                CSTiles.insertContentImage(domParentNode, objContent, arrCss);
                break;
            case "video":
                CSTiles.insertContentVideo(domParentNode, objContent, arrCss);
                break;
            case "audio":
                CSTiles.insertContentAudio(domParentNode, objContent, arrCss);
                break;
            case "iframe":
                CSTiles.insertContentiFrame(domParentNode, objContent);
                break;
            case "tiles":
                CSTiles.insertContentTiles(domParentNode, objContent);
                break;
            case "html":
                CSTiles.insertContentHtml(domParentNode, objContent, arrCss);
                break;
            case "dom":
                CSTiles.insertContentDom(domParentNode, objContent, arrCss);
                break;
            default:
                console.log(objContent.type);
        }
    }

    /**
     * Insert tile dom content
     * @param domParentNode
     * @param objContent
     * @param arrCss
     */
    public static insertContentDom(domParentNode: HTMLElement,
                                   objContent: {
                                       query: string,
                                       poster: string,
                                   },
                                   arrCss: Object) {
        if (objContent.query) {
            let dom = document.querySelector(objContent.query);
            if (dom) {
                domParentNode.appendChild(dom);
            }
        }
        if (objContent.poster) {
            arrCss[""][domParentNode.id]["background-image"] = `url("${objContent.poster}")`;
            arrCss[""][domParentNode.id]["background-position"] = `center center`;
            arrCss[""][domParentNode.id]["background-repeat"] = `no-repeat`;
            arrCss[""][domParentNode.id]["background-size"] = `cover`;
        }
    }

    /**
     * Insert tile html content
     * @param domParentNode
     * @param objContent
     * @param arrCss
     */
    public static insertContentHtml(domParentNode: HTMLElement,
                                    objContent: {
                                        html: string,
                                        poster: string,
                                    },
                                    arrCss: Object) {
        if (objContent.html) {
            domParentNode.innerHTML = objContent.html;
        }
        if (objContent.poster) {
            arrCss[""][domParentNode.id]["background-image"] = `url("${objContent.poster}")`;
            arrCss[""][domParentNode.id]["background-position"] = `center center`;
            arrCss[""][domParentNode.id]["background-repeat"] = `no-repeat`;
            arrCss[""][domParentNode.id]["background-size"] = `cover`;
        }
    }

    /**
     * Insert tile tiles content
     * @param domParentNode
     * @param objContent
     */
    public static insertContentTiles(domParentNode: HTMLElement,
                                     objContent: {
                                         params: {
                                             grid: CGridParams,
                                             tiles: Array<CTileParams>,
                                         }
                                     }) {
        let tile = null;
        if (
            objContent.params &&
            objContent.params.grid &&
            objContent.params.tiles
        ) {
            tile = new CSTiles(domParentNode, objContent.params.grid, objContent.params.tiles);
        }
        return !!tile;
    }

    /**
     * Insert tile iframe content
     * @param domParentNode
     * @param objContent
     */
    public static insertContentiFrame(domParentNode: HTMLElement,
                                      objContent: any) {
        if (objContent.src) {
            let domTileiFrame = document.createElement("iframe");
            domTileiFrame.src = objContent.src;
            domTileiFrame.width = "100%";
            domTileiFrame.height = "100%";
            domTileiFrame.frameBorder = "no";
            domParentNode.appendChild(domTileiFrame);
        }
    }

    /**
     * Insert tile audio content
     * @param domParentNode
     * @param objContent
     * @param arrCss
     */
    public static insertContentAudio(domParentNode: HTMLElement,
                                     objContent: any,
                                     arrCss: Object) {
        let domTileVideo = document.createElement("audio");
        domTileVideo.id = CSTiles.getUUID();
        domTileVideo.controls = true;
        domTileVideo.preload = "auto";
        if (objContent.src) {
            for (let strVideo of objContent.src) {
                let domTileSource = document.createElement("source");
                domTileSource.src = strVideo;
                if (strVideo.indexOf(".ogv") !== -1) {
                    domTileSource.type = "audio/ogg; codecs=vorbis";
                } else if (strVideo.indexOf(".mp3") !== -1) {
                    domTileSource.type = "audio/mpeg";
                }
                domTileVideo.appendChild(domTileSource);
            }
            for (let strVideo of objContent.src) {
                let domTileA = document.createElement("a");
                domTileA.href = strVideo;
                strVideo = strVideo.split(".");
                domTileA.text = "Скачайте аудио ." + (strVideo[strVideo.length - 1]);
                domTileVideo.appendChild(domTileA);
            }
        }
        domParentNode.appendChild(domTileVideo);
        arrCss[""] = arrCss[""] || {};
        arrCss[""][domTileVideo.id] = arrCss[""][domTileVideo.id] || {};
        arrCss[""][domTileVideo.id].width = "100%";
        arrCss[""][domTileVideo.id].height = "100%";
        if (objContent.poster) {
            arrCss[""][domParentNode.id]["background-image"] = `url("${objContent.poster}")`;
            arrCss[""][domParentNode.id]["background-position"] = `center center`;
            arrCss[""][domParentNode.id]["background-repeat"] = `no-repeat`;
            arrCss[""][domParentNode.id]["background-size"] = `cover`;
        }
    }

    /**
     * Insert tile video content
     * @param domParentNode
     * @param objContent
     * @param arrCss
     */
    public static insertContentVideo(domParentNode: HTMLElement,
                                     objContent: any,
                                     arrCss: Object) {
        let domTileVideo = document.createElement("video");
        domTileVideo.id = CSTiles.getUUID();
        domTileVideo.controls = true;
        domTileVideo.preload = "auto";
        domTileVideo.poster = require("../../images/empty.png");
        if (objContent.src) {
            for (let strVideo of objContent.src) {
                let domTileSource = document.createElement("source");
                domTileSource.src = strVideo;
                if (strVideo.indexOf(".ogv") !== -1) {
                    domTileSource.type = "video/ogg; codecs='theora, vorbis'";
                } else if (strVideo.indexOf(".mp4") !== -1) {
                    domTileSource.type = "video/mp4; codecs='avc1.42E01E, mp4a.40.2'";
                } else if (strVideo.indexOf(".webm") !== -1) {
                    domTileSource.type = "video/webm; codecs='vp8, vorbis'";
                }
                domTileVideo.appendChild(domTileSource);
            }
            for (let strVideo of objContent.src) {
                let domTileA = document.createElement("a");
                domTileA.href = strVideo;
                strVideo = strVideo.split(".");
                domTileA.text = "Скачайте видео ." + (strVideo[strVideo.length - 1]);
                domTileVideo.appendChild(domTileA);
            }
        }
        domParentNode.appendChild(domTileVideo);
        arrCss[""] = arrCss[""] || {};
        arrCss[""][domTileVideo.id] = arrCss[""][domTileVideo.id] || {};
        arrCss[""][domTileVideo.id].width = "100%";
        arrCss[""][domTileVideo.id].height = "100%";
        if (objContent.poster) {
            arrCss[""][domParentNode.id]["background-image"] = `url("${objContent.poster}")`;
            arrCss[""][domParentNode.id]["background-position"] = `center center`;
            arrCss[""][domParentNode.id]["background-repeat"] = `no-repeat`;
            arrCss[""][domParentNode.id]["background-size"] = `cover`;
        }
    }

    /**
     * Insert tile image content
     * @param domParentNode
     * @param objContent
     * @param arrCss
     */
    public static insertContentImage(domParentNode: HTMLElement,
                                     objContent: any,
                                     arrCss: Object) {
        if (objContent.src) {
            arrCss[""] = arrCss[""] || {};
            arrCss[""][domParentNode.id] = arrCss[""][domParentNode.id] || {};
            arrCss[""][domParentNode.id]["background-image"] = `url("${objContent.src}")`;
            arrCss[""][domParentNode.id]["background-position"] = `center center`;
            arrCss[""][domParentNode.id]["background-repeat"] = `no-repeat`;
            arrCss[""][domParentNode.id]["background-size"] = `cover`;
        }
    }

    /**
     * Get unique ID
     * @returns {string}
     */
    public static getUUID() {
        let s = "";
        do {
            s += Math.round(Math.random() * 1e6).toString(36);
        } while (s.length < 32);
        return `x${s.substr(1, 7)}-${s.substr(8, 4)}-${s.substr(12, 4)}-${s.substr(16, 4)}-${s.substr(20, 12)}`;
    }

    /**
     * Assign default grid params
     * @param objGridParams
     * @returns {Object}
     */
    public static assignDefaultGridParams(objGridParams: CGridParams): CGridParams {
        /**
         * Field empty grid parameters from default settings
         */
        objGridParams = CSTiles.assignEmpty(objGridParams, new CGridParams(), CGridParams);
        objGridParams.gridID = CSTiles.getUUID();
        /**
         * Field empty grid adaptive settings from base settings
         */
        objGridParams = CSTiles.assignAdaptives(
            objGridParams,
            objGridParams.adaptiveMedia,
            ["gridSize", "tileMargin", "tilePadding"],
            ["gridAdaptiveSize", "tileAdaptiveMargin", "tileAdaptivePadding"]
        );
        return objGridParams;
    }

    /**
     * Assign default tile params
     * @param objGridParams
     * @param arrTiles
     * @returns any
     */
    public static assignDefaultTileParams(objGridParams: CGridParams, arrTiles: Array<CTileParams>): any {
        /**
         * The enumeration of all tiles
         */
        let grid = [];
        for (let objTileID in arrTiles) {
            if (arrTiles.hasOwnProperty(objTileID)) {
                /**
                 * Get params from default grid
                 */
                arrTiles[objTileID].tileMargin = arrTiles[objTileID].tileMargin || objGridParams.tileMargin;
                arrTiles[objTileID].tilePadding = arrTiles[objTileID].tilePadding || objGridParams.tilePadding;
                arrTiles[objTileID].tileContent = arrTiles[objTileID].tileContent || objGridParams.tileContent;
                /**
                 * Field empty tile parameters from default settings
                 */
                arrTiles[objTileID] = CSTiles.assignEmpty(arrTiles[objTileID], new CTileParams(), CTileParams);
                arrTiles[objTileID].tileID = CSTiles.getUUID();
                /**
                 * Get tile parameters from grid? if it is empty
                 */
                arrTiles[objTileID] = CSTiles.assignEmpty(arrTiles[objTileID], objGridParams, CTileParams);
                /**
                 * Field empty tile adaptive settings from base settings
                 */
                arrTiles[objTileID] = CSTiles.assignAdaptives(
                    arrTiles[objTileID],
                    objGridParams.adaptiveMedia,
                    ["tileSize", "tilePosition", "tileMargin", "tilePadding"],
                    ["tileAdaptiveSize", "tileAdaptivePosition", "tileAdaptiveMargin", "tileAdaptivePadding"]
                );
                /**
                 * Set grid position
                 */
                let r = CSTiles.findPosition(
                    grid,
                    objGridParams.gridSize,
                    arrTiles[objTileID].tileSize,
                    arrTiles[objTileID].tilePosition
                );
                grid = r.grid;
                arrTiles[objTileID].tilePosition = [r.x, r.y];
            }
        }
        /**
         * Set adaptive position
         */
        let adaptiveGrid = {};
        for (let strMediaName in objGridParams.adaptiveMedia) {
            if (objGridParams.adaptiveMedia.hasOwnProperty(strMediaName)) {
                adaptiveGrid[strMediaName] = [];
                for (let objTileID in arrTiles) {
                    if (arrTiles.hasOwnProperty(objTileID)) {
                        let r = CSTiles.findPosition(adaptiveGrid[strMediaName], objGridParams.gridAdaptiveSize[strMediaName], arrTiles[objTileID].tileAdaptiveSize[strMediaName], arrTiles[objTileID].tileAdaptivePosition[strMediaName]);
                        if (r) {
                            adaptiveGrid[strMediaName] = r.grid;
                            arrTiles[objTileID].tileAdaptivePosition[strMediaName] = [r.x, r.y];
                        }
                    }
                }
            }
        }
        return {
            _arrTiles: arrTiles,
            grid,
            adaptiveGrid,
        };
    }

    /**
     * Find free position for tile
     * @param grid
     * @param gridSize
     * @param tileSize
     * @param tilePosition
     * @returns {{x: number, y: number, grid: Array<Array<boolean>>}}
     */
    public static findPosition(grid: Array<Array<boolean>>,
                               gridSize: number,
                               tileSize: Array<number>,
                               tilePosition: Array<number>): {x: number, y: number, grid: Array<Array<boolean>>} {
        let x;
        let y;
        let i;
        let j;
        let z;
        if (
            tilePosition &&
            tilePosition.length === 2
        ) {
            x = tilePosition[0];
            y = tilePosition[1];
            do {
                grid = CSTiles.addLineToGrid(grid, gridSize);
            } while (grid.length < y + tileSize[1]);
            for (i = y; i < y + tileSize[1]; i++) {
                for (j = x; j < x + tileSize[0]; j++) {
                    grid[i][j] = true;
                }
            }
            return {
                x,
                y,
                grid,
            };
        } else {
            let isFunded = false;
            z = 0;
            do {
                isFunded = false;
                if ((grid.length - tileSize[1]) > 0) {
                    for (y = 0; y <= grid.length - tileSize[1]; y++) {
                        for (x = 0; x <= grid[y].length - tileSize[0]; x++) {
                            let ifGap = true;
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
                    grid = CSTiles.addLineToGrid(grid, gridSize);
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
                    x,
                    y,
                    grid,
                };
            } else {
                return null;
            }
        }
    }

    /**
     * Add another line to grid
     * @param grid
     * @param gridSize
     * @returns {Array<Array<boolean>>}
     */
    public static addLineToGrid(grid: Array<Array<boolean>>, gridSize: number): Array<Array<boolean>> {
        grid.push([]);
        for (let i = 0; i < gridSize; i++) {
            grid[grid.length - 1][i] = false;
        }
        return grid;
    }

    /**
     * Assign adaptive settings
     * @param objObject
     * @param arrAdaptiveMedia
     * @param strPropertyFrom
     * @param strPropertyTo
     * @returns {Object}
     */
    public static assignAdaptives(objObject: Object,
                                  arrAdaptiveMedia: Object,
                                  strPropertyFrom: Array<string>,
                                  strPropertyTo: Array<string>): any {
        for (let i in strPropertyFrom) {
            if (strPropertyFrom.hasOwnProperty(i)) {
                objObject = CSTiles.assignAdaptive(objObject, arrAdaptiveMedia, strPropertyFrom[i], strPropertyTo[i]);
            }
        }
        return objObject;
    }

    /**
     * Assign adaptive settings
     * @param objObject
     * @param arrAdaptiveMedia
     * @param strPropertyFrom
     * @param strPropertyTo
     * @returns {Object}
     */
    public static assignAdaptive(objObject: Object,
                                 arrAdaptiveMedia: Object,
                                 strPropertyFrom: string,
                                 strPropertyTo: string): any {
        objObject = objObject || {};
        for (let i in arrAdaptiveMedia) {
            if (arrAdaptiveMedia.hasOwnProperty(i)) {
                objObject[strPropertyTo] = objObject[strPropertyTo] || {};
                if (
                    CSTiles.isEmpty(objObject[strPropertyTo][i]) && !CSTiles.isEmpty(objObject[strPropertyFrom])
                ) {
                    objObject[strPropertyTo][i] = objObject[strPropertyFrom];
                }
            }
        }
        return objObject;
    }

    /**
     * Assign empty parameters with default
     * @param objFirstObject
     * @param objSecondObject
     * @param claObjectClass
     * @returns {Object}
     */
    public static assignEmpty(objFirstObject: Object,
                              objSecondObject: Object,
                              claObjectClass: any): any {
        objFirstObject = objFirstObject || {};

        let objInterface = CSTiles.getInterface(new claObjectClass());
        for (let key in objInterface) {
            if (
                CSTiles.isEmpty(objFirstObject[key]) && !CSTiles.isEmpty(objSecondObject[key]) &&
                typeof objSecondObject[key] === objInterface[key]
            ) {
                objFirstObject[key] = objSecondObject[key];
            }
        }
        return objFirstObject;
    }

    /**
     * Get class interface
     * @param objObject
     * @returns {{}}
     */
    public static getInterface(objObject: Object) {
        let objInterface = {};
        for (let i in objObject) {
            if (objObject.hasOwnProperty(i)) {
                objInterface[i] = typeof(objObject[i]);
            }
        }
        return objInterface;
    }

    /**
     * Check if variable is empty
     * @param variable
     * @returns {boolean}
     */
    public static isEmpty(variable: any) {
        if (
            Array.isArray(variable)
        ) {
            return variable.length === 0;
        } else if (
            typeof variable === "object"
        ) {
            return Object.keys(variable).length === 0;
        } else if (
            typeof variable === "string"
        ) {
            return false;
        } else {
            return typeof variable === "undefined";
        }
    }

    /**
     * Get object dump
     * @param objObject
     * @returns {string}
     */
    public static getObjectToDump(objObject: Object): string {
        let strDump = "";
        for (let i in objObject) {
            if (objObject.hasOwnProperty(i)) {
                strDump += "\t" + i + ":" + objObject[i] + "\r\n";
            }
        }
        return strDump;
    }

    /**
     * Check is instance of
     * @param objFirstObject
     * @param objSecondObject
     * @returns {boolean}
     */
    public static isInstanceOf(objFirstObject: Object,
                               objSecondObject: Object): boolean {
        if (
            !(
                typeof objFirstObject === "object" &&
                objFirstObject &&
                typeof objSecondObject === "object" &&
                objSecondObject
            )
        ) {
            return false;
        }
        for (let i in objFirstObject) {
            if (!objSecondObject.hasOwnProperty(i)) {
                return false;
            }
        }
        for (let i in objSecondObject) {
            if (!objFirstObject.hasOwnProperty(i)) {
                return false;
            }
        }
        return true;
    }

    /**
     * Check input parameters for correctness
     * @param domParentNode
     * @param objGridParams
     * @param arrTiles
     * @returns {boolean}
     */
    public static checkInnerParamsForErrors(domParentNode?: HTMLElement,
                                            objGridParams?: CGridParams,
                                            arrTiles?: Array<CTileParams>) {
        let isError = false;
        if (
            !isError && !(
                typeof domParentNode === "object" &&
                domParentNode instanceof HTMLElement &&
                typeof domParentNode.parentNode === "object" &&
                domParentNode.parentNode instanceof HTMLElement
            )
        ) {
            console.warn("The first parameter should be a DOM element.");
            isError = true;
        }
        if (
            !isError && !(
                typeof domParentNode.parentNode === "object" &&
                domParentNode.parentNode instanceof HTMLElement
            )
        ) {
            console.warn("The first parameter must be an existing DOM element.");
            isError = true;
        }
        if (
            !isError && !(
                typeof objGridParams === "object"
            )
        ) {
            console.warn("The second parameter must be an object.");
            isError = true;
        }
        if (
            !isError && !(
                CSTiles.isInstanceOf(objGridParams, new CGridParams())
            )
        ) {
            console.warn("The object with the parameters of the tile needs to implement the interface:" + "\r\n" + CSTiles.getObjectToDump(CSTiles.getInterface(new CGridParams())));
            isError = true;
        }
        if (
            !isError && !(
                Array.isArray(arrTiles)
            )
        ) {
            console.warn("The third parameter must be an array with the tiles.");
            isError = true;
        }
        if (
            !isError && !(
                arrTiles.length > 0
            )
        ) {
            console.warn("An array of tiles must contain at least one element.");
            isError = true;
        }
        for (let objTileID in arrTiles) {
            if (
                !isError && !(
                    CSTiles.isInstanceOf(arrTiles[objTileID], new CTileParams())
                )
            ) {
                console.warn("Tile number " + objTileID + " must implement the interface:" + "\r\n" + CSTiles.getObjectToDump(CSTiles.getInterface(new CTileParams())));
                isError = true;
            }
        }
        return isError;
    }

    /**
     * CSTiles tile constructor
     * @param domParentNode
     * @param objGridParams
     * @param arrTiles
     */
    constructor(domParentNode?: HTMLElement,
                objGridParams?: CGridParams,
                arrTiles?: Array<CTileParams>) {
        /**
         * Assign default params
         */
        objGridParams = CSTiles.assignDefaultGridParams(objGridParams);
        let {_arrTiles, grid, adaptiveGrid} = CSTiles.assignDefaultTileParams(objGridParams, arrTiles);
        arrTiles = _arrTiles;
        /**
         * Parameter validation errors
         */
        if (!CSTiles.checkInnerParamsForErrors(domParentNode, objGridParams, arrTiles)) {
            let arrCss = {};
            arrCss[""] = {};
            /**
             * Create grid DOM
             */
            let domGrid = document.createElement("div");
            domGrid.id = objGridParams.gridID;
            /**
             * Write grid styles
             */
            arrCss[""][domGrid.id] = {};
            arrCss[""][domGrid.id].display = "block";
            arrCss[""][domGrid.id].position = "relative";
            arrCss[""][domGrid.id].width = "100%";
            arrCss[""][domGrid.id].height = "auto";
            /**
             * Loop tiles
             */
            for (let objTile of arrTiles) {
                /**
                 * Create tile DOM
                 */
                let domTile = document.createElement("div");
                domTile.id = objTile.tileID;
                domGrid.appendChild(domTile);
                /**
                 * Write tile styles
                 */
                arrCss[""][objTile.tileID] = {};
                arrCss[""][objTile.tileID].width = `0`;
                arrCss[""][objTile.tileID].height = `0`;
                arrCss[""][objTile.tileID].display = `block`;
                arrCss[""][objTile.tileID].position = `absolute`;
                arrCss[""][objTile.tileID].padding = `${objTile.tileSize[0] / objGridParams.gridSize * 50}% ${objTile.tileSize[1] / objGridParams.gridSize * 50}%`;
                arrCss[""][objTile.tileID].margin = `${objTile.tilePosition[1] / objGridParams.gridSize * 100}% 0 0 ${objTile.tilePosition[0] / objGridParams.gridSize * 100}%`;
                /**
                 * Create tile wrap DOM
                 */
                let domTileWrap = document.createElement("div");
                domTileWrap.id = CSTiles.getUUID();
                objTile.tileWrapID = domTileWrap.id;
                domTile.appendChild(domTileWrap);
                /**
                 * Write tile wrap style
                 */
                arrCss[""][domTileWrap.id] = {};
                arrCss[""][domTileWrap.id].padding = `${objTile.tileMargin * 0.5}px`;
                arrCss[""][domTileWrap.id].left = `0`;
                arrCss[""][domTileWrap.id].top = `0`;
                arrCss[""][domTileWrap.id].width = `100%`;
                arrCss[""][domTileWrap.id].height = `100%`;
                arrCss[""][domTileWrap.id]["box-sizing"] = `border-box`;
                arrCss[""][domTileWrap.id].display = `block`;
                arrCss[""][domTileWrap.id].position = `absolute`;
                /**
                 * Create tile content DOM
                 */
                let domTileContent = document.createElement("div");
                domTileContent.id = CSTiles.getUUID();
                objTile.tileContentID = domTileWrap.id;
                domTileWrap.appendChild(domTileContent);
                /**
                 * Write tile content style
                 */
                arrCss[""][domTileContent.id] = {};
                arrCss[""][domTileContent.id]["z-index"] = `1`;
                arrCss[""][domTileContent.id].width = `100%`;
                arrCss[""][domTileContent.id].height = `100%`;
                arrCss[""][domTileContent.id]["box-sizing"] = `border-box`;
                arrCss[""][domTileContent.id].overflow = `hidden`;
                /**
                 * Add tile content
                 */
                CSTiles.insertContent(domTileContent, objTile.tileContent, arrCss);
            }
            /**
             * Create fix clean DOM
             */
            let domFix = document.createElement("div");
            domFix.id = CSTiles.getUUID();
            domGrid.appendChild(domFix);
            /**
             * Write fix style
             */
            arrCss[""][domFix.id] = {};
            arrCss[""][domFix.id].position = `relative`;
            arrCss[""][domFix.id].width = `0`;
            arrCss[""][domFix.id].height = `0`;
            arrCss[""][domFix.id].padding = `${(grid.length - 1) / objGridParams.gridSize[0] * 100}% 0 0 0;`;
            arrCss[""][domFix.id]["z-index"] = `0`;
            /**
             * Write adaptive styles
             */
            for (let strMediaName in objGridParams.adaptiveMedia) {
                if (objGridParams.adaptiveMedia.hasOwnProperty(strMediaName)) {
                    let strMediaRange = objGridParams.adaptiveMedia[strMediaName];
                    arrCss[strMediaRange] = {};
                    for (let objTile of arrTiles) {
                        arrCss[strMediaRange][objTile.tileID] = {};
                        arrCss[strMediaRange][objTile.tileID].padding = `${objTile.tileAdaptiveSize[strMediaName][0] / objGridParams.gridAdaptiveSize[strMediaName] * 50}% ${objTile.tileAdaptiveSize[strMediaName][1] / objGridParams.gridAdaptiveSize[strMediaName] * 50}%`;
                        arrCss[strMediaRange][objTile.tileID].margin = `${objTile.tileAdaptivePosition[strMediaName][1] / objGridParams.gridAdaptiveSize[strMediaName] * 100}% 0 0 ${objTile.tileAdaptivePosition[strMediaName][0] / objGridParams.gridAdaptiveSize[strMediaName] * 100}%`;
                        arrCss[strMediaRange][objTile.tileWrapID] = {};
                        arrCss[strMediaRange][objTile.tileWrapID].padding = `${objTile.tileAdaptiveMargin[strMediaName] * 0.5}px`;
                        arrCss[strMediaRange][objTile.tileContentID] = {};
                        arrCss[strMediaRange][objTile.tileContentID].padding = `${objTile.tileAdaptivePadding[strMediaName]}px`;
                    }
                    arrCss[strMediaRange][domFix.id] = {};
                    arrCss[strMediaRange][domFix.id].position = `relative`;
                    arrCss[strMediaRange][domFix.id].width = `0`;
                    arrCss[strMediaRange][domFix.id].height = `0`;
                    arrCss[strMediaRange][domFix.id].padding = `${(adaptiveGrid[strMediaName].length - 1) / objGridParams.gridAdaptiveSize[strMediaName] * 100}% 0 0 0`;
                    arrCss[strMediaRange][domFix.id]["z-index"] = `0`;
                }
            }

            /**
             * Create style DOM
             * @type {HTMLStyleElement|HTMLElement}
             */
            let domStyle = document.createElement("style");
            domStyle.innerHTML = CSTiles.convertCss(arrCss);
            domGrid.appendChild(domStyle);
            /**
             * Add grid in DOM
             */
            domParentNode.appendChild(domGrid);
        }
    }
}
/**
 * Export CSTiles to global
 */
window.CSTiles = CSTiles;
