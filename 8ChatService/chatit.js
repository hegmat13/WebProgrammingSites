/* Name: Matthew Heger
    Class: CSC 337 
   Date: 3/30/2019
   This is the Javascript file for the chatit CSC 337 Assignment  */

"use strict"; 
(function() { 
     let flag = 0; 
     window.onload = function() {
     let sendb = document.getElementById("Send"); 
     sendb.onclick = SendFunction; //Call send function on click 
     GetFunction(); 

     setInterval(GetFunction, 5000); 
     };
     
     /**
     //this function for the statuschek
     */
     function checkStatus(response) {    //Checks for errors on the page 
         if (response.status >= 200 && response.status < 300) {  
             return response.text();
         }else if(response.status == 404) {    //404 error when there is no data
             return Promise.reject(new Error("sorry we do not have any data"));
         }else {     
             return Promise.reject(new Error(response.status+": "+response.statusText)); 
         } 
     }
     /**
     //this function goes one when tha page is loading
     */
     function SendFunction() {  //This function Sends the Name and message 
         let NAME = document.getElementById("inputName").value;
         let MESSAGE = document.getElementById("inputComment").value;
         let Jmessage = { Name : NAME,
             Comment : MESSAGE
         };
         const fetchOptions = { //Sets the mode of fetching to POST
             method : 'POST',
             headers : {
                 'Accept': 'application/json',
                 'Content-Type' : 'application/json'
             },
             body : JSON.stringify(Jmessage) //Build json body
             
         };
         console.log(JSON.stringify(Jmessage));
         
         let url = "http://localhost:3000";  //local url

         fetch(url, fetchOptions) //Post the text to the file
         .then(checkStatus)
         .then(function(responseText) {
             console.log(responseText);
         })
         .catch(function(error) {
             console.log(error);
         } );

     }

         /**
* Function
* @param {int} respnse response
* @returns {int} return
*/
      function GetFunction(){ //Funciton for getting text from file

        let url = "http://localhost:3000";

        fetch(url) //Start fetching description for description mode 
        .then(checkStatus)
        .then(function (responseText) {
        let MessageBox = document.getElementById("Allmessages");
        if(flag == 1) { //Clear the box after first iteration
            MessageBox.innerHTML = ""; 
        }

        let text = JSON.parse(responseText); 
        
        console.log(text["messages"][0].name); 
        for(let i = 0; i < text["messages"].length; i++) { 
        let message = document.createElement("div"); //Make elements 
        let Name = document.createElement("div"); 
        let comment = document.createElement("div"); 
        Name.id = "NameText";  //Set ids 
        comment.id = "CommentText"; 

        message.className = "message"; 
        Name.innerHTML = text["messages"][i].name; //Put the name in its div
        comment.innerHTML = ": " + text["messages"][i].comment; //put the comment in its div
        
        message.appendChild(Name);  //Add name and comment to entire message div
        message.appendChild(comment); 

        MessageBox.appendChild(message); //Add message div to the message box
        flag = 1; 
        
        }

        console.log(text); 
        console.log(responseText); 
        

        })
        .catch(function (error) {  //Catch any errors sent from the  Web service 
            console.log(error);
        });

      }
}) ();
