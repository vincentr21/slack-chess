//
// var chessBoard = []
// for (var i=0; i<8; ++i)
//     for (var j=0; j<8; ++j)
//         chessBoard[i][j] = "lol"

var chessBoard = new Array(8)
for (var i=0; i<8; ++i)
    chessBoard[i] = new Array(8)


var outputMapping = {
    "wK" : ":wking:",
    "wQ" : ":wqueen:",
    "wR" : ":wrook:",
    "wB" : ":wbishop:",
    "wN" : ":wknight:",
    "wP" : ":wpawn:",

    "bK" : ":bking:",
    "bQ" : ":bqueen:",
    "bR" : ":brook:",
    "bB" : ":bbishop:",
    "bN" : ":bknight:",
    "bP" : ":bpawn:",

    "w" : ":white_large_square:",
    "b" : ":black_large_square:",

}


console.log(chessBoard)
console.log(chessBoard.length)

initializeBoard()

function initializeBoard(){
    for (var i=0; i<8; ++i)
        for (var j=0; j<8; ++j){
            var id = i.toString() + j.toString()
            var boardSquare = document.getElementById(id)
            console.log(id)
            console.log(boardSquare)
        }

}


function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    console.log("dragging: " + ev.target.className + " " + ev.target.id)

    // console.log(ev.dataTransfer)
}

function drop(ev) {
    // ev.preventDefault();
    var chessBoardSquare

    if (ev.target.tagName === "DIV")
        chessBoardSquare = ev.target
    else if (ev.target.tagName === "IMG") {
        chessBoardSquare = ev.target.parentNode
    }


    var data = ev.dataTransfer.getData("text");
    var chessPiece = document.getElementById(data)
    var boardOverflow = document.getElementById("board_overflow")
    console.log("dropping: " + chessPiece.id + " on " + chessBoardSquare.id)
    // console.log(chessBoardSquare)
    // console.log(chessBoardSquare.childElementCount)

    //if there's already a piece on that square
    if (chessBoardSquare.childElementCount > 0){
        // var existingPiece = chessBoardSquare.childNodes[0]
        var existingPiece = chessBoardSquare.children[0]
        // console.log(chessBoardSquare.childNodes)
        // console.log(chessBoardSquare.children)
        boardOverflow.appendChild(existingPiece)
        console.log("replacing existing piece")
        // console.log(existingPiece)
    }

    chessBoardSquare.appendChild(chessPiece)

    generateSlackOutput()
}


function generateSlackOutput(){
    // var chessBoard = document.getElementById("chess_board")
    // var chessRows = chessBoard.children
    // console.log(chessRows)

    var slackOutput = ""

    for (var i=0; i<8; ++i){
        for (var j=0; j<8; ++j){
            var boardSquare = document.getElementById(i.toString() + j.toString())
            if (boardSquare.childElementCount > 0){
                //generate the code for the chess piece
                var chessPiece = boardSquare.children[0]
                var type = chessPiece.id.substring(0,2)


                slackOutput += outputMapping[type]
            }
            else{
                //generate the code for a blank square, (black or white)
                if ( (i+j) % 2 === 0)
                    var type = "w"
                else
                    var type = "b"

                slackOutput += outputMapping[type]
            }

        }
        slackOutput += "\n"
    }

    var outputTextbox = document.getElementById("slack_output")

    // this prints the slack output to the textbox
    // outputTextbox.childNodes[0].nodeValue = slackOutput
    outputTextbox.value = slackOutput

    // now we can automate copying to clipboard, check first if the user wants it
    var autocopyCheckbox = document.getElementById("autocopy")
    if (autocopyCheckbox.checked){
        outputTextbox.select()
        document.execCommand('copy')
    }

    // try {
    //   var successful = document.execCommand('copy');
    //   var msg = successful ? 'successful' : 'unsuccessful';
    //   console.log('Copying text command was ' + msg);
    // } catch (err) {
    //   console.log('Oops, unable to copy');
    // }


    console.log(outputTextbox.childNodes)
    // console.log(slackOutput)
}
