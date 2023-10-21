
// Fetch the table element from the body
const memTable = document.getElementById("mem-table");

// Fill the array with values
const MEM_SIZE = 100;
// The number of columns in the table
const numColumns = Math.sqrt(MEM_SIZE);
const numRows = numColumns;

// Make a memory array, acting like RAM
let memArray = [];
for(let i = 0; i < MEM_SIZE; i++) {
    memArray.push(0);
}


// Function to add a string to the table
function addString(string) {
    // Get the length of the string
    const stringLength = string.length;

    // This will tell the starting address of the string
    let stringStartIndex = -1;

    // Check if we have a 'stringLength' long chunk of memory available
    for(let i = 0; i < MEM_SIZE; i++) {
        // The memory space is not free
        if(memArray[i] !== 0) continue;

        // Set the starting address
        stringStartIndex = i;
        
        // Else check if the next `stringLength` blocks are free?
        for(let j = i; j < i + stringLength; j++) {
            if(memArray[j] !== 0) {
                stringStartIndex = -1;
                break;
            }
        }
        
        // If the start index isn't affected by the prior loop, then we have a match
        if(stringStartIndex === i) break;
    }

    // If we have a valid starting index, then insert the string there
    if(stringStartIndex === -1) {
        alert("Couldn't allocate space for the string");
        console.log("Couldn't allocate space for the string");
        return;
    }

    console.log("Starting index: ", stringStartIndex);
    console.log("String: ", string);
    console.log("String length: ", stringLength);

    let i = stringStartIndex;
    for(; i < stringStartIndex + stringLength; i++) {
        memArray[i] = string[i-stringStartIndex];
    }
    memArray[i] = "\0";

    console.log(memArray);
}


function renderTable() {
    // Render the table values
    memTable.innerHTML = "";

    let i = 0;
    for(let row = 0; row < numRows; row++) {
        // Insert a row inside the table
        let rowElement = memTable.insertRow(row);
        for(let col = 0; col < numColumns; col++) {
            // Insert a new cell
            let cell = rowElement.insertCell(col);
            cell.innerHTML = `${memArray[i].toString()}`;

            // If the cell is empty then don't worry
            if(memArray[i] === 0) continue;

            // If the element is null-character, then paint the cell red.
            if(memArray[i] === "\0") {
                cell.style.backgroundColor = "var(--dark-red)";
            }
            else{
                cell.style.backgroundColor = "var(--easy-green)";
                cell.style.color = "var(--dark)";
            }

            // Increment the counter to jump to next element in mem-array
            i++;
        }
    }
}


function fetchAndAddToMemory() {
    // Get the value from the input text
    const inputElement = document.getElementById("string");
    // Add the string to the table
    addString(inputElement.value);
    // Update the table
    renderTable();
    // Reset the value in the input bar
    inputElement.value = "";
}


/**
 * Render the table for the first time
 */
renderTable();


/**
 * Event listeners
 */

// Execute a function when the user presses a key on the keyboard
document.getElementById("string").addEventListener("keypress", (event) => {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("addToMem").click();
    }
});