// second assignment - Aikaterini Kentroti - mai22030

(function () {
'use strict';

const table = document.querySelector('.uomTrack');

//array that holds the text inside the cells
let cellTexts = [];

//array that holds the new input elements
let inputElements = [];

//function to calculate min, max and average score
function Statistics(table){
  //array that holds the scores
  let rows = table.rows;
  let score = [];
  let sum = 0;
   let max = 0;
   let min = 7000; //initializing with an unrealistic value
  for (i = 1; i < (rows.length - 1); i++) {
    let x = rows[i].getElementsByClassName('inputField')[2];
    score[i]= parseFloat((x.value));  //converting string to number
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
  //console.log(max,min,avg)
  if (score.length===0){
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
  var row = footer.insertRow(0);
  for (var i=0; i<3; i++ ){
    var cell = row.insertCell(i);
    cell.style.width="100px";
    cell.style.fontWeight='bold';
    cell.innerHTML = stringsArray[i] +(z[i]);
  } 
}

//function to update the values in the footer
function updateFooter(stringsArray,Statistics,table){
  let rows = table.rows;
  let z = Statistics(table);
  let footRowIndex = rows.length - 1;
  for (i=0;i<3;i++)
    table.rows[footRowIndex].cells[i].innerHTML=stringsArray[i] +(z[i]);
}


//iterate through all rows except for header
for (var i = 1, row; row = table.rows[i]; i++) {
  // initialize row
  cellTexts[i] = [];
  inputElements[i]=[];
  
  
  //iterate trough columns
  for (var j = 0, col; col = row.cells[j]; j++) {
    
    cellTexts[i][j] = row.cells[j].innerText; //store the existing text inside the td elements in an array
    
    row.cells[j].innerText = ""; //remove the existing text inside td

    inputElements[i][j] = document.createElement('input'); //creating the input elements
    inputElements[i][j].style.color = "black";
    inputElements[i][j].type = "text";     
    inputElements[i][j].placeholder = "type here";
    inputElements[i][j].value = cellTexts[i][j];
    cellTexts[i][j]=inputElements[i][j].value;
    if (j==1){
      inputElements[i][j].setAttribute('size',8);
    } else{
      inputElements[i][j].setAttribute('size',4);
    }
    
    inputElements[i][j].className = "inputField" ;  //adding a class name to the input fields
    row.cells[j].appendChild(inputElements[i][j]);    //setting the input element to be child of the td element
    
  }
  //adding a new column at the table το include copy and delete button
  var newCell = row.insertCell(6);
  var copyButton=document.createElement('button');
  copyButton.className="copyRow";
  var deleteButton=document.createElement('button');
  deleteButton.className="deleteRow";
  copyButton.style.color="teal";
  copyButton.innerHTML="Copy";
  deleteButton.style.color="#8B0000";
  deleteButton.innerHTML="Delete";
  newCell.appendChild(copyButton);
  newCell.appendChild(deleteButton);
}

//call the function to create footer
createFooter(footerStrings,Statistics,table);


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

 //printing the array for debugging purposes
//  console.log("print the input elements array");
//  for (let i = 1; i< rowCount; i++) {
//   for(let j = 0; j< colCount; j++) {
//       //console.log(cell_texts[i][j]);
//       console.log(inputElements[i][j]);
//   }
// }


}());