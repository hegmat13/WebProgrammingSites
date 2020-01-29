
/* Name: Matthew Heger
   Class: CSC 337 
   Date: 3/13/2019
   This is the Javascript file for the GerryMandering CSC 337 Assignment  */
"use strict"; 


(function() { //This is the main function of the whole code 


    window.onload = function() { 

        let search = document.getElementById("search");  
        search.onclick = Search;  //Call the search function when button is clicked 
    };

    /**
 * Adds two numbers together.
 * @param {int} respnse response from web service 
 * @returns {int} an error
 */
    function checkStatus(response) {    //Checks for errors on the page 
        if (response.status >= 200 && response.status < 300) {  
            return response.text();
        } else if(response.status == 404) {    //404 error when there is no data
            return Promise.reject(new Error("sorry we do not have any data"));
        } else {     
            let StateName = document.getElementById("box").value; 
            if (response.status == 410) {  //Print 410 error with description 
            document.getElementById("errors").innerHTML = response.status+": " +
             response.statusText + " and there was no data found for " + StateName; 
            }
            if(response.status != 410) {   //Print all other errors 
            document.getElementById("errors").innerHTML = response.status+": "+ response.statusText;
            }
            return Promise.reject(new Error(response.status+": "+response.statusText)); 
        } 
    }

/**
 * main function of the whole code 
 * @param {int}  
 * @param {int} 
 * @returns {int} nothing
 */
    function Search(){

        //if (flag == 1) { 
            document.getElementById("errors").innerHTML = "";   //Reset all contents on the page
            document.getElementById("statedata").innerHTML = ""; 
            document.getElementById("statename").innerHTML = ""; 
            document.getElementById("voters").innerHTML = ""; 
            /*
            var totalChild = document.getElementById("total");
            document.getElementById("voters").removeChild(totalChild); 
            var stateChild = document.getElementById("state");
            document.getElementById("statename").removeChild(stateChild); 
            var gerryChild = document.getElementById("gerry");
            document.getElementById("statename").removeChild(gerryChild); */
      //  }
        let StateName = document.getElementById("box").value;  //Get state name from search box
        let state = document.createElement("h2");    //Create all block elements 
        state.id = "state"; 
        let gerry = document.createElement("h3"); 
        gerry.id = "gerry"; 
        let total = document.createElement("h4"); 
        total.id = "total"; 

        let url = "http://localhost:3000?state=" + StateName + "&type=voters"; 
        fetch(url)
            .then(checkStatus)
            .then(function(responseText) {
                console.log(responseText); 
                let totalstring = 'total';  
                total.id = totalstring; 
                let TotalVoters = responseText;  
                total.innerHTML = TotalVoters + " eligible voters";  
                document.getElementById("voters").appendChild(total); 
            })
            .catch(function(error) {  //Catch any errors sent from the  Web service 
                document.getElementById("errors").innerHTML = error + 
                " and there was no data found for " + StateName; 
            });


        
        url = "http://localhost:3000a?state=" + StateName + "&type=districts"; //district URL
        fetch(url)
            .then(checkStatus)
            .then(function(responseText) {  
                let dem = 0;       //Initialize all variables 
                let rep = 0; 
                let demwasted = 0; 
                let repwasted = 0; 
                let party = ""; 
                let per = 0; 
                let winning = 0; 
                let bluep = 0;  

                let json = JSON.parse(responseText);  //Put data in JSON format
                
                state.id = "state";   
                state.innerHTML = json["state"];   //Insert the state in the div
                document.getElementById("statename").appendChild(state); 
   
                for(let i = 0; i < json["districts"].length; i++){ //Run through all districts
                    dem = json["districts"][i][0];   //Get number of Democrat votes
                    rep = json["districts"][i][1];   //Get number of Republican votes 
                    bluep = (dem/ (dem + rep))*100;   //Democrat percentage 

                    winning = (Math.floor((dem + rep)/2) + 1); //Number of votes to win district

                    if(dem > rep) {  //If democrats won 
                        demwasted += Math.abs((winning - dem));  //store number of wasted votes
                        repwasted += rep; 
                    }
                    else { //If Republicans won 
                        demwasted += dem;  //store number of wasted votes 
                        repwasted += Math.abs((winning - rep)); 
                    }
                
                    let newDemDistrict = document.createElement("div"); //Create new democrat div 
                    newDemDistrict.className = "dem"; 
                    newDemDistrict.style.width = bluep + "%"; 

                    let newRepDistrict = document.createElement("div"); //Create new Republican div
                    newRepDistrict.className = "gop"; 

                  newRepDistrict.appendChild(newDemDistrict); 
                   //Add democrat div inside republican div

                  document.getElementById("statedata").appendChild(newRepDistrict); 
                  //add rep div inside statedata div
                }
                per = Math.abs(demwasted - repwasted)/(demwasted + repwasted); 
                //calculate wasted percent difference 
                
                if(demwasted > repwasted) {  //If republicans had lest wasted votes
                    party = "Republican Party";
                }
                else {
                    party = "Democratic Party"; 
                }

                if (per >= 0.07) { //If percent of wasted votes was greater than 7% 
                        let gerry = document.createElement("h3");  //Create gerrymandering header 
                        gerry.id = "gerry"; 
                        gerry.innerHTML = "Gerrymandered to favor the " + party; 
                        document.getElementById("statename").appendChild(gerry); //Append header 
                }
                else {
                        gerry.innerHTML = "Not Gerry Mandered"; 
                        document.getElementById("statename").appendChild(gerry);  //append header 
                }
                
            })
            .catch(function(error) {  //Catch any errors sent from the  Web service 

            });

    }
}) ();