let dailyTotal = 0;
const dailyLimit = 2100;
const sheetURL = 'https://script.google.com/macros/s/AKfycbzgFxgWxuFgdumMFYip54Vbex-cL7QVufgxxvaIhXz8Hnh5odlAY4jYpjbLRgFycc3V3g/exec'; // Your Web App URL

function addCalories(calories) {
  dailyTotal += calories;
  updateDailyTotal();
}

function updateDailyTotal() {
  document.getElementById('daily-total').textContent = `Daily Total: ${dailyTotal} kcal (Deficit: ${dailyLimit - dailyTotal} kcal)`;
}

function saveDailyData() {
  const deficit = dailyLimit - dailyTotal;
  const date = new Date().toLocaleDateString();

  fetch(sheetURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ date, total: dailyTotal, deficit }),
  })
  .then(response => response.json())
  .then(data => {
    alert('Data saved successfully');
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

function showMonthlyDeficit() {
  alert("Fetching monthly data...");
  // Add logic to fetch and display monthly data from Google Sheets
}
