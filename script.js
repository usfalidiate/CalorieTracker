import { db } from './firebase.js';
import { meals } from './meals.js';
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-firestore.js";

import { auth, provider } from './firebase.js';
import { signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js";

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js";




// Google Sign-In Function
export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    alert("Signed in as " + user.displayName);
  } catch (error) {
    alert("Error signing in: " + error.message);
  }
}

// Logout Function
export async function logoutUser() {
  try {
    await signOut(auth);
    alert("You have logged out.");
  } catch (error) {
    alert("Error: " + error.message);
  }
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    document.getElementById('auth-status').textContent = `Logged in as ${user.displayName}`;
  } else {
    // User is signed out
    document.getElementById('auth-status').textContent = "Not logged in";
  }
});

// Variables for daily calorie tracking
let dailyTotal = 0;
const dailyLimit = 2100;

// Function to add calories and update the display
function addCalories(calories) {
  dailyTotal += calories;
  updateDailyTotal();
}

function updateDailyTotal() {
  document.getElementById('daily-total').textContent = `Daily Total: ${dailyTotal} kcal (Deficit: ${dailyLimit - dailyTotal} kcal)`;
}

// Save daily data to Firestore
async function saveDailyData() {
  const deficit = dailyLimit - dailyTotal;
  const date = new Date().toLocaleDateString();

  try {
    await addDoc(collection(db, "calorieData"), {
      date: date,
      total: dailyTotal,
      deficit: deficit
    });
    alert('Data saved successfully');
  } catch (error) {
    console.error("Error saving document: ", error);
    alert('Failed to save data');
  }
}

// Show monthly calorie deficit data
async function showMonthlyDeficit() {
  try {
    const querySnapshot = await getDocs(collection(db, "calorieData"));
    let results = "";
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      results += `Date: ${data.date}, Deficit: ${data.deficit} kcal\n`;
    });
    alert(results);
  } catch (error) {
    console.error("Error retrieving documents: ", error);
    alert('Failed to fetch data');
  }
}

// Render meal buttons dynamically
function renderMealButtons() {
  const mealContainer = document.getElementById('meal-container');
  meals.forEach(meal => {
    const button = document.createElement('button');
    button.textContent = `${meal.name} - ${meal.calories} kcal`;
    button.className = "button";
    button.onclick = () => addCalories(meal.calories);
    mealContainer.appendChild(button);
  });
}

// Initialize buttons and event listeners
document.addEventListener('DOMContentLoaded', () => {
  renderMealButtons();
  document.getElementById('save-data-btn').addEventListener('click', saveDailyData);
  document.getElementById('show-monthly-btn').addEventListener('click', showMonthlyDeficit);
});
