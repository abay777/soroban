import { useState } from "react";
import PropTypes from 'prop-types';



const beadValue =[
  Array.from({length:13},(_,index)=> 1* Math.pow(10,index)).reverse(),
];

// AbacusRow Component renders the beads in each row.
const AbacusRow = ({ beads, rowIndex, isFirstRow, onClick }) => {
  const colBeads = 13; // Number of beads in the row

  return (
    <div className="flex items-center md:space-x-5 space-x-3 lg:space-x-7 lg:py-1 mx-auto  ">
      {[...Array(colBeads)].map((_, index) => (
        <div
          key={index}
          className={`md:w-7 md:h-7  w-3 h-3 bead ${isFirstRow?'mb-1':''}`}
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
    new Array(13).fill(-10), // Special row, initial bead position is 30px (default)
    new Array(13).fill(0), // Regular row
    new Array(13).fill(0), // Regular row
    new Array(13).fill(0), // Regular row
    new Array(13).fill(0), // Regular row
  ]);




  


 
  // Function to handle bead movement independently for the clicked bead
  const handleBeadClick = (rowIndex, beadIndex, isFirstRow) => {
    const newRow = [...rows];
    let tempValue = 0;
  
    if (isFirstRow) {
      // Handle first row bead movement
      if (newRow[rowIndex][beadIndex] === -10) {
        newRow[rowIndex][beadIndex] = 0; // Move bead down
        tempValue += beadValue[0][beadIndex] *5;
      } else if (newRow[rowIndex][beadIndex] === 0) {
        newRow[rowIndex][beadIndex] = -10; // Move bead up
        tempValue -= beadValue[0][beadIndex] *5;
      }
    } else {
      // Handle rows other than the first row
      if (newRow[rowIndex][beadIndex] === 0) {
      
        // Moving bead up
        for (let i = rowIndex; i >= 1; i--) {
          if (newRow[i][beadIndex] === 0) {
            newRow[i][beadIndex] = -10;
            tempValue += beadValue[0][beadIndex]; // Accumulate value  
         
          }
        }
      } else if (newRow[rowIndex][beadIndex] === -10) {
        // Moving bead down
        for (let i = rowIndex; i <= newRow.length - 1; i++) {
          if (newRow[i][beadIndex] === -10) {
            newRow[i][beadIndex] = 0;
            console.log(rowIndex , beadIndex ,'row & bead')
            tempValue -= beadValue[0][beadIndex]; // Subtract value
          }
        }
      }
    }
  
    // Update result and rows state
    setResult((prev)=> prev + tempValue);
    setRows(newRow);
  };
  return (
    <div className="abacusBox min-w-[350px] flex flex-col items-center md:items-start space-y-2 p-4  bg-white mx-auto lg:px-10 py-5 mt-0 absolute rounded-md border-black border-[1px]" style={{ zIndex: 100 }}>
      {/* Render all rows */}
      <hr className="h-1 w-[92%] rounded-[2px] -translate-x-1/2 left-1/2 top-[26%] bg-gradient-to-tr from-gray-300 from-100% via-gray-200 via-100%  to-gray-700 to-100% absolute " style={{zIndex:130}} />
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

Abacus.propTypes = {  // result is a number
  setResult: PropTypes.func.isRequired,  // setResult is a function
};
export default Abacus;
