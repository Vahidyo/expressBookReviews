const axios = require('axios');

// Creating a promise method. The promise will get resolved when receiving the axios response.
let myPromise = new Promise((resolve, reject) => {
  axios.get('http://localhost:5000')
    .then(response => {
      resolve(response.data);  // Resolve the promise with the response data
    })
    .catch(error => {
      reject(error);  // Reject the promise if an error occurs
    });
});

// Console log before calling the promise
console.log("Before calling promise");

// Call the promise and wait for it to be resolved, then print the response
myPromise
  .then((successMessage) => {
    console.log("Axios response:", successMessage);
  })
  .catch((error) => {
    console.error("Error fetching data:", error.message);
  });

// Console log after calling the promise
console.log("After calling promise");