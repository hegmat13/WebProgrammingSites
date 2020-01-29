
"use strict"; 

/* Name: Matthew Heger
   Class: CSC 337 
   Date: 2/6/2019
   This is the Javascript file for the guessingGame */

(function() { //This is the main function of the whole code 

    let num = 0; 
    let OutputString = ""; 

    window.onload = function() { //This function begins after all of the HTML of the page is loaded 
    document.getElementById("Maximum").value = 10;  //Initialization of variables
    document.getElementById("Minimum").value = 1; 

    let guessNum = document.getElementById("GuessNum"); 
    let guessButton = document.getElementById("Guess"); 
    let startButton = document.getElementById("Start");
    
    guessButton.onclick = check;     //transition to function on button clicks 
    startButton.onclick = start; 
    }

    function start() {  //This function begins once the user enters a maximum and minimum value to be guessed 
    document.getElementById("Output").innerHTML = ""; 
    OutputString = ""; 
    let maxnum = document.getElementById("Maximum").value; //Initialization of variables
    let minnum = document.getElementById("Minimum").value;  
    
    let power = 1; 
    let check = maxnum/10; 

    while(check > 1) {   //This function selects the correct power for the random number generator to be raised to, depending on Maximum number
    power = power + 1; 
    check = check/10; 
    }

    num = Math.floor(Math.random()*Math.pow(10, power)); 
    
    while (num < minnum || num > maxnum) {   //Ensures random number stays between max and min 
    num = Math.floor(Math.random()*Math.pow(10, power)); 
    }
    }
    
    function check() {  //This function begins once the user clicks the guess! button 
    let guessNum = document.getElementById("GuessNum").value; //Initialization of variables
    let OutputText = document.getElementById("Output"); 
    
    if (guessNum == num) {  //These statements insert the correct output into the <p> file of the HTML
    OutputString = OutputString + "you got it right!" + " <br> "; 
    OutputText.innerHTML = OutputString; 
    }
    else if (guessNum > num) {
    OutputString = OutputString + "less than " + guessNum + " <br> "; 
    OutputText.innerHTML = OutputString;
    }
    else {
    OutputString = OutputString + "more than " + guessNum + " <br> "; 
    OutputText.innerHTML = OutputString;
    }
    }
    
    }) ();