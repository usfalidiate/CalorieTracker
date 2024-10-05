import { db } from './firebase.js';
import { meals } from './meals.js';
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-firestore.js";

import { auth, provider } from './firebase.js';
import { signInWithRedirect, getRedirectResult, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js";


// Google Sign-In with Redirect
export async function signInWithGoogle() {
  try {
    await signInWithRedirect(auth, provider);
  } catch (error) {
    alert("Error signing in: " + error.message);
  }
}

// Handle the result after Google Redirect
export async function handleRedirectResult() {
  try {
    const result = await getRedirectResult(auth);
    if (result) {
      const user = result.user;
      alert("Signed in as " + user.displayName);
    }
  } catch (error) {
    console.error("Error handling redirect result: ", error);
  }
}

// Register new user with Email/Password
export async function registerUser(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    alert("Registration successful for user: " + user.email);
  } catch (error) {
    alert("Error registering: " + error.message);
  }
}

// Login with Email/Password
export async function loginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    alert("Login successful for user: " + user.email);
  } catch (error) {
    alert("Error logging in: " + error.message);
  }
}

// Logout Function
export async function logoutUser() {
  try {
    await signOut(auth);
    alert("You have logged out.");
  } catch (error) {
    alert("Error logging out: " + error.message);
  }
}

// Monitor Auth State
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    document.getElementById('auth-status').textContent = `Logged in as ${user.displayName || user.email}`;
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
  handleRedirectResult(); // Handle Google redirect result on page load
  renderMealButtons();
  document.getElementById('save-data-btn').addEventListener('click', saveDailyData);
  document.getElementById('show-monthly-btn').addEventListener('click', showMonthlyDeficit);
});
