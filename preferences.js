

showData();                             //current preferences are displayed 

updateFields();

let submitData = document.getElementById('InsertSetup');


submitData.addEventListener('click', () => {         //when the user clicks on Insert, local storage and table is updated
    addSetUpData();
    addTableData();
    deleteTable();        //remove current table before create a new one
    updateFields();
})

function addSetUpData() {                                              //add data to localStrorage
    let arr = [];
    const sport = document.getElementById("sportType");
    const athletes = document.getElementById("numAthletes");
    const table=document.querySelector('table');

    DeleteData();   //clear previous local storage

    arr.push(sport.value, athletes.value);     //sport inserted from user and number of elements are stored in an array that is the value of the key-value pair
    //console.log(arr);
    localStorage.setItem("localData", JSON.stringify(arr));    //add to local storage fo the user's set up
}    

function addTableData(){
    if (tableHasBody()){
        let arr2=[];
        var rows=document.querySelectorAll('tr');
        var inputElements=document.getElementsByClassName('inputField');
        var headers = document.querySelectorAll('th');                         //retrieve number of columns from header
        
        console.log("rows "+rows.length,"columns " +headers.length);
        console.log(inputElements[0],typeof(inputElements));

        for (i=0; i<inputElements.length;i++){    //strore the values of the input fields in arr2
            arr2.push(inputElements[i].value);          
        }
        
        console.log(arr2);
        localStorage.setItem("tableData",JSON.stringify(arr2));
    }
}


    
function DeleteData() {   //function to clear the local Storage
    localStorage.clear();
}

function getSetUpData() {                             //returns the value of local storage ad an array
    var str = localStorage.getItem("localData");
    var array = JSON.parse(str);
    return array;
}

function getTableData(){
    var str=localStorage.getItem("tableData");
    var array=JSON.parse(str);
    return array;
}

function showData() {
    var array = getSetUpData();
    console.log(array);
    const sport = document.getElementById("sportType");
    const athletes = document.getElementById("numAthletes");
    sport.value = array[0];
    athletes.value = array[1];

    var tableData=getTableData();
    console.log(tableData);
    var inputElements=document.getElementsByClassName('inputField');

    for (i=0; i<inputElements.length;i++){    //assign to the input value the values from local Storage
        inputElements[i].value=tableData[i];          
    }

}

function updateTitle(title) {
    var caption = document.querySelector('caption');
    caption.innerHTML = "Track Women: ";
    if (title != "") {
        caption.innerHTML = caption.innerHTML + title;
    }
}

function deleteTable(){
    var tobody=document.getElementById('tableBody');
     if (tableHasBody()){
        
        console.log("tbody is:"+tobody);
        tobody.remove();
     }
        
}

function tableHasBody(){
    var tobody=document.getElementById('tableBody');   //returns true if the table has tbody elements => at least one row
    
    if (tobody!=null){
        return true;
    } else{
        return false;
    }
}

function createTable(table, rowCount, columns) {
    var cell = [];
    var inputElements = [];
    var rows=[];

    if (rowCount != "" && isNum(rowCount)) {
        var tbody = document.createElement('tbody');                 //add tbody element
        tbody.id = "tableBody"

        for (i = 0; i < rowCount; i++) {            //create rows and add cells
            cell[i] = 0;
            inputElements[i] = 0;
            console.log(i);
          
            var row =document.createElement("tr");       //cretae rows

            for (j = 0; j < columns; j++) {
  

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
}


function isNum(val) {   //returns true if a string is a number
    return !isNaN(val)
}

function updateFields() {
    var array = getSetUpData();
    var title = array[0];
    var rows = array[1];

    var table = document.querySelector('table');
    var headers = document.querySelectorAll('th');
    var headerArray = Array.from(headers);            //retrieve number of columns from header
    var colCount = headerArray.length;


    console.log(colCount);
    console.log(rows);
    console.log(isNum(rows))

    updateTitle(title);
    
    createTable(table, rows, colCount);                 //create a table if the input is valid 
    
    const footerStrings=["Best: ", "Worst: ", "Average: "];
    

}