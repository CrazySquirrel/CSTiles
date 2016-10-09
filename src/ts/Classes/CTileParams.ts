"use strict";
/**
 * Import interfaces
 */
import ITileParams from "../Interfaces/ITileParams";
/**
 * Tile params class
 */
export default class CTileParams implements ITileParams {
    public tileID: string;
    public tileSize: Array<number>;
    public tilePosition: Array<number>;
    public tileMargin: number;
    public tilePadding: number;
    public tileContent: Object;
    public tileWrapID: string;
    public tileContentID: string;
    public tileAdaptiveSize: Object;
    public tileAdaptivePosition: Object;
    public tileAdaptiveMargin: Object;
    public tileAdaptivePadding: Object;

    constructor() {
        this.tileID = "";
        this.tileSize = [2, 2];
        this.tilePosition = [];
        this.tileMargin = 0;
        this.tilePadding = 0;
        this.tileContent = {
            type: "none",
        };
        this.tileWrapID = "";
        this.tileContentID = "";
        this.tileAdaptiveSize = {
            imac: [2, 2],
            "desktops-huge": [2, 2],
            "desktops-big": [2, 2],
            desktops: [2, 2],
            base: [2, 2],
            "tablet-landscape": [3, 3],
            tablet: [2, 2],
            "phone-landscape": [1, 1],
            phone: [1, 1],
            small: [1, 1],
        };
        this.tileAdaptivePosition = {};
        this.tileAdaptiveMargin = {};
        this.tileAdaptivePadding = {};
    }
}
