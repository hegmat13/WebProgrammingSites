/* Name: Matthew Heger
    Class: CSC 337 
   Date: 4/4/2019
   This is the Javascript file for the Paint CSC 337 Assignment  */

"use strict"; 

(function() { 
    let penradius = 1; 
    let pencolor = "black"; 
    let mouseflag = false; 
    let resetflag = false; 
    let previous = ""; 

    window.onload = function() {

        let canvas = document.getElementById("canvas");  //Load all elements from HTML
        let pensize = document.getElementById("pensize");
        let plus = document.getElementById("plus");
        let minus = document.getElementById("minus");
        let pencontext = canvas.getContext("2d");
        let penbutton = document.getElementById("pen");
        let circlebutton = document.getElementById("circles");
        let linebutton = document.getElementById("lines");
        let squarebutton = document.getElementById("squares");
        let clearbutton = document.getElementById("clear");

        pencontext.fillStyle = "white"; //Fill the Canvas White intitally 
        pencontext.fillRect(0, 0, canvas.width, canvas.height);

        let colorgradient = document.getElementById("gradient");
        let context = colorgradient.getContext("2d"); 
        colorgradient.onclick = ColorGradient1;  //Add onclick event for Gradient

        //Add all of the colors to the gradient and create horizontal gradient
        colorgradient = context.createLinearGradient(0,0,100,0);
        colorgradient.addColorStop(0, "rgb(255, 0, 0)"); //adds a color 
        colorgradient.addColorStop(0.15, "rgb(255, 0, 255)");
        colorgradient.addColorStop(0.33, "rgb(0, 0, 255)");
        colorgradient.addColorStop(0.49, "rgb(0, 255, 255)");
        colorgradient.addColorStop(0.67, "rgb(0, 255, 0)");
        colorgradient.addColorStop(0.84, "rgb(255, 255, 0)");
        colorgradient.addColorStop(1, "rgb(255, 0, 0)");

        //Fill the Canvas with the color gradient
        context.fillStyle = colorgradient;
        context.fillRect(0,0,100,100);

        //Create a gradient for the black and white vetrical gradient 
        colorgradient = context.createLinearGradient(0,0,0,100);
        colorgradient.addColorStop(0, "rgb(255, 255, 255, 1)"); //adds a color 
        colorgradient.addColorStop(0.5, "rgb(255, 255, 255, 0)");
        colorgradient.addColorStop(0.5, "rgb(0, 0, 0, 0)");
        colorgradient.addColorStop(1, "rgb(0, 0, 0, 1)");
        
        //Fill the Canvas with the black and white gradient
        context.fillStyle = colorgradient;
        context.fillRect(0,0,100,100);

        //Create a pen canvas for the pensize 
        let pencontext1 = pensize.getContext("2d"); 
        pencontext1.fillStyle = "white"; 
        pencontext1.fillRect(0, 0, pensize.height, pensize.width); 

        //Draw the smallest font in the center 
        pencontext1.beginPath();
        pencontext1.arc(25, 25, penradius, 0, 2*Math.PI);
        pencontext1.stroke();
        
        //Add onclick events for all the functions 
        plus.onclick = Plus; 
        minus.onclick = Minus; 
        penbutton.onclick = PenStart;  
        circlebutton.onclick = CircleStart; 
        linebutton.onclick = LineStart; 
        squarebutton.onclick = SquareStart; 
        clearbutton.onclick = ClearStart; 
        
    };

 //This function Extracts the Color from the Color Gradient 
/**
* Function
* @param {int} respnse response
* @returns {int} return
*/
    function ColorGradient1(event) {
        let colorgradient = document.getElementById("gradient");    
        let context = colorgradient.getContext("2d"); 
        let pixelData = context.getImageData(event.offsetX, event.offsetY, 100, 100);
        //Store the rgb color code from the selected color in a string
        pencolor = "rgb(" + pixelData.data[0] + ", " + pixelData.data[1] + ", " +
        pixelData.data[2] + ")"; 
        console.log(pixelData); 
        console.log(pencolor); 
    }

 //This function Increases the size of the black circle in the center of the Pen canvas
/**
* Function
* @param {int} respnse response
* @returns {int} return
*/
    function Plus() {
        if (penradius < 25) {
        penradius = penradius + 1; 

        let pensize = document.getElementById("pensize");
        let pencontext = pensize.getContext("2d"); 
        
        pencontext.fillStyle = "black";
        pencontext.beginPath();
        pencontext.arc(25, 25, penradius, 0, 2*Math.PI);
        pencontext.stroke();
        pencontext.fill(); 
        }
    }

//This function Decreases the size of the black circle in the center of the Pen canvas
/**
* Function
* @param {int} respnse response
* @returns {int} return
*/
    function Minus() {
        if (penradius > 1) { 
        penradius = penradius - 1;

        let pensize = document.getElementById("pensize");
        let pencontext = pensize.getContext("2d"); 
        
        //Get rid of the old black circle
        pencontext.fillStyle = "white"; 
        pencontext.fillRect(0, 0, pensize.height, pensize.width);
        
        //Draw a new smaller black circle
        pencontext.fillStyle = "black";
        pencontext.beginPath();
        pencontext.arc(25, 25, penradius, 0, 2*Math.PI);
        pencontext.stroke();
        pencontext.fill(); 
        }
    }

    //Sets the previous value to Pen
/**
* Function
* @param {int} respnse response
* @returns {int} return
*/
    function PenStart() {
        previous = "Pen"; 
        Pen(); 
    }

//Adds action listeners and starts the animation frame for Pen
/**
* Function
* @param {int} respnse response
* @returns {int} return
*/
    function Pen() {
        let canvas = document.getElementById("canvas");
        canvas.onmousedown = MouseDown;
        canvas.onmouseup = MouseUp; 

        
        if (mouseflag == true) { 
        window.addEventListener("mousemove", DrawLine);
        }
        else {
        resetflag = false; 
        window.removeEventListener("mousemove", DrawLine); 
        }
        if (previous == "Pen") {
        requestAnimationFrame(Pen);
        }
    }
    
//This function draws the lines on the canvas
/**
* Function
* @param {int} respnse response
* @returns {int} return
*/
    function DrawLine(event) {
        let canvas = document.getElementById("canvas");
        let pencontext = canvas.getContext("2d");

        if (resetflag == false) {
        pencontext.moveTo(event.offsetX, event.offsetY);     
        }
        else { 
        console.log(pencolor); 
        pencontext.strokeStyle = pencolor;  //Set the pencolor 
        pencontext.lineTo(event.offsetX, event.offsetY); //draw line to
        pencontext.stroke(); //make line appear on the page
        Pen(); 
        }
        resetflag = true; 
    }

 //This function sets previous to Circle
/**
* Function
* @param {int} respnse response
* @returns {int} return
*/
    function CircleStart(){
        previous = "Circle"; 
        Circle(); 
    }

//This function adds Action Listeners and Animation for Circle button 
/**
* Function
* @param {int} respnse response
* @returns {int} return
*/
    function Circle() { 
        let canvas = document.getElementById("canvas");
        canvas.onmousedown = MouseDown; //Add mouse down event
        canvas.onmouseup = MouseUp;  //Add mouse up event

        if (mouseflag == true) {
        window.addEventListener("mousemove", DrawCircle);
        }
        else {
        window.removeEventListener("mousemove", DrawCircle); 
        }

        if (previous == "Circle") {
        requestAnimationFrame(Circle);
        }
    }

//This function draws the circles on the canvas
/**
* Function
* @param {int} respnse response
* @returns {int} return
*/
    function DrawCircle(event) {
        let canvas = document.getElementById("canvas");
        let pencontext = canvas.getContext("2d");
        pencontext.strokeStyle = pencolor; 
        pencontext.beginPath();
        pencontext.arc(event.offsetX, event.offsetY, penradius, 0, 2*Math.PI);
        pencontext.stroke();
        Circle(); 
    }

//This function sets previous to Line
/**
* Function
* @param {int} respnse response
* @returns {int} return
*/
    function LineStart(){
        previous = "Line";
        Line(); 
    }

//This function adds action listners and Animation Frames to Line 
/**
* Function
* @param {int} respnse response
* @returns {int} return
*/
    function Line() {
        let canvas = document.getElementById("canvas");
        canvas.onmousedown = MouseDown;
        canvas.onmouseup = MouseUp; 

        if (mouseflag == true) {
        window.addEventListener("mousemove", DrawLines);
        }
        else {
        window.removeEventListener("mousemove", DrawLines); 
        }

        if(previous == "Line") {
        requestAnimationFrame(Line);
        }      
    }

//This function draws the lines on the canvas
/**
* Function
* @param {int} respnse response
* @returns {int} return
*/
    function DrawLines() {
        let canvas = document.getElementById("canvas");
        let pencontext = canvas.getContext("2d");
        pencontext.strokeStyle = pencolor; 

        pencontext.moveTo(0,0); 
        pencontext.lineTo(event.offsetX, event.offsetY);
        pencontext.stroke();
        Line(); 
    }

 //This function sets previous to Square
/**
* Function
* @param {int} respnse response
* @returns {int} return
*/
    function SquareStart() {
        previous = "Square"; 
        Square(); 
    }

 //This function sets Action Listeners and Animation frame for Square 
/**
* Function
* @param {int} respnse response
* @returns {int} return
*/
    function Square() {
        let canvas = document.getElementById("canvas");
        canvas.onmousedown = MouseDown;
        canvas.onmouseup = MouseUp; 

        if (mouseflag == true) {
        window.addEventListener("mousemove", DrawSquares);
        }
        else {
        window.removeEventListener("mousemove", DrawSquares); 
        }

        if(previous == "Square") {
         requestAnimationFrame(Square);
        }      
    }

//This function draws the squares on the canvas
/**
* Function
* @param {int} respnse response
* @returns {int} return
*/
    function DrawSquares(event) {
        let canvas = document.getElementById("canvas");
        let pencontext = canvas.getContext("2d");
        console.log("Drawing"); 
        pencontext.fillStyle = pencolor; 
        //pencontext.beginPath();
        pencontext.fillRect(event.offsetX, event.offsetY, penradius, penradius); 
        //pencontext.stroke(); 
        Square(); 
    }

 //This function sets previous to clear
/**
* Function
* @param {int} respnse response
* @returns {int} return
*/
    function ClearStart() {
        previous = "clear"; 
        Clear(); 
    }

//This function clears the canvas
/**
* Function
* @param {int} respnse response
* @returns {int} return
*/
    function Clear() {
        let canvas = document.getElementById("canvas");
        let pencontext = canvas.getContext("2d");
        pencontext.fillStyle = "white";
        pencontext.fillRect(0, 0, canvas.width, canvas.height);
    }

//This function sets mouseflag to true
/**
* Function
* @param {int} respnse response
* @returns {int} return
*/
    function MouseDown() {
        mouseflag = true;
    }

//This function sets mouseflag to false
/**
* Function
* @param {int} respnse response
* @returns {int} return
*/
    function MouseUp() {
        mouseflag = false; 
    }

}) ();