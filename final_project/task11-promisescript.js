const axios = require('axios');
const readline = require('readline');

// Function to ask a question from the console and return the answer as a promise
function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      resolve(answer); // Resolve the promise with the answer
      rl.close(); // Close the interface
    });
  });
}

// Async function to get the ISBN and fetch data using Axios
async function getISBNAndFetchData() {
  // Wait for the ISBN input
  const isbn = await askQuestion('What is ISBN? '); // Wait for the user to input the ISBN

  // After getting the ISBN, make the Axios request
  try {
    const response = await axios.get(`http://localhost:5000/isbn/${isbn}`);
    console.log("Axios response:", response.data);  // Log the response data
  } catch (error) {
    console.error("Error fetching data:", error.message); // Handle any errors
  }
}

// Call the async function
getISBNAndFetchData();
