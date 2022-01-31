'use strict';

showSetUpData();                             //current preferences are displayed 

updateFields();                             //update table according to current preferences
 
showTableData();                            //stored table data in local storage are displayed

let submitData = document.getElementById('InsertSetup');

const table=document.querySelector('table');

submitData.addEventListener('click', () => {         //when the user clicks on Insert, set up data is stored in local storage and table is updated according to preferences
    addSetUpData();        // preferences are stored in local storage
    deleteTable();        //remove current table before create a new one
    updateFields();       //table is updated according to preferences
    location.reload();    //page is reloaded
})

function addSetUpData() {                                              //add set up data (sport) and numberd of athletes (rows) to localStrorage
    let arr = [];
    const sport = document.getElementById("sportType");
    const athletes = document.getElementById("numAthletes");
    const table=document.querySelector('table');

    DeleteData();   //clear previous local storage

    arr.push(sport.value, athletes.value);     //sport inserted from user and number of athletes are stored in an array that is the value of the key-value pair
    //console.log(arr);
    localStorage.setItem("localData", JSON.stringify(arr));    //add to local storage 
}    

function addTableData(){                               //add table data to local storage
    if (tableHasBody()){
        let arr2=[];
        var rows=document.querySelectorAll('tr');
        var inputElements=document.getElementsByClassName('inputField');
        var headers = document.querySelectorAll('th');                         //retrieve number of columns from header
        
        console.log("rows "+rows.length,"columns " +headers.length);
        console.log(inputElements[0],typeof(inputElements));

        for (var i=0; i<inputElements.length;i++){    //strore the values of the input fields in arr2
            arr2.push(inputElements[i].value);          
        }
        
        

        // var statisticsCells=document.getElementsByClassName('statCells');      //attempt to store the statistics too, did not work though

        // for (var i=0; i<statisticsCells.length;i++){
        //       arr2.push(statisticsCells[i].innerText);
        // }

        // console.log(arr2);
        localStorage.setItem("tableData",JSON.stringify(arr2));
    }
}


    
function DeleteData() {   //function to clear the local Storage
    localStorage.clear();
}

function getSetUpData() {                             //returns the value of local storage for set up in array
    var str = localStorage.getItem("localData");
    
    var array = JSON.parse(str);
    
    return array;
}

function getTableData(){                             //returns the value stored in local storage for table data in array
    var str=localStorage.getItem("tableData");
    var array=JSON.parse(str);
    return array;
}

function showSetUpData() {                            //function to display the stored data fpr the set up from localStorage
    var array = getSetUpData();            
    console.log("set up data: "+array);
    const sport = document.getElementById("sportType");
    const athletes = document.getElementById("numAthletes");
    if (array!==null){
      sport.value = array[0];
      athletes.value = array[1];
    }
    
}

function showTableData(){

    var tableData=getTableData();
    console.log("table data: "+tableData);
    //console.log(typeof(tableData),tableData.length);
    if (tableData!==null){
        var inputElements=document.getElementsByClassName('inputField');
        console.log("number of input elements: "+inputElements.length)
    
        for (var i=0; i<inputElements.length;i++){    //assign to the input value the values from local Storage
            inputElements[i].value=tableData[i];
            console.log("input elements have value: "+inputElements[i].value);          
        }
        
        // var statisticsCells=document.getElementsByClassName('statCells');
        // console.log(statisticsCells);
        // if (tableData.length===statisticsCells.length+inputElements.length){    //if there are values stored in local storage for the statistics cells, display them
        //     for (var j=inputElements.length; j<tableData.length;j++){
        //         console.log(j,tableData[j]);
        //         var i=statisticsCells.length-1;
        //         statisticsCells[i].innerText=tableData[j];
        //         console.log(statisticsCells[i].innerText);
        //         i--;
        //     }
            
        //}
    }
    
}

function updateTitle(title) {               //function to update the title of the table according to use'rs input
    var caption = document.querySelector('caption');
    caption.innerHTML = "Track Women: ";
    if (title != "") {
        caption.innerHTML = caption.innerHTML + title;
    }
}

function deleteTable(){               //deletes table and table footer
    var tobody=document.getElementById('tableBody');
    var footer=document.getElementById('tableFooter');
     if (tableHasBody()){
        
        console.log("tbody is:"+tobody);
        tobody.remove();
        
     }
     footer.remove();  
}

function tableHasBody(){
    var tobody=document.getElementById('tableBody');   //returns true if the table has tbody elements => at least one row
    
    if (tobody!=null){
        return true;
    } else{
        return false;
    }
}

function createTable(table, rowCount, columns) {         //function to create table if the user enters a number in the number of rows field
    var cell = [];
    var inputElements = [];
    var rows=[];

    if (rowCount != "" && isNum(rowCount)) {
        var tbody = document.createElement('tbody');                 //add tbody element
        tbody.id = "tableBody"

        for (var i = 0; i < rowCount; i++) {            //create rows and add cells
            cell[i] = 0;
            inputElements[i] = 0;
            console.log(i);
          
            var row =document.createElement("tr");       //cretae rows

            for (var j = 0; j < columns; j++) {
  

                var cell=document.createElement('td');           //create cells for each row(td elements)
                row.appendChild(cell);

                var inputElement = document.createElement('input'); //creating the input elements
                
                inputElement.style.color = "black";
                inputElement.type = "text";
                inputElement.placeholder = "type here";
               
                if (j == 1) {
                    inputElement.setAttribute('size', 8);
                } else {
                    inputElement.setAttribute('size', 4);
                }

                inputElement.className = "inputField";  //adding a class name to the input fields
                 cell.appendChild(inputElement);    //setting the input element to be child of the td element

            }
            //adding a new column at the table το include copy and delete button
            var newCell = row.insertCell(columns);
            var copyButton = document.createElement('button');
            copyButton.className = "copyRow";
            var deleteButton = document.createElement('button');
            deleteButton.className = "deleteRow";
            copyButton.style.color = "teal";
            copyButton.innerHTML = "Copy";
            deleteButton.style.color = "#8B0000";
            deleteButton.innerHTML = "Delete";
            newCell.appendChild(copyButton);
            newCell.appendChild(deleteButton);

            tbody.appendChild(row);

            
            table.appendChild(tbody); 
        }
    }
    
    const footerStrings=["Best: ", "Worst: ", "Average: "];
    //call the function to create footer
    createFooter(footerStrings,Statistics,table);
}


function isNum(val) {   //returns true if a string is a number
    return !isNaN(val)
}

function updateFields() {
    var array = getSetUpData();

    if (array!==null){              //if there are values in local storage
      var title = array[0];
      var rows = array[1];
    } else{
      var title="";
      var rows=0;
    }
    
    var table = document.querySelector('table');
    var headers = document.querySelectorAll('th');
    var headerArray = Array.from(headers);            //retrieve number of columns from header
    var colCount = headerArray.length;


    console.log(colCount);
    console.log(rows);
    console.log(isNum(rows))

    updateTitle(title);
    
    
    createTable(table, rows, colCount);                 //create a table if the input is valid 
}

//function to calculate min, max and average score
function Statistics(table){
    //array that holds the scores
    let rows = table.rows;
    let score = [];
    let sum = 0;
     let max = 0;
     let min = 7000; //initializing with an unrealistic value
    for (var i = 1; i < (rows.length - 1); i++) {
      let x = rows[i].getElementsByClassName('inputField')[2];
      score[i]= parseFloat((x.value));  //converting string to number
      console.log(score[i]);
      sum+= score[i];
      //console.log("score is: ",score[i],typeof score[i]);
      if (score[i]>max){
        max = score[i];
      }
      if (score[i]<min){
        min = score[i];
      } 
    }
    //console.log(score.length); 
    let avg=Math.round((sum/score.length));
    console.log("sum is: "+sum,"length of score column: "+score.length,"average is: "+avg,"score is: "+score);
    if (score.length===0 || (Number.isNaN(sum))){
      return [0,0,0]
    } else{
      return [max,min,avg];
    }
   
  }

  const footerStrings=["Best: ", "Worst: ", "Average: "];
//function to create a tfoot element with 3 cells
 function createFooter(stringsArray,Statistics,table){
  let z = Statistics(table);
  var footer = table.createTFoot();
  footer.id="tableFooter";
  var row = footer.insertRow(0);
  for (var i=0; i<4; i++ ){
    var cell = row.insertCell(i);
    cell.style.width="100px";
    
    if (i!==3){
        cell.style.fontWeight='bold';
        cell.innerHTML = stringsArray[i] +(z[i]);
        cell.className="statCells";
    } else{
      if (tableHasBody()){
        var submitButton = document.createElement('button');
        submitButton.id="submitTableData";
        submitButton.innerHTML = "Store";
        cell.appendChild(submitButton);
      }
       
    }
      
  }
  

}

//function to update the values in the footer
function updateFooter(stringsArray,Statistics,table){
    let rows = table.rows;
    let z = Statistics(table);
    let footRowIndex = rows.length - 1;
    for (var i=0;i<3;i++)
      table.rows[footRowIndex].cells[i].innerHTML=stringsArray[i] +(z[i]);
  }

  //add event to sort the table when the user clicks a header in ascending and descending order

table.querySelectorAll('th').forEach((element,columnNo)=>{
    element.addEventListener('click',function(event){
      sortTable(table,columnNo);
    })
})

//event delegation

document.querySelector('tbody').addEventListener('click',function (e){
  if (e.target && e.target.matches("button.deleteRow")) {    //if the delete button of a row is clicked this row is deleted
        //console.log("Delete button clicked!");
        const rows = document.querySelectorAll('tr');
        const rowsArray = Array.from(rows);
        const rowIndex = rowsArray.findIndex(row => row.contains(event.target));
        deleteRow(table,rowIndex);
        
	} else if(e.target && e.target.matches("button.copyRow")){   //if the copy button of a row is clicked this row is  duplicated
        //console.log("Copy button clicked!");
         const rows = document.querySelectorAll('tr');
        const rowsArray = Array.from(rows);
        const rowIndex = rowsArray.findIndex(row => row.contains(event.target));
        copyRow(table,rowIndex);
        
  }
  updateFooter(footerStrings,Statistics,table); //updating the statistics in the tfoot after an insertion or a remove from the table
})

const submitButton=document.getElementById("submitTableData");

submitButton.addEventListener('click', () => {         //when the user clicks on Submit buttton, table data is stored in local storage
   
    addTableData();
    
})

//function for duplicating row
function copyRow(table,rowIndex){
  var clone = table.rows[rowIndex].cloneNode(true); // copy children too
  insertAfter(table.rows[rowIndex],clone); //add the duplicated row after the row
}

//function for deleting a row
function deleteRow(table,rowIndex){

  table.deleteRow(rowIndex);
  //console.log(rowIndex);
  
}

//function for inserting an element after another element
function insertAfter(after, newNode){
  after.parentNode.insertBefore(newNode, after.nextSibling);
}


//function for sorting the table
 function sortTable(table,columnNo){

  //storing te th elements(the header in the table) in an array
  let headerTitles=document.getElementsByTagName('th');
  
  let rows,switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc";
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the
    first and the last, which contains table headers and the tfoot): */
    for (i = 1; i < (rows.length - 2); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* comparing two elements from a row and from the next row */

       x = rows[i].getElementsByClassName('inputField')[columnNo];
       y = rows[i + 1].getElementsByClassName('inputField')[columnNo];
       
      //prints for debugging purposes
      // console.log(x,y);
      // console.log(typeof x);
      // console.log(typeof x.value);

      //turn the font of the text to bold
      //x.style.fontWeight='bold';
      //y.style.fontWeight='bold';

      /* Check if the two rows should switch place by comparing the value attributes of the input elements x,y
      based on the direction, asc or desc: */
      if (dir == "asc") {
      
        if (headerTitles[columnNo].innerText == "Athlete"){  //first case: sorting based on surname

          //split the string to sort according to surname
          var name1 = x.value.split(" ");
          var name2 = y.value.split(" ");

          if (name1[1].toLowerCase() > name2[1].toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
            
          }
        }else if(headerTitles[columnNo].innerText=="Country"){ //second case: sorting of strings (country name)
          if (x.value.toLowerCase() > y.value.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }else{
          if (parseFloat(x.value) > parseFloat(y.value)){      //third case: sort scores (number)
            shouldSwitch = true;
            break;
          }
        }
        
      } else if (dir == "desc") {
        if (headerTitles[columnNo].innerText == "Athlete"){
         //split the string to sort according to surname
         var name1 = x.value.split(" ");
         var name2 = y.value.split(" ");

         if (name1[1].toLowerCase() < name2[1].toLowerCase()) {
           // If so, mark as a switch and break the loop:
           shouldSwitch = true;
           break;
           
         }
       } else if(headerTitles[columnNo].innerText== "Country") {
        if (x.value.toLowerCase() < y.value.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
        
      }else{
        if (parseFloat(x.value)< parseFloat(y.value)) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
      }
      }
    }
  }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount ++;
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
    
  }
}

