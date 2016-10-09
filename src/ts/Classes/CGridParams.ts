"use strict";
/**
 * Import interfaces
 */
import IGridParams from "../Interfaces/IGridParams";
/**
 * Grid params interface
 */
export default class CGridParams implements IGridParams {
    public gridID: string;
    public gridSize: number;
    public tileMargin: number;
    public tilePadding: number;
    public tileContent: Object;
    public adaptiveMedia: Object;
    public gridAdaptiveSize: Object;
    public tileAdaptiveMargin: Object;
    public tileAdaptivePadding: Object;

    constructor() {
        this.gridID = "";
        this.gridSize = 8;
        this.tileMargin = 8;
        this.tilePadding = 8;
        this.tileContent = {
            type: "none",
        };
        this.adaptiveMedia = {
            imac: "2560-",
            "desktops-huge": "1920-2560",
            "desktops-big": "1600-1920",
            desktops: "1440-1600",
            base: "1280-1440",
            "tablet-landscape": "1024-1280",
            tablet: "768-1024",
            "phone-landscape": "480-768",
            phone: "320-480",
            small: "-320",
        };
        this.gridAdaptiveSize = {
            imac: 10,
            "desktops-huge": 10,
            "desktops-big": 10,
            desktops: 8,
            base: 6,
            "tablet-landscape": 6,
            tablet: 4,
            "phone-landscape": 3,
            phone: 2,
            small: 1,
        };
        this.tileAdaptiveMargin = {};
        this.tileAdaptivePadding = {};
    }
}
