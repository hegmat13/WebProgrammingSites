/* Name: Matthew Heger
   Class: CSC 337 
   Date: 3/25/2019
   This is the Javascript file for the BestReads CSC 337 Assignment  */
"use strict";


    /**
* Function
* @param {int} respnse response
* @returns {int} return
*/
(function () { //This is the main function of the whole code 


    window.onload = function () {
        let home = document.getElementById("back");
        Begin();
        home.onclick = Home;
    };

    /**
* Function
* @param {int} respnse response
* @returns {int} return
*/
    function checkStatus(response) {    //Checks for errors on the page 
        if (response.status >= 200 && response.status < 300) {
            return response.text();
        } else if (response.status == 404) {    //404 error when there is no data
            return Promise.reject(new Error("sorry we do not have any data"));
        } else {
            if (response.status == 410) {  //Print 410 error with description 

            }
            if (response.status != 410) {   //Print all other errors 

            }
            return Promise.reject(new Error(response.status + ": " + response.statusText));
        }
    }

    /**
* Function
* @param {int} respnse response
* @returns {int} return
*/
    function Begin() {
        let url = "http://localhost:3000?mode=books&title=harrypotter";  //info mode url

        fetch(url)  //Fetches info mode data from web service file 
            .then(checkStatus)
            .then(function (responseText) {
                console.log(responseText);
                let Allbooks = document.getElementById("allbooks"); //div to insert books

                let info = JSON.parse(responseText);
                console.log(info.books[0]);

                for (let i = 0; i < info.books.length; i++) {  //run through all the books 
                    let book = document.createElement("div");  //create new element for each book

                    if (i < 10) {  //If it is not a double digit number add a zero in front
                        book.id = info.books[i].folder + "0" + i;
                    }
                    else { //else just put the double digit number at the end of the id 
                        book.id = info.books[i].folder + i;
                    }

                    book.onclick = Book;  //Call the function Book when a book div is clicked 
                    let image = document.createElement("IMG");
                    if (i < 10) { //Same as above but for the book images 
                        image.id = "image" + "0" + i;
                    }
                    else {
                        image.id = "image" + i;
                    }
                    image.src = "books/" + info.books[i].folder + "/cover.jpg";  //Set src of image

                    book.appendChild(image); //Add image to book div 

                    let title = document.createElement("p");  //Create paragraph element 
                    if (i < 10) { //Same as above for book title 
                        title.id = "title" + "0" + i;
                    }
                    else {
                        title.id = "title" + i;
                    }
                    title.innerHTML = info.books[i].title; //Set the title from the JSON info 

                    book.appendChild(title);  //Add title to book 

                    Allbooks.appendChild(book); //add book to Div containing all books 
                }

            })
            .catch(function (error) {  //Catch any errors sent from the  Web service 
                console.log(error);
            });
    }

     /**
* Function
* @param {int} respnse response
* @returns {int} return
*/
    function Home() { //Clear all elements once Home is clicked 
        document.getElementById("cover").innerHTML = "";
        document.getElementById("title").innerHTML = "";
        document.getElementById("author").innerHTML = "";
        document.getElementById("stars").innerHTML = "";
        document.getElementById("description").innerHTML = "";
        document.getElementById("reviews").innerHTML = "";

        Begin(); // Call function to restart what happens when page loads 

    }

    /**
* Function
* @param {int} respnse response
* @returns {int} return
*/
    function Book() { //Initialize all elements on page
        let number = this.id[this.id.length - 2] + this.id[this.id.length - 1];
        let title = document.getElementById("title" + number);
        let source = document.getElementById("image" + number).src;
        let image = document.getElementById("cover");
        let Newtitle = document.getElementById("title");


        image.src = source;
        Newtitle.innerHTML = title.innerHTML;

        //Set the url to info mode and cut off the last two numbers of id for folder name 
        let url = "http://localhost:3000?mode=info&title=" + this.id.slice(0, -2);

        console.log(url);
        fetch(url) //Start fetching JSON for info mode 
            .then(checkStatus)
            .then(function (responseText) {

                let info = JSON.parse(responseText);
                console.log(info.author);
                document.getElementById("author").innerHTML = info.author;
                document.getElementById("stars").innerHTML = info.stars;
            })
            .catch(function (error) {  //Catch any errors sent from the  Web service 
            console.log(error); 
            });

        url = "http://localhost:3000?mode=description&title=" + this.id.slice(0, -2);

        console.log(url);
        fetch(url) //Start fetching description for description mode 
            .then(checkStatus)
            .then(function (responseText) {
                document.getElementById("description").innerHTML = responseText;
            })
            .catch(function (error) {  //Catch any errors sent from the  Web service 
            console.log(error); 
            });

        url = "http://localhost:3000?mode=reviews&title=" + this.id.slice(0, -2);

        console.log(url);
        fetch(url) //start fetching reviews for reviews mode 
            .then(checkStatus)
            .then(function (responseText) {
                console.log(responseText);

                let AllReviews = JSON.parse(responseText);

                console.log(AllReviews.reviews.length);

                for (let i = 0; i < AllReviews.reviews.length; i++) {  //Run through all reviews 
                    console.log("inside");
                    let name = document.createElement("h3");  //create name element 
                    name.innerHTML = AllReviews.reviews[i].name + 
                    " <span>" + AllReviews.reviews[i].stars + "</span>";

                    let details = document.createElement("p"); //create details element 
                    details.innerHTML = AllReviews.reviews[i].review;

                    console.log(name);

                    let reviewsDiv = document.getElementById("reviews");
                    reviewsDiv.appendChild(name);  //Add name element to entire reviews 
                    reviewsDiv.appendChild(details);  //add details element to entire reviews 
                }

            })
            .catch(function (error) {  //Catch any errors sent from the  Web service 
                console.log(error); 
            });


        document.getElementById("allbooks").innerHTML = "";  //Clear all books on homepage  

    }

})();