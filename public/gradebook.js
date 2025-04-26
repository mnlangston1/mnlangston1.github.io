// TODO: Fetch data from the PostgreSQL database (to be implemented later)
function fetchGradeData() {
    // This function will query the PostgreSQL database and return grade data
    console.log("Fetching grade data...");
    //Create a new request for HTTP data
    let xhr = new XMLHttpRequest();
    //This is the adress on the machine we're asking fpr data
    let apiRoute = "http://localhost:3000/api/grades";
    //When the request changes status, we run this anonymous function
    xhr.onreadystatechange = function(){
 
        //Check if we're done
        if(xhr.readyState === xhr.DONE){
            //Check if we're successful
            if(xhr.status !== 200){
                console.error('Could not get grades. Status: ' + xhr.status);
                return;
            }


            if (!xhr.responseText || xhr.responseText.trim() === '') {
                console.error('Empty response from server');
                return;
            }
            

            if (xhr.responseText.trim().startsWith('{') || xhr.responseText.trim().startsWith('[')) {
 
                const data = JSON.parse(xhr.responseText);
                console.log("Received data:", data);
                populateGradebook(data);
            } else {
                console.error('Invalid JSON response:', xhr.responseText);
            }
        }
    };
    xhr.open("GET", apiRoute, true);
    xhr.send();
}

// TODO: Populate the table with grade data
function populateGradebook(data) {
    // This function will take the fetched grade data and populate the table
    console.log("Populating gradebook with data:", data);
    let tableElm = document.getElementById("gradebook").querySelector('tbody'); // Get the gradebook table element
    tableElm.innerHTML = '';
        
    data.forEach(function(student) { //For each row of data we're passed in
            let row = document.createElement("tr"); //create a table row element
            let columns = []; //Handy place to stick the columns of information

            //The first coluumn's table data will be the name
            columns[0] = document.createElement("td"); 
            columns[0].textContent = student.last_name + ', ' + student.first_name;

            //The second column's table data will be the grade
            columns[1] = document.createElement("td");
            columns[1].textContent = student.total_grade !== null ? student.total_grade : 'N/A';

            //Append columns to the row
            for (let i = 0; i < columns.length; i++) {
                row.appendChild(columns[i]);
            }

            tableElm.appendChild(row);
        });
}

// TODO: REMOVE THIS
//Call the stubs to demonstrate the workflow
document.addEventListener('DOMContentLoaded', fetchGradeData);
// END REMOVE
