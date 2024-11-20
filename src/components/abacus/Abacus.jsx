import { useState } from "react";
import PropTypes from 'prop-types';


// AbacusRow Component renders the beads in each row.
const AbacusRow = ({ beads, rowIndex, isFirstRow, onClick }) => {
  const colBeads = 13; // Number of beads in the row

  return (
    <div className="flex items-center space-x-10 py-2 mx-auto">
      {[...Array(colBeads)].map((_, index) => (
        <div
          key={index}
          className="w-5 h-5 rounded-full bg-custom-radial"
          style={{
            // Apply vertical movement based on bead's position
            transform: `translateY(${beads[index]}px)`,
          }}
          onClick={() => onClick(rowIndex, index, isFirstRow)} // Pass rowIndex, beadIndex, and isFirstRow
        ></div>
      ))}
    </div>
  );
};

AbacusRow.propTypes = {
  beads: PropTypes.arrayOf(PropTypes.number).isRequired, // Beads is an array of numbers
  rowIndex: PropTypes.number.isRequired, // rowIndex is a number
  isFirstRow: PropTypes.bool.isRequired, // isFirstRow is a boolean
  onClick: PropTypes.func.isRequired, // onClick is a function
};


// Abacus Component manages the state and renders the abacus with multiple rows.
const Abacus = ({setResult}) => {
  // Initial state setup: an array of rows with each bead position (in pixels)
  const [rows, setRows] = useState([
    new Array(13).fill(-20), // Special row, initial bead position is 30px (default)
    new Array(13).fill(0), // Regular row
    new Array(13).fill(0), // Regular row
    new Array(13).fill(0), // Regular row
    new Array(13).fill(0), // Regular row
  ]);



  const beadValue =[
    Array.from({length:13},(_,index)=> 5* Math.pow(10,index)).reverse(),
     Array.from({length:13},(_,index)=> 1* Math.pow(10,index)).reverse(),
     Array.from({length:13},(_,index)=> 2* Math.pow(10,index)).reverse(),
     Array.from({length:13},(_,index)=> 3* Math.pow(10,index)).reverse(),
     Array.from({length:13},(_,index)=> 4* Math.pow(10,index)).reverse(),
  ];

  
 
  // Function to handle bead movement independently for the clicked bead
  const handleBeadClick = (rowIndex, beadIndex, isFirstRow) => {
    debugger

    const newRow =[...rows];
    // for the firstRow or mainRow
    if(isFirstRow&& newRow[rowIndex][beadIndex]===-20){
      newRow[rowIndex][beadIndex] = 0;
      setResult((prev)=> prev += beadValue[0][beadIndex] )
      setRows(()=> newRow)
    }else if( isFirstRow && newRow[rowIndex][beadIndex]===0){
      newRow[rowIndex][beadIndex] = -20;
      setResult((prev)=> prev -= beadValue[0][beadIndex] )
      setRows(()=> newRow)
    }
 
// Handle cumulative logic for rows other than the first row
if (rowIndex >= 1) {
  
  let tempValue = 0;

  if (newRow[rowIndex][beadIndex] === 0) {
    // Moving beads up (addition)
    for (let i = rowIndex; i >= 1; i--) {
      if (newRow[i][beadIndex] === 0) {
        newRow[i][beadIndex] = -20; // Move bead up
        tempValue = beadValue[1][beadIndex] * rowIndex; // Add bead value
        console.log(`Adding bead value from row ${i}:`, beadValue[i][beadIndex]);
      }
    }
    setResult(() =>  tempValue); // Add cumulative value to the result
  } else if (newRow[rowIndex][beadIndex] === -20) {
    // Moving beads down (subtraction)
    for (let i = rowIndex; i <= newRow.length - 1; i++) {
      if (newRow[i][beadIndex] === -20) {
        newRow[i][beadIndex] = 0; // Move bead down
        tempValue += beadValue[i][beadIndex]; // Subtract bead value
        console.log(`Subtracting bead value from row ${i}:`, beadValue[i][beadIndex]);
      }
    }
    setResult((prev) => prev - tempValue); // Subtract cumulative value from the result
  }

  setRows(() => newRow);
}
};
  return (
    <div className="flex flex-col items-start space-y-2 p-4 max-w-min bg-white mx-auto px-10 py-5 mt-10 absolute rounded-md border-black border-[1px]" style={{ zIndex: 100 }}>
      {/* Render all rows */}
      {rows.map((row, index) => (
        <AbacusRow
          key={index}
          rowIndex={index}
          beads={row}
          isFirstRow={index === 0} // Pass 'isFirstRow' to distinguish first row
          onClick={handleBeadClick}
        />
      ))}
    </div>
  );
};

Abacus.propTypes = {
  result: PropTypes.number.isRequired,  // result is a number
  setResult: PropTypes.func.isRequired,  // setResult is a function
};
export default Abacus;
