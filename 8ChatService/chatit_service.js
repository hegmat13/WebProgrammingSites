/* Name: Matthew Heger
    Class: CSC 337 
   Date: 3/30/2019
   This is the web service file for the chatit CSC 337 Assignment  */

   "use strict";
   const express = require("express"); //All imports 
   const app = express();
   let fs = require('fs');
   
   const bodyParser = require('body-parser');
   const jsonParser = bodyParser.json();
   
   
   app.use(function(req, res, next) { //Set up the application 
       res.header("Access-Control-Allow-Origin", "*");
       res.header("Access-Control-Allow-Headers", 
                  "Origin, X-Requested-With, Content-Type, Accept");
       next();
   });
   
   app.use(express.static('public'));

            /**
* Function
* @param {int} respnse response
* @returns {int} return
*/
   function readFile(fileName) { //Read from the file 
	let file = 0;
	try {  
	    file = fs.readFileSync(fileName, 'utf8');
	    //console.log(file);    
	} catch(e) {
	   // console.log('Error:', e.stack);
	}
	return file;
}

         /**
* Function
* @param {int} respnse response
* @returns {int} return
*/
function buildJson(line) { //Function for building json format 
    line = line.split("\n");
    let array = []; 
    let data = {}; 


    for(let i = 0; i < line.length; i++){
    let splitline =  line[i].split(":::"); //split the line
    let comment = {}; //list to hold the comment 
    comment["name"] = splitline[0]; //Add the name
    comment["comment"] = splitline[1]; //Add the comment
    array.push(comment); 
    }	

    data["messages"] = array; //Add entire list to messages 

	return data; 
}   
   console.log('web service started');
   
   app.post('/', jsonParser, function (req, res) {
       res.header("Access-Control-Allow-Origin", "*");
       let name = req.body.Name;
       let comment = req.body.Comment;
       console.log("shit"); 
       console.log(comment); 
       let message = "\n" + name + ":::" + comment;
     //  console.log(whole); 
    //   console.log(name);
     //  console.log(comment);
   //  console.log(code);

       fs.appendFile("message.txt", message, function(err) {
           if(err) {  //Write to the messages file 
               console.log(err);
               res.status(400);
           }
           console.log("The file was saved!");
           console.log(comment); 
           res.send("Success!");
       });
   
       
   });

   app.get('/', function (req, res) { //Get the data from the file
   res.header("Access-Control-Allow-Origin", "*");

   let File = readFile("message.txt"); //read from messages.txt 
   let Content = buildJson(File);
  
   console.log(Content); 

   //console.log(JSON.stringify(line)); 
   //res.send(JSON.stringify(line));  //Sends info as a string 
    res.send(JSON.stringify(Content)); 
   });
   
   app.listen(3000); //Specifie the port number 
