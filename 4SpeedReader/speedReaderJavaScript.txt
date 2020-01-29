"use strict"; 

/* Name: Matthew Heger
   Class: CSC 337 
   Date: 2/13/2019
   This is the Javascript file for the Speed Reader */

(function() { //This is the main function of the whole code 

    let timer = null; 
    let WordIndex = 0; 
    let OldWPM = 0; 

    window.onload = function() { //This function begins after all of the HTML of the page is loaded 
        let startButton = document.getElementById("StartButton");
        let stopButton = document.getElementById("StopButton"); 
        stopButton.disabled = true; 

        startButton.onclick = tick;  //Calling the timing fuciton once the start button is clicked 
        stopButton.onclick = stop; 
        };
    
        /* function called everytime the timer goes off*/ 
        function tick() {
        let startButton = document.getElementById("StartButton");   //Initialization of all elements using ID's from HTML file
        let stopButton = document.getElementById("StopButton"); 
        let TextField = document.getElementById("TextLocation").value; 
        let Word = TextField.split(/[ \t\n]+/);   //Getting rid of white space in Textbox 
        let WordField = document.getElementById("Word"); 
        let radioButton = document.getElementsByName("rad");
        let WPM = parseInt(document.getElementById("WpmDropDown").value);
        let NewTimerFlag = 0; 
        let MS = 0; 
        
        stopButton.disabled = false;   //Disables button when not being used 
        startButton.disabled = true; 

        if(WPM != OldWPM) {
            NewTimerFlag = 1;
        }

            if(WPM == 50) {  //Statements to Convert the WPM to MS for the timer 
            MS = 500; 
            OldWPM = 50; 
            }
            
            if(WPM == 300) {
            MS = 200; 
            OldWPM = 300; 
            }
    
            if(WPM == 350) {
            MS = 171; 
            OldWPM = 350; 
            }
    
            if(WPM == 400) {
            MS = 150; 
            OldWPM = 400; 
            }
    
            if(WPM == 450) {
            MS = 133; 
            OldWPM = 450; 
            }

            if(WPM == 500) {
            MS = 120; 
            OldWPM = 500; 
            }

        if (timer == null) {  //Starts Timer 
            timer = window.setInterval(tick, MS); 
            }
        
        if(NewTimerFlag == 1) {
            clearInterval(timer); 
            timer = setInterval(tick, MS); 
            console.log("New"); 
            NewTimerFlag = 0;
        }
       
        
        if(radioButton[0].checked){  //Statements select the size of the text to be Displayed
            WordField.style.fontSize = 36 + "pt";    
        }

        else if(radioButton[1].checked){
            WordField.style.fontSize = 48 + "pt"; 
        }

        else if(radioButton[2].checked){
            WordField.style.fontSize = 60 + "pt"; 
        }

        if(Word.length > WordIndex) {  //Runs until all all the words finish 
         
        var ending = Word[WordIndex][Word[WordIndex].length - 1]; 
        var flag = 0; 

        if (ending == "." || ending == "," || ending == "!" || ending == "?" || ending == ";" || ending == ":") {  //Cuts off ending characters
        Word[WordIndex] = Word[WordIndex].slice(0, -1); 
        flag = 1; 
        }

        WordField.value = Word[WordIndex];
        console.log(Word[WordIndex]); 
        WordIndex = WordIndex + 1; 
        }

        else {
        stop(); 
        }

        console.log(1); 
        }

         /* function called to stop the timer*/ 
        function stop() {
        let startButton = document.getElementById("StartButton");
        let stopButton = document.getElementById("StopButton"); 
        let WordField = document.getElementById("Word"); 

        WordField.value = ""; 
        stopButton.disabled = true; 
        startButton.disabled = false; 

        clearInterval(timer); 
        timer = null; 
        console.log("stop"); 
        }
    
    }) ();