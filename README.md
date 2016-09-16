# CSTiles
The JavaScript tiles component.
## Build
The repository contains pre-compiled files, but if you want to add your files and compile, then run the following commands in the repository folder.
* npm install
* npm run production

or

* npm run development

The build required NodeJs version 6 or higher.

## Usage
```
//If you use TypeScript in your project.
import CSTiles from CSTiles.ts
    
//If you use JavaScript in your project.
let window = global;
request("CSTiles.js");
let CSTiles = window["CSTiles"];
    
//If you just want to use JavaScript as usual.
<script src="js/CSTiles.js"></script>
    
//Then call just CSTiles class with parameters.
new CSTiles(<domParentNode>,<objGridParams>,<arrTiles>);
```
### Parameters
```
- domParentNode
    The parent dom element in which the tiles will be inserted.
    
- objGridParams
    The parameters are describing the grid.
    
    - gridSize <number>
        The size of the grid in the baseline condition.
        
    - tileMargin <number>
        The distance between tiles in pixels.
        
    - tilePadding <number>
        The distance from the edge of the tile to the content in pixels.
        
    - tileContent <Object>
        The object describing the parameters of the default tile.
             
            type: 'image',
            src: './images/1.jpg'
            
            type: 'iframe',
            src: 'https://www.youtube.com/embed/w1I-HWAP6N8?controls=0&showinfo=0'
            
            type: 'video',
            src: [
                './videos/index.mp4'
            ],
            poster: './images/3.jpg'
            
            type: 'audio',
            src: [
                './audios/index.mp4'
            ],
            poster: './images/4.jpg'
                    
            type: 'html',
            html: 'Text',
            poster: './images/5.jpg'
            
            type: 'dom',
            query: '#dfgdfhdhfghf',
            poster: './images/6.jpg'
        
    - adaptiveMedia <Object>
        The object describing the adaptive ranges for tiles.
        
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
        
    - gridAdaptiveSize <Object>
        The object describing adaptive tile sizes.
        
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
        
    - tileAdaptiveMargin <Object>
        The object describing adaptive indentation between the tiles.
    
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
        
    - tileAdaptivePadding <Object>
        The object describing adaptive spacing from the edge to the content tiles.
        
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
        
- arrTiles
    The array of objects describing the tiles.
    
    - tileSize <number>
        The size of the tile in units of the mesh grid.
        
    - tileMargin <number>
        The distance between tiles in pixels.
        
    - tilePadding <number>
        The distance from the edge of the tile to the content in pixels.
        
    - tileContent <Object>
        The object describing the parameters of the default tile.
        
            type: 'image',
            src: './images/1.jpg'
            
            type: 'iframe',
            src: 'https://www.youtube.com/embed/w1I-HWAP6N8?controls=0&showinfo=0'
            
            type: 'video',
            src: [
                './videos/index.mp4'
            ],
            poster: './images/3.jpg'
            
            type: 'audio',
            src: [
                './audios/index.mp4'
            ],
            poster: './images/4.jpg'
                    
            type: 'html',
            html: 'Text',
            poster: './images/5.jpg'
            
            type: 'dom',
            query: '#dfgdfhdhfghf',
            poster: './images/6.jpg'
        
    - tileAdaptiveSize <Object>
        The distance describing adaptive tile sizes in grid units.
        
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
        
    - tileAdaptiveMargin <Object>
        The object describing adaptive indentation between the tiles.
      
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
        
    - tileAdaptivePadding <Object>
        The object describing adaptive spacing from the edge to the content tiles.
    
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
```
## Example
```javascript
new CSTiles(
        document.body,
        {
            gridSize: 8,
            tileMargin: 5,
            tilePadding: 5,
            tileContent: {
                type: 'none'
            },
            adaptiveMedia: {
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
            }
        },
        [
            {
                tileSize: [2, 2],
                tileContent: {
                    type: 'tiles',
                    params: {
                        grid: {
                            gridSize: 8,
                            tileMargin: 0,
                            tilePadding: 0,
                            tileContent: {
                                type: 'none'
                            },
                            adaptiveMedia: {
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
                            }
                        },
                        tiles: [
                            {
                                tileSize: [2, 2],
                                tileContent: {
                                    type: 'image',
                                    src: './images/1.jpg'
                                },
                            },
                            {
                                tileSize: [2, 2],
                                tileContent: {
                                    type: 'iframe',
                                    src: 'https://www.youtube.com/embed/w1I-HWAP6N8?controls=0&showinfo=0'
                                },
                            },
                            {
                                tileSize: [2, 2],
                                tileContent: {
                                    type: 'video',
                                    src: [
                                        './videos/index.mp4'
                                    ],
                                    poster: './images/3.jpg'
                                },
                            },
                            {
                                tileSize: [2, 2],
                                tileContent: {
                                    type: 'audio',
                                    src: [
                                        './audios/index.mp4'
                                    ],
                                    poster: './images/4.jpg'
                                },
                            },
                            {
                                tileSize: [2, 2],
                                tileContent: {
                                    type: 'image',
                                    src: './images/5.jpg'
                                },
                            },
                            {
                                tileSize: [2, 2],
                                tileContent: {
                                    type: 'image',
                                    src: './images/8.jpg'
                                },
                            },
                            {
                                tileSize: [2, 2],
                                tileContent: {
                                    type: 'image',
                                    src: './images/9.jpg'
                                },
                            }
                        ]
                    }
                }
            },
            {
                tileSize: [2, 2],
                tileContent: {
                    type: 'image',
                    src: './images/1.jpg'
                },
            },
            {
                tileSize: [2, 2],
                tileContent: {
                    type: 'iframe',
                    src: 'https://www.youtube.com/embed/w1I-HWAP6N8?controls=0&showinfo=0'
                },
            },
            {
                tileSize: [2, 2],
                tileContent: {
                    type: 'video',
                    src: [
                        './videos/index.mp4'
                    ],
                    poster: './images/3.jpg'
                },
            },
            {
                tileSize: [2, 2],
                tileContent: {
                    type: 'audio',
                    src: [
                        './audios/index.mp4'
                    ],
                    poster: './images/4.jpg'
                },
            },
            {
                tileSize: [2, 2],
                tileContent: {
                    type: 'html',
                    html: 'Text',
                    poster: './images/5.jpg'
                },
            },
            {
                tileSize: [2, 2],
                tileContent: {
                    type: 'dom',
                    query: '#dfgdfhdhfghf',
                    poster: './images/6.jpg'
                },
            },
            {
                tileSize: [2, 2],
                tileContent: {
                    type: 'image',
                    src: './images/7.jpg'
                },
            },
            {
                tileSize: [2, 2],
                tileContent: {
                    type: 'image',
                    src: './images/8.jpg'
                },
            },
            {
                tileSize: [2, 2],
                tileContent: {
                    type: 'image',
                    src: './images/9.jpg'
                },
            }
        ]
);
```