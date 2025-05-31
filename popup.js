// document.getElementById('calculateBtn').addEventListener('click', function() {
//     const entryPrice = parseFloat(document.getElementById('entryPrice').value);
//     const quantity = parseFloat(document.getElementById('quantity').value);
//     const maxLoss = parseFloat(document.getElementById('maxLoss').value);
//     const maxProfit = parseFloat(document.getElementById('maxProfit').value);

//     const resultDiv = document.getElementById('result');
  
//     if (!entryPrice || !quantity || !maxLoss || quantity <= 0) {
//       resultDiv.textContent = 'Please enter valid numbers.';
//       return;
//     }
  
//     const slPrice = entryPrice - (maxLoss / quantity);
//     const tpPrice = entryPrice + (maxProfit / quantity);

//     const slPercent = ((slPrice - entryPrice) / entryPrice * 100).toFixed(2);
//     const tpPercent = ((tpPrice - entryPrice) / entryPrice * 100).toFixed(2);

//     resultDiv.innerHTML = `SL Price: ₹${slPrice.toFixed(2)} (${slPercent}%)<br>TP Price: ₹${tpPrice.toFixed(2)} (${tpPercent}%)`;

//   });
  




/* ************************************************************************************************ */
// const today = new Date().toISOString().split('T')[0];
// const tableBody = document.querySelector('#resultTable tbody');
// const storageKey = `tradeData-${today}`;

// function calculateTrade() {
//   const stock = document.getElementById('stock').value;
//   const entry = parseFloat(document.getElementById('entryPrice').value);
//   const qty = parseFloat(document.getElementById('quantity').value);
//   const maxLoss = parseFloat(document.getElementById('maxLoss').value);
//   const maxProfit = parseFloat(document.getElementById('maxProfit').value);

//   if (!entry || !qty || !maxLoss || !maxProfit || !stock) return;

//   const amountUsed = (entry * qty).toFixed(2);
//   const sl = entry - (maxLoss / qty);
//   const tp = entry + (maxProfit / qty);
//   const slPct = (((sl - entry) / entry) * 100).toFixed(2);
//   const tpPct = (((tp - entry) / entry) * 100).toFixed(2);

//   const row = [today, stock, entry.toFixed(2), amountUsed, sl.toFixed(2), tp.toFixed(2), `${slPct}%`, `+${tpPct}%`];
//   addRow(row);
//   saveRow(row);
//   resetInputs();
// }

// function resetInputs() {
//   document.getElementById('stock').value = '';
//   document.getElementById('entryPrice').value = '';
//   document.getElementById('quantity').value = '';
//   document.getElementById('maxLoss').value = '';
//   document.getElementById('maxProfit').value = '';
// }

// function addRow(row, index = null) {
//   const tr = document.createElement('tr');
//   row.forEach(cell => {
//     const td = document.createElement('td');
//     td.textContent = cell;
//     tr.appendChild(td);
//   });

//   const actionTd = document.createElement('td');
//   actionTd.classList.add('action-btns');

//   const editBtn = document.createElement('button');
//   editBtn.textContent = 'Edit';
//   editBtn.className = 'edit-btn';
//   editBtn.onclick = () => editRow(tr, index);

//   const deleteBtn = document.createElement('button');
//   deleteBtn.textContent = 'Delete';
//   deleteBtn.className = 'delete-btn';
//   deleteBtn.onclick = () => deleteRow(tr, index);

//   actionTd.appendChild(editBtn);
//   actionTd.appendChild(deleteBtn);
//   tr.appendChild(actionTd);

//   tableBody.appendChild(tr);
// }

// function saveRow(row) {
//   let storedData = JSON.parse(localStorage.getItem(storageKey)) || [];
//   storedData.push(row);
//   localStorage.setItem(storageKey, JSON.stringify(storedData));
// }

// function loadStoredData() {
//   const storedData = JSON.parse(localStorage.getItem(storageKey)) || [];
//   storedData.forEach((row, index) => addRow(row, index));
// }

// function deleteRow(tr, index) {
//   tr.remove();
//   let storedData = JSON.parse(localStorage.getItem(storageKey)) || [];
//   storedData.splice(index, 1);
//   localStorage.setItem(storageKey, JSON.stringify(storedData));
//   refreshTable();
// }

// function editRow(tr, index) {
//   const cells = tr.querySelectorAll('td');
//   const qty = parseFloat(document.getElementById('quantity').value);

//   document.getElementById('stock').value = cells[1].textContent;
//   document.getElementById('entryPrice').value = cells[2].textContent;
//   document.getElementById('maxLoss').value = ((parseFloat(cells[2].textContent) - parseFloat(cells[3].textContent)) * qty).toFixed(2);
//   document.getElementById('maxProfit').value = ((parseFloat(cells[4].textContent) - parseFloat(cells[2].textContent)) * qty).toFixed(2);

//   tr.remove();
//   let storedData = JSON.parse(localStorage.getItem(storageKey)) || [];
//   storedData.splice(index, 1);
//   localStorage.setItem(storageKey, JSON.stringify(storedData));
//   refreshTable();
// }

// function refreshTable() {
//   tableBody.innerHTML = '';
//   loadStoredData();
// }

// window.onload = loadStoredData;






/* ************************************************************************************************ */
const today = new Date().toISOString().split('T')[0];
const tableBody = document.querySelector('#resultTable tbody');
const storageKey = `tradeData-${today}`;

function calculateTrade() {
  const stock = document.getElementById('stock').value;
  const entry = parseFloat(document.getElementById('entryPrice').value);
  const qty = parseFloat(document.getElementById('quantity').value);
  const maxLoss = parseFloat(document.getElementById('maxLoss').value);
  const maxProfit = parseFloat(document.getElementById('maxProfit').value);

  if (!entry || !qty || !maxLoss || !maxProfit || !stock) return;

  const sl = entry - (maxLoss / qty);
  const tp = entry + (maxProfit / qty);
  const amount = (entry * qty).toFixed(2);
  const slPct = (((sl - entry) / entry) * 100).toFixed(2);
  const tpPct = (((tp - entry) / entry) * 100).toFixed(2);
  const rr = (maxProfit / maxLoss).toFixed(2);

  const row = [today, stock, entry.toFixed(2), qty, amount, sl.toFixed(2), tp.toFixed(2), `${slPct}%`, `+${tpPct}%`, rr];
  addRow(row);
  saveRow(row);
}

function addRow(row, index = null) {
  const tr = document.createElement('tr');
  row.forEach(cell => {
    const td = document.createElement('td');
    td.textContent = cell;
    tr.appendChild(td);
  });

  const actionTd = document.createElement('td');
  actionTd.classList.add('action-btns');

  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';
  editBtn.className = 'edit-btn';
  editBtn.onclick = () => editRow(tr, index);

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.className = 'delete-btn';
  deleteBtn.onclick = () => deleteRow(tr, index);

  actionTd.appendChild(editBtn);
  actionTd.appendChild(deleteBtn);
  tr.appendChild(actionTd);

  tableBody.appendChild(tr);
}

function saveRow(row) {
  let storedData = JSON.parse(localStorage.getItem(storageKey)) || [];
  storedData.push(row);
  localStorage.setItem(storageKey, JSON.stringify(storedData));
}

function loadStoredData() {
  const storedData = JSON.parse(localStorage.getItem(storageKey)) || [];
  storedData.forEach((row, index) => addRow(row, index));
}

function deleteRow(tr, index) {
  tr.remove();
  let storedData = JSON.parse(localStorage.getItem(storageKey)) || [];
  storedData.splice(index, 1);
  localStorage.setItem(storageKey, JSON.stringify(storedData));
  refreshTable();
}

function editRow(tr, index) {
  const cells = tr.querySelectorAll('td');
  document.getElementById('stock').value = cells[1].textContent;
  document.getElementById('entryPrice').value = cells[2].textContent;
  document.getElementById('quantity').value = cells[3].textContent;
  document.getElementById('maxLoss').value = ((parseFloat(cells[2].textContent) - parseFloat(cells[5].textContent)) * parseFloat(cells[3].textContent)).toFixed(2);
  document.getElementById('maxProfit').value = ((parseFloat(cells[6].textContent) - parseFloat(cells[2].textContent)) * parseFloat(cells[3].textContent)).toFixed(2);
  tr.remove();
  let storedData = JSON.parse(localStorage.getItem(storageKey)) || [];
  storedData.splice(index, 1);
  localStorage.setItem(storageKey, JSON.stringify(storedData));
  refreshTable();
}

function refreshTable() {
  tableBody.innerHTML = '';
  loadStoredData();
}

function exportToCSV() {
  const rows = [
    ['Date','Stock','Entry','Qty','Amount','SL Price','TP Price','SL %','TP %','R:R']
  ];
  const storedData = JSON.parse(localStorage.getItem(storageKey)) || [];
  storedData.forEach(row => rows.push(row));

  let csvContent = "data:text/csv;charset=utf-8," + rows.map(e => e.join(",")).join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `trade_summary_${today}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function addToGoogleCalendar() {
  const eventTitle = `Trade Summary for ${today}`;
  const eventDetails = encodeURIComponent(`View your trade summary from the Trade Calculator app.`);
  const eventDate = today.replace(/-/g, "");
  const calendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=${eventDate}/${eventDate}&details=${eventDetails}`;
  window.open(calendarUrl, '_blank');
}

window.onload = loadStoredData;
