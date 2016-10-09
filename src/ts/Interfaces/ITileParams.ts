"use strict";
/**
 * Grid params interface
 */
interface ITileParams {
    tileSize: Array<number>;
    tilePosition: Array<number>;
    tileMargin: number;
    tilePadding: number;
    tileContent: Object;
    tileWrapID: string;
    tileContentID: string;
    tileAdaptiveSize: Object;
    tileAdaptivePosition: Object;
    tileAdaptiveMargin: Object;
    tileAdaptivePadding: Object;
}
/**
 * Export the ITileParams interface
 */
export default ITileParams;
