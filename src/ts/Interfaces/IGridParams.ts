"use strict";
/**
 * Grid params interface
 */
interface IGridParams {
    gridID: string;
    gridSize: number;
    tileMargin: number;
    tilePadding: number;
    tileContent: Object;
    adaptiveMedia: Object;
    gridAdaptiveSize: Object;
    tileAdaptiveMargin: Object;
    tileAdaptivePadding: Object;
}
/**
 * Export the IGridParams interface
 */
export default IGridParams;
