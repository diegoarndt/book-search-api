const axios = require('axios');
const fs = require('fs');
const searchTerm = process.argv[2];
const year = parseInt(process.argv[3]) || 2023; // Use 2023 as the default year if no year is provided
const limit = parseInt(process.argv[4]) || 5; // Use 5 as the default number of results if no limit is provided

// Check if a search term was provided
if (!searchTerm) {
  console.log('\x1b[33m%s\x1b[0m', '\nPlease provide a search term.');
  process.exit(1);
}

// Get the current date and time in Canadian standard
const now = new Date();
const options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  timeZone: 'Canada/Pacific',
};
const timestamp = now.toLocaleString('en-CA', options);

// Add a separator line to the output file
const separator = '==================================================';

// Display a loading message in the console
console.log('\x1b[36m%s\x1b[0m', '\nLoading...\n');

// Make an API request using the provided search term
axios
  .get(`http://openlibrary.org/search.json?q=${searchTerm}`)
  .then((response) => {
    const data = response.data;

    // If there are search results, filter by year and display/save the titles
    const titles = data.docs
      .filter((doc) => doc.publish_year && doc.publish_year.includes(year))
      .slice(0, limit)
      .map((doc) => doc.title);
      
    if (titles.length > 0) {

      // If the number of titles found is less than the requested limit, apologize and show the actual number of results found
      if (titles.length < limit) {
        console.log(
          '\x1b[31m%s\x1b[0m',
          'Sorry, only ' +
            titles.length +
            ' item(s) found for the year ' +
            year +
            '.\n'
        );
      }

      // Display the titles in the console
      console.log(titles.map((title) => `> ${title}`).join('\n'));

      // Write the search term, year, and timestamp to the output file
      fs.appendFileSync('search-results.txt', `Search term: ${searchTerm}\n`);
      fs.appendFileSync('search-results.txt', `Year: ${year}\n`);
      fs.appendFileSync('search-results.txt', `Timestamp: ${timestamp}\n`);

      // Write the separator and titles to the output file
      fs.appendFileSync('search-results.txt', `${separator}\n`);
      fs.appendFileSync('search-results.txt', titles.join('\n') + '\n');
      fs.appendFileSync('search-results.txt', `${separator}\n\n`);

      // Search results saved to search-results.txt
      console.log(
        '\x1b[32m%s\x1b[0m',
        '\nSearch results successfully saved to search-results.txt'
      );
    } else {
      // If no search results were found, apologize
      console.log('\x1b[31m%s\x1b[0m', 'Sorry. No search results found.');
    }
  })
  .catch((error) => {
    // If an error occurred, display the error message
    console.log('\x1b[31m%s\x1b[0m', `An error occurred: ${error.message}`);
  });
