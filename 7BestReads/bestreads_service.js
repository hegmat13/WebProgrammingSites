// CSC 337 Project 8 Book Review
// Provided web service that fetches All book information for BestReads Assignment
// Name: Matthew Heger
// Class: CSC 337 
// Date: 3/25/2019
//
// 
/*eslint strict: ["error", "global"]*/
/*eslint no-implicit-globals: 2*/
"use strict";

let require; 
const express = require("express");
const app = express();
let fs = require('fs');


app.use(express.static('public'));

// reads data asynchronously fromt the passed in file name
// returns the contents of the file as a string
    /**
* Function
* @param {int} fileName response
* @returns {int} return
*/
function readFile(fileName) { 
	let file = 0;
	try {  
	    file = fs.readFileSync(fileName, 'utf8');
	    console.log(file);    
	} catch(e) {
	    console.log('Error:', e.stack);
	}
	return file;
}


//Builds a json representation of the info mode 
//Splits up into three categories: title, author, and stars
    /**
* Function
* @param {int} respnse response
* @returns {int} return
*/
function buildJsonInfo(line) {
	line = line.split("\n");

	let data = {}; 

	data["title"] = line[0]; 
	data["author"] = line[1]; 
	data["stars"] = line[2]; 
	
	return data;
}

//Returns the title of the book 
    /**
* Function
* @param {int} respnse response
* @returns {int} return
*/
function buildJsonTitle(line) {
	line = line.split("\n");

	return line[0]; 
}

//Creates a Json representation of each review
//Splits up reveiews into three Categories: name, stars, and review
    /**
* Function
* @param {int} respnse response
* @returns {int} return
*/
function buildJsonReview(line) {
	line = line.split("\n");

	let data = {};

	data["name"] = line[0]; 
	data["stars"] = line[1]; 
	data["review"] = line[2]; 

	return data; 
}   



//This function starts the web service 
    /**
* Function
* @param {int} respnse response
* @returns {int} return
*/
console.log('web service started');
app.get('/', function (req, res) {
	res.header("Access-Control-Allow-Origin", "*");


	let book = req.query.title;  //Title of the book 
	let mode = req.query.mode;   //mode of request 
	let fileName = ""; 
	let EntireFile; 

	// returns an error if one of the parameters is missing
	if(book == undefined || mode == undefined) {
		res.status(410);
		res.send("Missing required parameters");
	}

	if(mode == "info") { //Info Mode 
		fileName = "books/" + book + "/" + mode + ".txt";
		EntireFile = readFile(fileName);  //Reads File 
		let line = buildJsonInfo(EntireFile);

		console.log(JSON.stringify(line)); 
		res.send(JSON.stringify(line));  //Sends info as a string 
	} 
	else if(mode == "description") {  //Description Mode 
		fileName = "books/" + book + "/" + mode + ".txt";
		EntireFile = readFile(fileName); 
		res.send(EntireFile);  //Sends descripton of book back to javascript 
	}
	else if(mode == "reviews") {  //Reviews Mode 
		let files = fs.readdirSync('./books/' + book);
		let reviews = {}; 
		let reviewArray = [];
				//console.log('File Name: ' + files[i] 
				console.log(files[3]); 
				for	(let j = 0; j < files.length - 3; j++){
					fileName = "books/" + book + "/" + files[j + 3]; 
					EntireFile = readFile(fileName); 

					let line = buildJsonReview(EntireFile); 
					reviewArray[j] = line; 
				}
				reviews["reviews"] = reviewArray; 

				console.log(JSON.stringify(reviews)); 
				res.send(JSON.stringify(reviews)); 
	}

	else if(mode == "books") { //books Mode 
		let bookArray = [];  //Array containing all the books 
		let booklist = {}; //List containing all the books 
		
		let files = fs.readdirSync('./books/'); //Return directry names of every book folder

		for	(let j = 0; j < files.length; j++){  //traverse through all books 
			fileName = "books/" + files[j] + "/info.txt";
			EntireFile = readFile(fileName); 

			let line = buildJsonTitle(EntireFile); //Get title of book 
			let title = {}; 
			title["title"] = line;   //add json title 
			title["folder"] = files[j]; //add json folder 

			bookArray.push(title); //add to the book array 

		} 
		booklist["books"] = bookArray; //Add book array to book list 

		console.log(JSON.stringify(booklist)); 
		res.send(JSON.stringify(booklist)); //send book list as a string 
	}
});

app.listen(3000); //Specifie the port number 



