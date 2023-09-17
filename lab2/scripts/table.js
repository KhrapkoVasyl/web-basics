const MY_NUMBER_IN_STUDENTS_LIST = 72;
const MY_CELL_BY_VARIANT = MY_NUMBER_IN_STUDENTS_LIST % 36 || 36;

const tableContainer = document.querySelector('.table-container');

const createTableOfAssendingNumbers = (
  parentElement,
  cols,
  raws,
  initNumber = 1
) => {
  const table = document.createElement('table');
  let currTableCellNumber = initNumber;

  for (let raw = 0; raw < raws; raw++) {
    const tr = document.createElement('tr');

    for (let col = 0; col < cols; col++) {
      const td = document.createElement('td');
      td.setAttribute('id', `cell-${currTableCellNumber}`);
      td.textContent = currTableCellNumber;
      tr.appendChild(td);
      currTableCellNumber++;
    }

    table.appendChild(tr);
  }

  parentElement.appendChild(table);
};

createTableOfAssendingNumbers(tableContainer, 6, 6);

const cellToSetListeners = document.querySelector(
  `#cell-${MY_CELL_BY_VARIANT}`
);
const tableCellColorInput = document.querySelector('.table-cell-color-input');
cellToSetListeners.style.cursor = 'pointer';

const randomInteger = (max) => Math.floor(Math.random() * (max + 1));
const getRandomRGBColor = () => {
  const r = randomInteger(256);
  const g = randomInteger(256);
  const b = randomInteger(256);
  return `rgb(${r},${g},${b})`;
};

const handleMouseOver = (event) => {
  const targetCell = event.target;
  targetCell.style.background = getRandomRGBColor();
};

const handleClick = (event) => {
  const targetCell = event.target;

  const backgroundColor = tableCellColorInput.value;
  targetCell.style.background = backgroundColor;
};

const handleDblClick = (event) => {
  const targetCell = event.target;
  const backgroundColor = tableCellColorInput.value;

  const columnIndex = targetCell.cellIndex;
  const tableElement = targetCell.closest('table');
  const tableRows = tableElement.rows;
  for (const row of tableRows) {
    const columnCell = row.cells[columnIndex];
    columnCell.style.background = backgroundColor;
  }
};

cellToSetListeners.addEventListener('mouseover', handleMouseOver);
cellToSetListeners.addEventListener('click', handleClick);
cellToSetListeners.addEventListener('dblclick', handleDblClick);
