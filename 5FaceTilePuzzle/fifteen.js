"use strict"; 

/* Name: Matthew Heger
   Class: CSC 337 
   Date: 2/20/2019
   This is the Javascript file for the Fifteen Piece Puzzle */

(function() { //This is the main function of the whole code 

    let emptySquareX = 3; //row of empty square 
    let emptySquareY = 3; //column of empty square

    window.onload = function() { //This function begins after all of the HTML of the page is loaded 
    let PuzzleArea = document.getElementById("puzzlearea");   //Set Size and position style 
    let ShuffleButton = document.getElementById("shufflebutton"); 


    PuzzleArea.style.margin = "auto"; 
    PuzzleArea.style.width = "400px"; 
    PuzzleArea.style.height = "400px"; 
    PuzzleArea.style.position = "relative"; 
   
    let x = 0;  //Horizontal position of piece 
    let y = 0;  //Vertical position of piece 

    for(let i = 1; i < 16; i++) {  
    let Piece = document.createElement("div");  
    Piece.className = "PuzzlePiece"; 
    Piece.style.height = "90px"; 
    Piece.style.width = "90px"; 
    Piece.style.position = "absolute"; 
    Piece.style.paddingTop = "0px"; 
    Piece.style.margin = "0px"; 
    
    Piece.style.fontSize = "40pt"; 
    Piece.style.textAlign = "center"; 
    Piece.innerHTML = i; 
    

    Piece.style.left = x + "px"; 
    Piece.style.top = y + "px"; 

    Piece.style.backgroundImage = "url('FacePuzzle.jpg')";  //Set Background Image and Position
    Piece.style.backgroundPositionX = -x + "px";   //offset of image is inverted 
    Piece.style.backgroundPositionY = -y + "px"; 

    let x1 = x/100; 
    let y1 = y/100; 

    Piece.id =  x1 + "" + y1; 

    x = x + 100;  //Shift new piece to the right 100px 

    if((i % 4) == 0) {  //When the end of a row is reached, x position reset
         x = 0; 
         y = y + 100; 
    }


    Piece.onmouseover = MouseOver; 
    Piece.onmouseout = MouseOut; 
    Piece.onmousedown = MouseDown; 

    Piece.style.border = "5px solid black";
    PuzzleArea.appendChild(Piece); 
    console.log("new"); 
    ShuffleButton.onclick = Shuffle;
    }
    };

    // @Shuffle all of the tiles into solvable state 
    function Shuffle() {
    console.log("Shuffle"); 

    for(let i = 0; i < 1000; i++) {
    let randomN = 0; 
    let NoBottom = false; 
    let NoTop = false; 
    let NoRight = false; 
    let NoLeft = false; 
    let Exit = true; 

    
    if(emptySquareY == 3) {   //These if statements check all edge cases for the algorithm 
        NoBottom = true;     //In this case the empty square has no bottom neighbor if posY == 3
    }
    if(emptySquareY == 0) {
         NoTop = true; 
    }
    if(emptySquareX == 0) {
         NoLeft = true; 
    }
    if(emptySquareX == 3) {
         NoRight = true; 
    }
    

    while(Exit) { 
    randomN = parseInt(Math.random() * 4); 
    console.log(randomN); 
    if(randomN == 0) {     
      if(NoTop == false){
      Exit = false; 
     }
     }    
    if(randomN == 1) {
       if(NoRight == false) {
        Exit = false; 
       }
    }
    if(randomN == 2) {
       if(NoBottom == false) {
        Exit = false; 
       }
     }
     if(randomN == 3) {
        if(NoLeft == false) {
        Exit = false; 
        }
     }}

     if(randomN == 0) {   //Move Top piece down 
     let MovingPiece = document.getElementById("" + emptySquareX + (emptySquareY - 1)); 
     let NewY = parseInt(MovingPiece.id[1]) + 1; 
     MovingPiece.id = MovingPiece.id[0] + NewY; 
     MovingPiece.style.top = parseInt(MovingPiece.style.top) + 100 + "px"; 
     emptySquareY = emptySquareY - 1; 
     }
     if(randomN == 1) {   //Move Right piece to the left
     let MovingPiece = document.getElementById("" + (emptySquareX + 1) + emptySquareY); 
     let NewX = parseInt(MovingPiece.id[0]) - 1; 
     MovingPiece.id = NewX + MovingPiece.id[1]; 
     MovingPiece.style.left = parseInt(MovingPiece.style.left) - 100 + "px"; 
     emptySquareX = emptySquareX + 1; 
     }
     if(randomN == 2) {   //Move Bottom piece up
     let MovingPiece = document.getElementById("" + emptySquareX  + (emptySquareY + 1)); 
     let NewY = parseInt(MovingPiece.id[1]) - 1; 
     MovingPiece.id = MovingPiece.id[0] + NewY; 
     MovingPiece.style.top = parseInt(MovingPiece.style.top) - 100 + "px"; 
     emptySquareY = emptySquareY + 1; 
     }
     if(randomN == 3) {  //Move left piece to the right 
     let MovingPiece = document.getElementById("" + (emptySquareX - 1)  + emptySquareY); 
     let NewX = parseInt(MovingPiece.id[0]) + 1; 
     MovingPiece.id = NewX + MovingPiece.id[1]; 
     MovingPiece.style.left = parseInt(MovingPiece.style.left) + 100 + "px"; 
     emptySquareX = emptySquareX - 1; 
     }
     console.log(emptySquareX); 
     console.log(emptySquareY); 
     }
    }

    //Moves Pieces when clicked on 
    function MouseDown() {

     let NoBottom = false; 
     let NoTop = false; 
     let NoRight = false; 
     let NoLeft = false; 
     let SAD = 0; 
 
     if(emptySquareY == 3) {   //These if statements check all edge cases
          NoBottom = true;     
     }
     if(emptySquareY == 0) {
          NoTop = true; 
     }
     if(emptySquareX == 0) {
          NoLeft = true; 
     }
     if(emptySquareX == 3) {
          NoRight = true; 
     }
     
     SAD = Math.abs(emptySquareX - parseInt(this.id[0])) + Math.abs(emptySquareY - parseInt(this.id[1])); 

     console.log(this.id);
     console.log(emptySquareX); 
     console.log(emptySquareY); 
     console.log(NoTop); 

     console.log(SAD); 
     //Check if piece is Valid Top Neighbor
     if(!NoTop && (this.id[1] == (emptySquareY - 1)) && (SAD == 1)) {  
     console.log("inside"); 
     this.style.top = parseInt(this.style.top) + 100 + "px";  //Move to the bottom 
     emptySquareY = emptySquareY - 1; 
     let NewY = parseInt(this.id[1]) + 1; 
     this.id = this.id[0] + NewY; 
     }    
     else if(!NoBottom && (this.id[1] == (emptySquareY + 1)) && (SAD == 1)) {  
     this.style.top = parseInt(this.style.top) - 100 + "px";  //Move piece to the top
     emptySquareY = emptySquareY + 1; 
     let NewY = parseInt(this.id[1]) - 1; 
     this.id = this.id[0] + NewY; 
     }
     //Check if piece is Valid Left Neighbor
     else if(!NoLeft && (this.id[0] == (emptySquareX - 1)) && (SAD == 1)) {  
     this.style.left = parseInt(this.style.left) + 100 + "px";  //Move piece to the right
     emptySquareX = emptySquareX - 1; 
     let NewX = parseInt(this.id[0]) + 1; 
     this.id = NewX + this.id[1]; 
     }
     //Check if piece is Valid Right Neighbor
     else if(!NoRight && (this.id[0] == (emptySquareX + 1)) && (SAD == 1)) {  
     this.style.left = parseInt(this.style.left) - 100 + "px";   //Move piece to the left
     emptySquareX = emptySquareX + 1; 
     let NewX = parseInt(this.id[0]) - 1; 
     this.id = NewX + this.id[1]; 
     }

     console.log("down");
     }

    //Changes color of text to red when MouseOver
    function MouseOver(){
    this.style.borderColor = "red"; 
    this.style.color = "red"; 
    console.log("Over"); 
    }

    //Changes color of text to black when MouseOver
    function MouseOut(){
    this.style.color = "black"; 
    this.style.borderColor = "black"; 
    console.log("out"); 
    }

    }) ();