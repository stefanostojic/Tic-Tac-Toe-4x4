let drawingModule = (function () {

    // Konva initialization
    let stageWidth = 1000;
    let stageHeight = 1000;
    const stage = new Konva.Stage({
        container: 'container',
        width: stageWidth,
        height: stageHeight
    });
    const boardLayer = new Konva.Layer();
    const playersLayer = new Konva.Layer();

    stage.add(boardLayer);
    stage.add(playersLayer);

    function fitStageIntoParentContainer() {
        let container = document.querySelector('#stage-parent');

        // now we need to fit stage into parent
        let containerWidth = container.offsetWidth;
        // to do this we need to scale the stage
        let scaleFactor = 1;
        // if (window.innerHeight > window.innerWidth) {
        if (window.innerWidth / window.innerHeight > 1.8) {
            scaleFactor = 0.8;
        }
        // } else {
        //     scaleFactor = window.innerHeight / window.innerWidth * 1.8;
        // }

        let scale = containerWidth / stageWidth * scaleFactor;

        stage.width(stageWidth * scale);
        stage.height(stageHeight * scale);
        stage.scale({ x: scale, y: scale });
        stage.draw();
    }

    fitStageIntoParentContainer();
    // adapt the stage on any window resize
    window.addEventListener('resize', fitStageIntoParentContainer);

    let numberOfRemainingImagesToLoad = 2,
        xSymbolImage = new Image,
        oSymbolImage = new Image;


    function initialize(tileClickCallback) {
        return new Promise((resolve, reject) => {
            xSymbolImage.onload = onImageLoadCallback();
            oSymbolImage.onload = onImageLoadCallback();
            xSymbolImage.src = 'images/x-symbol.png';
            oSymbolImage.src = 'images/o-symbol.png';
    
            function onImageLoadCallback() {
                if (--numberOfRemainingImagesToLoad == 0) {
                    drawBoard();
                    addFieldClickEvents(tileClickCallback);
                    resolve();
                }
            }
        });

    }

    function drawBoard() {
        boardLayer.destroyChildren();
        for (let i = 0; i < 3; i++) {

            var verticalLine = new Konva.Line({
                points: [250 + i * 250, 0, 250 + i * 250, 1000],
                stroke: 'white',
                strokeWidth: 15
            });
            boardLayer.add(verticalLine);
            var horizontalLine = new Konva.Line({
                points: [0, 250 + i * 250, 1000, 250 + i * 250],
                stroke: 'white',
                strokeWidth: 15
            });
            boardLayer.add(horizontalLine);
        }
        boardLayer.draw();
    }

    function addFieldClickEvents(tileClickCallback) {
        for (let row = 0; row < gameBoard.length; row++) {
            for (let col = 0; col < gameBoard[0].length; col++) {

                // // disables listening for clicks on non-empty fields
                // if (board[row][col] !== '_') {
                //     console.log('not an empty field', { row, col });
                //     continue;
                // }

                var rect = new Konva.Rect({
                    x: 0 + col * 250,
                    y: 0 + row * 250,
                    width: 250,
                    height: 250
                });
                rect.row = row;
                rect.col = col;
                rect.on('click', function () {
                    // console.log('row: ', this.row);
                    // console.log('col: ', this.col);
                    tileClickCallback(this.row, this.col);
                });

                // console.log('row: ', row);
                // console.log('col: ', col);
                boardLayer.add(rect);
            }
        }

        boardLayer.draw();
    }

    function drawSymbol(row, col, symbol) {
        let symbolImage = new Konva.Image({
            x: col * 250 + 15,
            y: row * 250 + 15,
            image: symbol === 'x' ? xSymbolImage : oSymbolImage,
            width: 220,
            height: 220
        });
        playersLayer.add(symbolImage);
        playersLayer.draw();
    }

    return {
        initialize: function(tileClickCallback) {
            return initialize(tileClickCallback);
        },

        drawSymbol: function(row, col, symbol) {
            drawSymbol(row, col, symbol);
        }
    };
})();

