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

// Async function to get the author and fetch data using Axios
async function getAuthorAndFetchData() {
  // Wait for the author input
  const author = await askQuestion('Who is Author? '); // Wait for the user to input the ISBN

  // After getting the Author, make the Axios request
  try {
    const response = await axios.get(`http://localhost:5000/author/${author}`);
    console.log("Axios response:", response.data);  // Log the response data
  } catch (error) {
    console.error("Error fetching data:", error.message); // Handle any errors
  }
}

// Call the async function
getAuthorAndFetchData();
