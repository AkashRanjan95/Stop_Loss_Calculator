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

function calculateTrade(editIndex = null) {
  const stock = document.getElementById('stock').value;
  const entry = parseFloat(document.getElementById('entryPrice').value);
  const qty = parseFloat(document.getElementById('quantity').value);
  const maxLoss = parseFloat(document.getElementById('maxLoss').value);
  const maxProfit = parseFloat(document.getElementById('maxProfit').value);

  if (!entry || !qty || !maxLoss || !maxProfit || !stock) return;

  const sl = entry - (maxLoss / qty);
  const tp = entry + (maxProfit / qty);
  const slPct = (((sl - entry) / entry) * 100).toFixed(2);
  const tpPct = (((tp - entry) / entry) * 100).toFixed(2);
  const rr = (maxProfit / maxLoss).toFixed(2);
  const amount = (entry * qty).toFixed(2);

  const row = [today, stock, entry.toFixed(2), sl.toFixed(2), tp.toFixed(2), `${slPct}%`, `+${tpPct}%`, rr, amount];

  if (editIndex !== null) {
    updateRow(editIndex, row);
  } else {
    addRow(row);
    saveRow(row);
  }

  clearInputs();
}

function clearInputs() {
  document.getElementById('stock').value = '';
  document.getElementById('entryPrice').value = '';
  document.getElementById('quantity').value = '';
  document.getElementById('maxLoss').value = '';
  document.getElementById('maxProfit').value = '';
}

function addRow(row, index = null) {
  const tr = document.createElement('tr');
  row.forEach((cell, i) => {
    const td = document.createElement('td');
    td.textContent = cell;
    td.setAttribute('data-label', document.querySelectorAll('thead th')[i].textContent);
    tr.appendChild(td);
  });

  const actionTd = document.createElement('td');
  actionTd.classList.add('action-btns');
  actionTd.setAttribute('data-label', 'Actions');

  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';
  editBtn.className = 'edit-btn';
  editBtn.onclick = () => editRow(row, index);

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.className = 'delete-btn';
  deleteBtn.onclick = () => deleteRow(index);

  actionTd.appendChild(editBtn);
  actionTd.appendChild(deleteBtn);
  tr.appendChild(actionTd);

  tableBody.appendChild(tr);
}

function saveRow(row) {
  let storedData = JSON.parse(localStorage.getItem(storageKey)) || [];
  storedData.push(row);
  localStorage.setItem(storageKey, JSON.stringify(storedData));
  refreshTable();
}

function updateRow(index, row) {
  let storedData = JSON.parse(localStorage.getItem(storageKey)) || [];
  storedData[index] = row;
  localStorage.setItem(storageKey, JSON.stringify(storedData));
  refreshTable();
}

function loadStoredData() {
  const storedData = JSON.parse(localStorage.getItem(storageKey)) || [];
  storedData.forEach((row, index) => addRow(row, index));
}

function deleteRow(index) {
  let storedData = JSON.parse(localStorage.getItem(storageKey)) || [];
  storedData.splice(index, 1);
  localStorage.setItem(storageKey, JSON.stringify(storedData));
  refreshTable();
}

function editRow(row, index) {
  document.getElementById('stock').value = row[1];
  document.getElementById('entryPrice').value = row[2];
  document.getElementById('quantity').value = (parseFloat(row[8]) / parseFloat(row[2])).toFixed(0);
  document.getElementById('maxLoss').value = ((parseFloat(row[2]) - parseFloat(row[3])) * parseFloat(row[8]) / parseFloat(row[2])).toFixed(2);
  document.getElementById('maxProfit').value = ((parseFloat(row[4]) - parseFloat(row[2])) * parseFloat(row[8]) / parseFloat(row[2])).toFixed(2);

  deleteRow(index);
  calculateTrade(index);
}

function refreshTable() {
  tableBody.innerHTML = '';
  loadStoredData();
}

function exportToCSV() {
  const rows = JSON.parse(localStorage.getItem(storageKey)) || [];
  let csv = 'Date,Stock,Entry,SL Price,TP Price,SL %,TP %,R:R,Amount\n';
  rows.forEach(r => csv += r.join(',') + '\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `TradeData-${today}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function addToCalendar() {
  const eventUrl = `https://calendar.google.com/calendar/u/0/r/eventedit?text=Trade+Log+${today}&dates=${today.replace(/-/g, '')}/${today.replace(/-/g, '')}&details=Check+today's+trade+record+and+CSV.`;
  window.open(eventUrl, '_blank');
}

window.onload = loadStoredData;